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
import DocumentsAndAgreements from "./sections/DocumentsAndAgreements";
import { Stepper } from "@/components/ui/Stepper";
import { institutionValidationSchema } from "@/validations/institution.schema";
import InstitutionReview from "./institution-review";
import { useModal } from "@yegna-systems/lib/hooks/use-modal";
import SuccessfullyRegistered from "@/utils/components/SuccessfullyRegistered";

const steps = [
  { label: "Add Institution", description: "About the Institution info." },
  { label: "Institution Admin", description: "Admin information" },
  { label: "Subscription", description: "Subscription" },
  { label: "Review", description: "Check & Submit" },
];

const initialValues = {
  category_id: "",
  profilePhoto: "",
  subscription_plan_id: "",
  subscription_cycle: "monthly",
  name: "",
  email: "",
  phone: "",
  admin_name: "",
  admin_email: "",
  admin_phone: "",
  tin_number: "",
  number_of_agents: 0,
  latitude: 0,
  longitude: 0,
  documents: [],
  agreements: [],
  subscription: { name: "", description: "" },
};

const CreateInstitution = () => {
  const [step, setStep] = useState(0);
  const mutation = useDynamicMutation({});
  const { openModal, closeModal } = useModal();

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      if (!values.subscription_plan_id) {
        toast.error("Please select a subscription plan");
        setStep(2);
        return;
      }

      await mutation.mutateAsync({
        url: queryKeys.get_institution,
        method: "POST",
        body: values,
        onSuccess: (res) => {
          openModal({
            view: (
              <SuccessfullyRegistered
                closeModal={closeModal}
                institutionName={values.name}
                institutionId={res.data?.id}
                institutionImage={values.profilePhoto}
                institutionEmail={values.email}
                institutionPhone={values.phone}
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
    if (step === 0 && !values.name) {
      toast.error("Please fill in basic information");
      return;
    }
    if (step === 1 && !values.admin_phone) {
      toast.error("Please provide admin information");
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
      isLoading={false}
      title="Create Institution"
      back={true}
      search={false}
      breadcrumb={true}
      childrenClassnames="bg-white rounded-xl p-4 mt-4"
    >
      <Stepper steps={steps} currentStep={step} />

      <Formik
        initialValues={initialValues}
        validationSchema={institutionValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values, submitForm }) => {
          return (
            <Form className="pt-6 space-y-4">
              {step === 0 && <BasicInformation />}
              {step === 1 && <AdminInformation />}
              {step === 2 && <DocumentsAndAgreements />}
              {step === 3 && (
                <InstitutionReview values={values} onEdit={handleEditSection} />
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
    </PageWrapper>
  );
};

export default CreateInstitution;
