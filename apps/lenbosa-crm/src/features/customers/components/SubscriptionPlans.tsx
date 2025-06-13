import { Text, Title } from "@yegna-systems/ui/typography";
import { Check } from "lucide-react";
import { Tooltip } from "@/components/ui/tooltip";
import { useFetchData } from "@/lib/api/use-fetch-data";
import { queryKeys } from "@/lib/api/query-keys";
import { ErrorMessage, useFormikContext } from "formik";
import PageWrapper from "@/components/PagesWrapper";
import InfoIcon from "@/components/icons/info-icon";
import { FaCircleCheck } from "react-icons/fa6";

const SubscriptionPlans = () => {
  const { values, setFieldValue } = useFormikContext<CustomerFormValues>();

  const subscriptionPayload = useFetchData(
    [queryKeys.subscriptions],
    queryKeys.subscriptions
  );
  const plans: SubscriptionPlans[] = subscriptionPayload?.data?.data?.data;

  const handlePlanSelection = (plan_id: string) => {
    if (plan_id === values.selected_plan) {
      setFieldValue("selected_plan", "");
    } else {
      setFieldValue("selected_plan", plan_id);
    }
  };

  return (
    <PageWrapper
      hasHeader={false}
      isLoading={subscriptionPayload.isFetching}
      title="Message Broadcasting"
      back={false}
      search={true}
      isError={subscriptionPayload.isError}
      breadcrumb={true}
      notfound={false}
      fallback={{
        status_code: plans?.length === 0 ? "404" : "500",
        title:
          plans?.length === 0
            ? "Subscription plan not found"
            : "Server Error getting subscription plans",
        message:
          plans?.length === 0
            ? "There is subscription plan to select"
            : "Opps! There's Error getting messages",
      }}
      childrenClassnames="p-1.5 my-4"
    >
      <Title as="h5">Subscription Plans</Title>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 mt-3">
        {plans?.map((plan, idx) => (
          <div
            key={idx}
            className={` rounded-2xl  px-2 pt-6 pb-3.5 flex flex-col  transition-all ease-out duration-100 cursor-pointer ${values.selected_plan === plan.id ? "border-2 border-primary bg-primary " : "bg-white"} `}
            onClick={() => handlePlanSelection(plan.id)}
          >
            <div className="flex items-start justify-between mb-4 px-2">
              <div className="flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{
                    background: plan.color
                      ? `linear-gradient(45deg, ${plan.color})`
                      : "#ddd",
                  }}
                >
                  <div
                    className={`w-5 h-5 rounded-full  ${values.selected_plan === plan.id ? "bg-primary" : "bg-white"}`}
                  />
                </div>

                <div className="flex items-end gap-1">
                  <Title
                    as="h3"
                    className={`font-black ${values.selected_plan === plan.id ? "text-secondary" : ""}`}
                  >
                    {values.billing_cycle === "monthly"
                      ? plan.monthly_price
                      : plan.yearly_price}
                  </Title>
                  <Text
                    className={`font-medium text-sm mb-0.5 ${values.selected_plan === plan.id ? "text-secondary" : ""}`}
                  >
                    ETB
                  </Text>
                </div>
              </div>

              {values.selected_plan === plan.id ? (
                <FaCircleCheck
                  size={22}
                  className="text-secondary animate-bounce"
                />
              ) : (
                <Tooltip
                  content={
                    <div
                      className="text-sm text-gray-400 my-1 w-52"
                      dangerouslySetInnerHTML={{
                        __html: plan.description ?? "",
                      }}
                    />
                  }
                >
                  <InfoIcon color="#AAAAAA" className="w-5 h-5" />
                </Tooltip>
              )}
            </div>

            <div className="border-b pb-2 px-2">
              <Title
                as="h4"
                className={`text-lg font-bold mt-4 ${values.selected_plan === plan.id ? "text-secondary" : ""}`}
              >
                {plan.name}
              </Title>
              <div
                className={`text-sm  my-1 ${values.selected_plan === plan.id ? "text-secondary opacity-80" : "text-gray-400"}`}
                dangerouslySetInnerHTML={{ __html: plan.description ?? "" }}
              />
            </div>

            <ul className="space-y-4 flex-1 pt-3 px-2">
              {plan?.features?.map((feature, i) => (
                <li
                  key={i}
                  className={`flex items-center text-sm  ${values.selected_plan === plan.id ? "text-white" : "text-gray-700"}`}
                >
                  <Check
                    className={` w-4 h-4 mr-2 ${values.selected_plan === plan.id ? "text-secondary" : "text-green-500"}`}
                  />
                  {feature.feature.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <ErrorMessage name="selected_plan">
        {(msg) => (
          <div className="mt-4 flex items-center gap-2">
            <InfoIcon color="#ef4444" className="w-4 h-4" />
            <Text className="text-red-500">{msg}</Text>
          </div>
        )}
      </ErrorMessage>
    </PageWrapper>
  );
};

export default SubscriptionPlans;
