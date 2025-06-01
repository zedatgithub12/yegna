"use client";

import React from "react";
import RichTextEditor from "@/components/Input/RichTextEditor";
import PageWrapper from "@/components/PagesWrapper";
import { queryKeys } from "@/lib/api/query-keys";
import useDynamicMutation from "@/lib/api/use-post-data";
import { createSubscriptionValidationSchema } from "@/validations/subscription.schema";
import FormikInput from "@yegna-systems/lib/forms/input";
import { Button } from "@yegna-systems/ui/button";
import { Text, Title } from "@yegna-systems/ui/typography";
import { Form, Formik } from "formik";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import ColorSelection from "./components/ColorSelector";
import PlanFeatures from "./components/PlanFeatures";
import { useFetchData } from "@/lib/api/use-fetch-data";

const EditSubscriptionPlan = () => {
  const router = useRouter();
  const postMutation = useDynamicMutation({});
  const params = useParams();
  const id = params?.id;

  const responsePayload = useFetchData(
    [queryKeys.subscriptions, id],
    `${queryKeys.subscriptions}/${id}`
  );

  const subscriptionData: PlanDetail = responsePayload?.data?.data;

  const initialValues: SubscriptionFormValues = {
    name: subscriptionData?.name || "",
    description: subscriptionData?.description || "",
    monthly_price: subscriptionData?.monthly_price || "",
    yearly_price: subscriptionData?.yearly_price || "",
    features:
      subscriptionData?.features.map(
        (feature: FeatureReference) => feature.feature_id
      ) || [],
    color: subscriptionData?.color || [],
  };

  const handleFormSubmission = async (values: SubscriptionFormValues) => {
    try {
      await postMutation.mutateAsync({
        url: `${queryKeys.subscriptions}/${id}`,
        method: "PATCH",
        body: values,

        onSuccess: (res) => {
          if (res.success) {
            toast.success(res.data.message);
            router.back();
          } else {
            toast.error(res.message);
          }
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <PageWrapper
      isLoading={false}
      title="Edit Subscription Plan"
      back={true}
      search={false}
      isError={false}
      breadcrumb={true}
      childrenClassnames="bg-white rounded-xl p-4 mt-4"
    >
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={createSubscriptionValidationSchema}
        onSubmit={handleFormSubmission}
      >
        {({ values, setFieldValue }) => (
          <Form className="pb-4 pr-4">
            <div className="grid grid-cols-12 gap-4 p-2 justify-between w-full">
              <div className="col-span-12 md:col-span-4 ">
                <Title as="h6" className="font-medium capitalize">
                  Subscription Information.
                </Title>
                <Text
                  as="p"
                  className="text-gray-400 text-sm mt-0.5 font-normal capitalize"
                >
                  Edit subscription information from here
                </Text>
              </div>
              <div className="col-span-12 md:col-span-8 space-y-3">
                <div>
                  <Title as="h6" className="font-normal w-full">
                    Subscription Plan Name
                  </Title>

                  <FormikInput
                    name="name"
                    variant="outline"
                    placeholder="Enter Plan Name"
                    value={values.name}
                    onChange={(event) =>
                      setFieldValue("name", event.target.value)
                    }
                  />
                </div>

                <div>
                  <Title as="h6" className="font-normal w-full mb-2">
                    Description
                  </Title>

                  <RichTextEditor
                    value={values.description}
                    onChange={(value) => setFieldValue("description", value)}
                    className={
                      "border-2 border-gray-100  rounded-bl-lg rounded-br-lg editor-content"
                    }
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                  <div>
                    <Title as="h6" className="font-normal w-full">
                      Monthly Price
                      <span className="text-xs text-gray-500 ml-1">(ETB)</span>
                    </Title>

                    <FormikInput
                      name="monthly_price"
                      variant="outline"
                      placeholder="Enter Monthly Price"
                      value={values.monthly_price}
                      pattern="number"
                      maxLength={10}
                      onChange={(event) =>
                        setFieldValue("monthly_price", event.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Title as="h6" className="font-normal w-full">
                      Yearly Price
                      <span className="text-xs text-gray-500 ml-1">(ETB)</span>
                    </Title>

                    <FormikInput
                      name="yearly_price"
                      variant="outline"
                      placeholder="Enter Yearly Price"
                      value={values.yearly_price}
                      onChange={(event) =>
                        setFieldValue("yearly_price", event.target.value)
                      }
                    />
                  </div>
                </div>
                <ColorSelection />
              </div>
            </div>

            <hr className="border my-6" />

            <div className="grid grid-cols-12 gap-4 p-2 justify-between w-full">
              <div className="col-span-12 md:col-span-4 ">
                <Title as="h6" className="font-medium capitalize">
                  What&apos;s Included
                </Title>
                <Text
                  as="p"
                  className="text-gray-400 text-sm mt-0.5 font-normal capitalize"
                >
                  Edit subscription plans here.
                </Text>
              </div>

              <div className="col-span-12 md:col-span-8 space-y-3">
                {" "}
                <PlanFeatures />
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4 p-2 justify-between w-full">
              <div className="col-span-12 md:col-span-4 "></div>

              <div className="col-span-12 md:col-span-8 space-y-3">
                <div className=" py-4 flex items-center justify-end gap-4 w-full">
                  <Button
                    variant="outline"
                    size="md"
                    className="px-1 w-36 border-gray-400 rounded-md font-semibold"
                    onClick={() => router.back()}
                  >
                    <Text className="text-gray-600"> Cancel </Text>
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
                      Save Changes
                    </Text>
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </PageWrapper>
  );
};

export default EditSubscriptionPlan;
