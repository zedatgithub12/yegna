"use client";

import React, { useState } from "react";
import FormikInput from "@yegna-systems/lib/forms/input";
import FormikSelect from "@yegna-systems/lib/forms/select";
import PageWrapper from "@/components/PagesWrapper";
import useDynamicMutation from "@/lib/api/use-post-data";
import { queryKeys } from "@/lib/api/query-keys";
import { Button } from "@yegna-systems/ui/button";
import { Text, Title } from "@yegna-systems/ui/typography";
import { Form, Formik } from "formik";
import { useRouter } from "nextjs-toploader/app";
import { toast } from "sonner";
import { Stepper } from "@/components/ui/Stepper";
import {
  createCustomerFormValidationOne,
  createCustomerFormValidationTwo,
} from "@/validations/customer.schema";
import BillingCycle from "./components/BillingCycle";
import SubscriptionPlans from "./components/SubscriptionPlans";
import { useModal } from "@yegna-systems/lib/hooks/use-modal";
import SuccessModal from "@/utils/components/SuccessModal";

const createSteps = [
  { label: "Add Customers", description: "Details about customer" },
  {
    label: "Subscription Plan",
    description: "Select customer subscription plan",
  },
];
const CreateCustomer = () => {
  const router = useRouter();
  const { openModal, closeModal } = useModal();

  const [activeStep, setActiveStep] = useState(0);
  const postMutation = useDynamicMutation({ type: "FormData" });

  const initialValues: CustomerFormValues = {
    firstName: "",
    middleName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    customer_type: "",
    billing_cycle: "monthly",
    selected_plan: "",
  };

  const handleFormSubmission = async (values: CustomerFormValues) => {
    if (activeStep < createSteps.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      try {
        const formData = new FormData();
        const fullName = [values.firstName, values.middleName, values.lastName]
          .filter(Boolean)
          .join(" ");

        formData.append("name", fullName);
        formData.append("phone", values.phoneNumber);
        formData.append("email", values.email);
        formData.append("customer_type", values.customer_type);
        formData.append("subscription_cycle", values.billing_cycle);
        formData.append("subscription_plan_id", values.selected_plan);

        await postMutation.mutateAsync({
          url: queryKeys.customers,
          method: "POST",
          body: formData,

          onSuccess: (res) => {
            if (res.success) {
              toast.success("Successfully created customer profile!");
              openModal({
                view: (
                  <SuccessModal
                    title="Successfully Registered"
                    description="You have successfully registered a Customer. Please Make sure to copy and share the "
                    closeModal={closeModal}
                  />
                ),
                customSize: "400px",
                position: "center",
                rounded: "xl",
              });
              router.back();
            } else {
              toast.error(res.message);
            }
          },
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <PageWrapper
      isLoading={false}
      title="Add New Customer"
      back={true}
      search={false}
      breadcrumb={true}
      childrenClassnames="py-4 px-0"
      staticComponent={<Stepper steps={createSteps} currentStep={activeStep} />}
    >
      <div
        className={`${activeStep === 0 ? "bg-white" : ""} mt-4 rounded-xl p-2`}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={
            activeStep === 0
              ? createCustomerFormValidationOne
              : createCustomerFormValidationTwo
          }
          onSubmit={handleFormSubmission}
        >
          {({ values, setFieldValue }) => (
            <Form className="pb-4 pr-4">
              {activeStep === 0 ? (
                <div className="grid grid-cols-12 gap-4 p-2 justify-between w-full">
                  <div className="col-span-12 md:col-span-4 ">
                    <Title as="h6" className="font-medium capitalize">
                      Customer Information.
                    </Title>
                    <Text
                      as="p"
                      className="text-gray-400 text-sm mt-0.5 font-normal capitalize"
                    >
                      Add customer information from here
                    </Text>
                  </div>
                  <div className="col-span-12 md:col-span-8 space-y-3">
                    <div>
                      <Title as="h6" className="font-normal w-full">
                        First name
                      </Title>

                      <FormikInput
                        name="firstName"
                        variant="outline"
                        placeholder="Enter First Name"
                        value={values.firstName}
                        onChange={(event) =>
                          setFieldValue("firstName", event.target.value)
                        }
                      />
                    </div>

                    <div>
                      <Title as="h6" className="font-normal w-full">
                        Middle name
                      </Title>

                      <FormikInput
                        name="middleName"
                        variant="outline"
                        placeholder="Enter First Name"
                        value={values.middleName}
                        onChange={(event) =>
                          setFieldValue("middleName", event.target.value)
                        }
                      />
                    </div>

                    <div>
                      <Title as="h6" className="font-normal w-full">
                        Last name
                      </Title>

                      <FormikInput
                        name="lastName"
                        variant="outline"
                        placeholder="Enter Last Name"
                        value={values.lastName}
                        onChange={(event) =>
                          setFieldValue("lastName", event.target.value)
                        }
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                      <div>
                        <Title as="h6" className="font-normal w-full">
                          Phone
                        </Title>

                        <FormikInput
                          name="phoneNumber"
                          variant="outline"
                          placeholder="Enter Phone Number"
                          value={values.phoneNumber}
                          pattern="number"
                          maxLength={10}
                          onChange={(event) =>
                            setFieldValue("phoneNumber", event.target.value)
                          }
                        />
                      </div>
                      <div>
                        <Title as="h6" className="font-normal w-full">
                          Email
                        </Title>

                        <FormikInput
                          name="email"
                          variant="outline"
                          placeholder="Enter Email"
                          value={values.email}
                          onChange={(event) =>
                            setFieldValue("email", event.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <FormikSelect
                        options={[
                          { label: "Agent", value: "Agent" },
                          { label: "Agency", value: "Agency" },
                        ]}
                        name="customer_type"
                        label="Customer Type"
                        placeholder="Select customer type"
                        onChange={(selectedOptions: string[]) =>
                          setFieldValue("customer_type", selectedOptions)
                        }
                        value={values.customer_type}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <BillingCycle />
                  <SubscriptionPlans />
                </div>
              )}
              <hr className="border my-6 mb-2" />
              <div className="grid grid-cols-12 gap-4 p-2 justify-between w-full">
                <div className="col-span-12 md:col-span-4 "></div>

                <div className="col-span-12 md:col-span-8 ">
                  <div className=" py-4 flex items-center justify-end gap-4 w-full">
                    <Button
                      variant="outline"
                      size="md"
                      className="px-1 w-36 border-gray-400 rounded-md font-semibold"
                      onClick={() => {
                        if (activeStep === 0) {
                          router.back();
                        } else {
                          setActiveStep(activeStep - 1);
                        }
                      }}
                    >
                      <Text className="text-gray-600">
                        {activeStep === 0 ? "Cancel" : "Previous"}{" "}
                      </Text>
                    </Button>

                    <Button
                      variant="solid"
                      size="md"
                      color="primary"
                      className="px-1 w-36 rounded-md font-bold"
                      type="submit"
                      isLoading={postMutation.isPending}
                    >
                      <Text className="text-secondary font-medium text-[14px]">
                        {activeStep < createSteps.length - 1
                          ? "Next"
                          : "Submit"}
                      </Text>
                    </Button>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </PageWrapper>
  );
};

export default CreateCustomer;
