"use client";

import { useState } from "react";
import { Formik, Form } from "formik";

import PageWrapper from "@/components/PagesWrapper";
import { toast } from "sonner";
import { useRouter, useParams } from "next/navigation";
import useDynamicMutation from "@/lib/api/use-post-data";
import { queryKeys } from "@/lib/api/query-keys";

import { Stepper } from "@/components/ui/Stepper";
import { institutionValidationSchema } from "@/validations/institution.schema";

import BasicInformation from "./sections/BasicInformation";
import AdminInformation from "./sections/AdminInformation";
import DocumentsAndAgreements from "./sections/DocumentsAndAgreements";
import InstitutionReview from "./institution-review";
import { Button } from "@yegna-systems/ui/button";
import { useFetchData } from "@/lib/api/use-fetch-data";

const steps = [
  { label: "Institution Info", description: "About the Institution info." },
  { label: "Institution Admin", description: "Admin information" },
  { label: "Subscription", description: "Subscription" },
  { label: "Review", description: "Check & Submit" },
];

const EditInstitution = () => {
  const [step, setStep] = useState(0);
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const mutation = useDynamicMutation({ type: "FormData" });

  const institutionDataResponse = useFetchData(
    [queryKeys.get_institution, id],
    `${queryKeys.get_institution}/${id}`
  );

  const institutionData: InstitutionShowData =
    institutionDataResponse?.data?.data;

  console.log("Institution API Response:", institutionDataResponse.data);

  const initialValues = {
    category_id: institutionData?.category_id || "",
    type: institutionData?.category?.type || "", //
    // profilePhoto: institutionData?.profilePhoto || "",
    subscription_plan_id:
      institutionData?.subscriptions?.[0]?.subscription_plan_id || "",
    subscription_cycle: institutionData?.subscriptions?.[0]?.cycle || "monthly",
    name: institutionData?.name || "",
    email: institutionData?.email || "",
    phone: institutionData?.phone || "",
    admin_name: institutionData?.admin?.name || "",
    admin_email: institutionData?.admin?.email || "",
    admin_phone: institutionData?.admin?.phone || "",
    tin_number: institutionData?.tin_number || "",
    number_of_agents: institutionData?.number_of_agents || 0,
    latitude: institutionData?.location?.latitude || "0",
    longitude: institutionData?.location?.longitude || "0",
  };

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      if (!values.subscription_plan_id) {
        toast.error("Please select a subscription plan");
        setStep(2);
        return;
      }

      const payload = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        category_id: values.category_id,

        location: {
          latitude: values.latitude.toString(),
          longitude: values.longitude.toString(),
        },
        admin: {
          name: values.admin_name,
          email: values.admin_email,
          phone: values.admin_phone,
        },
        subscription: {
          name: values.subscription_plan_id,
          description: values.subscription_cycle,
        },
        subscription_plan_id: values.subscription_plan_id,
        subscription_cycle: values.subscription_cycle,
        tin_number: values.tin_number || null,

        ...(values.tin_number && { tin_number: values.tin_number }),
        ...(values.number_of_agents && {
          number_of_agents: values.number_of_agents,
        }),
      };

      // For file uploads, use FormData
      const formData = new FormData();
      formData.append("data", JSON.stringify(payload));

      // if (values.profilePhoto) {
      //   formData.append("profile_photo_url", values.profilePhoto);
      // }

      await mutation.mutateAsync({
        url: `${queryKeys.get_institution}/${id}`,
        method: "PATCH",
        body: formData,
        onSuccess: (res) => {
          if (res.success) {
            toast.success(res.message || "Institution updated successfully");
            router.back();
          } else {
            toast.error(
              res.data?.message || res.message || "Failed to update institution"
            );
          }
        },
        onError: (error) => {
          console.error("Update error:", error);
          toast.error("Failed to update institution");
        },
      });
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to update institution");
    }
  };

  const goNext = (values: typeof initialValues) => {
    if (step === 0 && (!values.name || !values.phone)) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (
      step === 1 &&
      (!values.admin_name || !values.admin_phone || !values.admin_email)
    ) {
      toast.error("Please provide complete admin information");
      return;
    }
    if (step === 2 && !values.subscription_plan_id) {
      toast.error("Please select a subscription plan");
      return;
    }
    setStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const goBack = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleEditSection = (section: string) => {
    const sectionToStep: Record<string, number> = {
      basic: 0,
      admin: 1,
      subscription: 2,
      documents: 2,
      agreements: 2,
      location: 0,
    };

    const targetStep = sectionToStep[section];
    if (targetStep !== undefined) {
      setStep(targetStep);
    }
  };

  return (
    <PageWrapper
      title="Edit Institution"
      back={true}
      search={false}
      breadcrumb={true}
      isLoading={institutionDataResponse.isFetching}
      isError={institutionDataResponse.isError}
      childrenClassnames="bg-white rounded-xl p-4 mt-4"
    >
      <Stepper steps={steps} currentStep={step} />

      <Formik
        initialValues={initialValues}
        validationSchema={institutionValidationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting, values, submitForm }) => (
          <Form className="pt-6 space-y-4">
            {step === 0 && <BasicInformation />}
            {step === 1 && <AdminInformation />}
            {step === 2 && <DocumentsAndAgreements />}
            {step === 3 && (
              <InstitutionReview
                values={{
                  ...values,
                  number_of_agents:
                    typeof values.number_of_agents === "string"
                      ? parseInt(values.number_of_agents, 10) || 0
                      : values.number_of_agents,
                  // profilePhoto: values.profilePhoto
                  //   ? typeof values.profilePhoto === "string"
                  //     ? values.profilePhoto
                  //     : URL.createObjectURL(values.profilePhoto)
                  //   : "",
                  latitude:
                    typeof values.latitude === "string"
                      ? parseFloat(values.latitude)
                      : values.latitude,
                  longitude:
                    typeof values.longitude === "string"
                      ? parseFloat(values.longitude)
                      : values.longitude,
                  subscription: {
                    name: values.subscription_plan_id,
                    description: values.subscription_cycle,
                  },
                }}
                onEdit={handleEditSection}
              />
            )}

            <div className="pt-4 flex items-center justify-end gap-4 w-full">
              <Button
                type="button"
                onClick={goBack}
                disabled={step === 0}
                variant="outline"
              >
                Previous
              </Button>

              {step < steps.length - 1 ? (
                <Button type="button" onClick={() => goNext(values)}>
                  Next
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={submitForm}
                  isLoading={isSubmitting || mutation.isPending}
                  className="font-bold"
                >
                  Update Institution
                </Button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </PageWrapper>
  );
};

export default EditInstitution;
