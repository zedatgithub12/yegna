"use client";

import { useState } from "react";
import { Formik, Form } from "formik";
import { Button } from "@yegna-systems/ui/button";

import PageWrapper from "@/components/PagesWrapper";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useDynamicMutation from "@/lib/api/use-post-data";
import { queryKeys } from "@/lib/api/query-keys";
import { institutionValidationSchema } from "@/validations/institution.schema";

import BasicInformation from "./sections/BasicInformation";
import AdminInformation from "./sections/AdminInformation";
import DocumentsAndAgreements from "./sections/DocumentsAndAgreements";
import { Stepper } from "@/components/ui/Stepper";

const steps = [
  { label: "Add Institution", description: "About the Institution info." },
  { label: "Institution Admin", description: "Admin information" },
  { label: "Subscription", description: "Subscription" },
  { label: "Review", description: "Check & Submit" },
];

const initialValues = {
  category_id: "",
  subscription_plan_id: "",
  subscription_cycle: "monthly",
  name: "",
  email: "",
  phone: "",
  tin_number: "",
  number_of_agents: 0,
  latitude: 0,
  longitude: 0,
  admin_phone: "",
  documents: [],
  agreements: [],
};

const CreateInstitution = () => {
  const [step, setStep] = useState(0);
  const router = useRouter();
  const mutation = useDynamicMutation({});

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      // Validate subscription data before submission
      if (!values.subscription_plan_id) {
        toast.error("Please select a subscription plan");
        setStep(2); // Jump to subscription step
        return;
      }

      await mutation.mutateAsync({
        url: queryKeys.get_institution,
        method: "POST",
        body: values,
        onSuccess: () => {
          toast.success("Institution successfully created");
          router.back();
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
    setStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const goBack = () => setStep((prev) => Math.max(prev - 1, 0));

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
        {({ isSubmitting, errors, touched, values }) => {
          console.log("Errors", errors);
          console.log("Touched", touched);
          console.log("Values", values);
          return (
            <Form className="pt-6 space-y-4">
              {step === 0 && <BasicInformation />}
              {step === 1 && <AdminInformation />}
              {step === 2 && <DocumentsAndAgreements />}
              {step === 3 && <div>Review Section (optional preview)</div>}

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
                    type="submit"
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
