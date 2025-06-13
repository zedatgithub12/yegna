"use client";

import { useState } from "react";
import { Formik, Form } from "formik";
import { Button } from "@yegna-systems/ui/button";

import PageWrapper from "@/components/PagesWrapper";
import { toast } from "sonner";
import useDynamicMutation from "@/lib/api/use-post-data";
import { queryKeys } from "@/lib/api/query-keys";

import BasicInformation from "./sections/BasicInformation";
import AdminInformation from "./sections/AdminInformation";
import { Stepper } from "@/components/ui/Stepper";
import InstitutionReview from "./institution-review";
import { useModal } from "@yegna-systems/lib/hooks/use-modal";
import SuccessfullyRegistered from "@/utils/components/SuccessfullyRegistered";
import OurAgreement from "./sections/OurAgreement";
import { schoolValidationSchema } from "@/validations/schoolvalidation.schema";

const steps = [
  { label: "Add School", description: "About the Institution info." },
  { label: "School Admin", description: "Admin information" },
  { label: "Our Agreement", description: "Our Agreement" },
  { label: "Review", description: "Check & Submit" },
];

const initialValues = {
  school_info: {
    school_name: "",
    bank: "",
    // profile_photo_url: "",
    collection_account: "",
    education_level: "",
    // logo: "",
    // email: "",
    // phone: "",
    school_type: "",
    location: "",
    // school_code: "",
  },
  admin_info: {
    first_name: "",
    middle_name: "",
    last_name: "",
    gender: "",
    user_name: "",
    email: "",
    phone_number: "",
    access_role: "",
    position: "",
  },
};

const CreateInstitution = () => {
  const [step, setStep] = useState(0);
  const mutation = useDynamicMutation({});
  const { openModal, closeModal } = useModal();

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      await mutation.mutateAsync({
        url: queryKeys.create_school,
        method: "POST",
        body: values,
        onSuccess: (res) => {
          openModal({
            view: (
              <SuccessfullyRegistered
                closeModal={closeModal}
                institutionName={values.school_info.school_name}
                institutionId={res.data?.id}
                // institutionImage={values.school_info.profile_photo_url}
                // institutionEmail={values.school_info.email}
                // institutionPhone={values.school_info.phone}
              />
            ),
            customSize: "500px",
            position: "center",

            onClose: () => {
              closeModal();
            },
          });
        },
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to create institution");
    }
  };

  // Add validation before moving to next step
  const goNext = (values: typeof initialValues) => {
    if (step === 0 && !values.school_info.school_name) {
      toast.error("Please fill in basic information");
      return;
    }
    if (step === 1 && !values.admin_info.phone_number) {
      toast.error("Please provide admin information");
      return;
    }
    // if (step === 2 && !values.subscription_plan_id) {
    //   toast.error("Please select a subscription plan");
    //   return;
    // }
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
      isLoading={false}
      title="Create Institution"
      back={true}
      search={false}
      breadcrumb={true}
      childrenClassnames="rounded-xl p-4 mt-4"
    >
      <Stepper steps={steps} currentStep={step} />
      <div className="bg-white rounded-xl p-4 mt-4">
        <Formik
          initialValues={initialValues}
          validationSchema={schoolValidationSchema}
          onSubmit={handleSubmit}
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
                      // school_code: values.school_info?.school_code || "",
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
                      Create Institution
                    </Button>
                  )}
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </PageWrapper>
  );
};

export default CreateInstitution;
