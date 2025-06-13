"use client";

import { useState } from "react";
import { Formik, Form } from "formik";
import { Button } from "@yegna-systems/ui/button";

import PageWrapper from "@/components/PagesWrapper";
import { toast } from "sonner";
import { useRouter, useParams } from "next/navigation";
import useDynamicMutation from "@/lib/api/use-post-data";
import { queryKeys } from "@/lib/api/query-keys";
import { useFetchData } from "@/lib/api/use-fetch-data";

import { Stepper } from "@/components/ui/Stepper";
import BasicInformation from "./sections/BasicInformation";
import AdminInformation from "./sections/AdminInformation";
import OurAgreement from "./sections/OurAgreement";
import InstitutionReview from "./institution-review";
import { schoolValidationSchema } from "@/validations/schoolvalidation.schema";

const steps = [
  { label: "School Info", description: "About the School info." },
  { label: "School Admin", description: "Admin information" },
  { label: "Our Agreement", description: "Our Agreement" },
  { label: "Review", description: "Check & Submit" },
];

const EditInstitution = () => {
  const [step, setStep] = useState(0);
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const mutation = useDynamicMutation({});
  const institutionDataResponse = useFetchData(
    [queryKeys.get_institution, id],
    `${queryKeys.get_institution}/${id}`
  );

  const institutionData = institutionDataResponse?.data?.data;

  const initialValues = {
    school_info: {
      school_name: institutionData?.school_name || "",
      bank: institutionData?.bank || "",
      collection_account: institutionData?.collection_account || "",
      education_level: institutionData?.education_level || "",
      school_type: institutionData?.school_type || "",
      location: institutionData?.location || "",
    },
    admin_info: {
      first_name: institutionData?.admin?.first_name || "",
      middle_name: institutionData?.admin?.middle_name || "",
      last_name: institutionData?.admin?.last_name || "",
      gender: institutionData?.admin?.gender || "",
      user_name: institutionData?.admin?.user_name || "",
      email: institutionData?.admin?.email || "",
      phone_number: institutionData?.admin?.phone_number || "",
      access_role: institutionData?.admin?.access_role || "",
      position: institutionData?.admin?.position || "",
    },
  };

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      await mutation.mutateAsync({
        url: `${queryKeys.get_school_single}/${id}`,
        method: "POST",
        body: values,
        onSuccess: (res) => {
          if (res.success) {
            toast.success(res.message || "School updated successfully");
            router.back();
          } else {
            toast.error(
              res.data?.message || res.message || "Failed to update school"
            );
          }
        },
        onError: (error) => {
          console.error("API Error:", error);
          toast.error("Failed to update school");
        },
      });
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to update school");
    }
  };

  const goNext = (values: typeof initialValues) => {
    if (step === 0 && !values.school_info.school_name) {
      toast.error("Please fill in basic information");
      return;
    }
    if (step === 1 && !values.admin_info.phone_number) {
      toast.error("Please provide admin information");
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
      title="Edit School"
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
        validationSchema={schoolValidationSchema}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values)
            .catch((error) => console.error("Submission failed:", error))
            .finally(() => setSubmitting(false));
        }}
        enableReinitialize
      >
        {({ isSubmitting, values, submitForm }) => {
          return (
            <Form className="pt-6 space-y-4">
              {step === 0 && <BasicInformation />}
              {step === 1 && <AdminInformation />}
              {step === 2 && <OurAgreement />}
              {step === 3 && (
                <InstitutionReview
                  values={{
                    ...values.school_info,
                    ...values.admin_info,
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
                    Update School
                  </Button>
                )}
              </div>
            </Form>
          );
        }}
      </Formik>
    </PageWrapper>
  );
};

export default EditInstitution;
