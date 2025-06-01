"use client";

import React from "react";
import { Title, Text } from "@yegna-systems/ui/typography";

import { useFetchData } from "@/lib/api/use-fetch-data";
import { queryKeys } from "@/lib/api/query-keys";

interface Subscription {
  selectedPlanId: string;
  onSelect: (id: string) => void;
}

const SubscriptionPlan: React.FC<Subscription> = ({
  selectedPlanId,
  onSelect,
}) => {
  const {
    data: responsePayload,
    isLoading,
    error,
  } = useFetchData(
    [queryKeys.get_subscription_plans],
    `${queryKeys.get_subscription_plans}`
  );

  if (isLoading) return <div>Loading plans...</div>;
  if (error) return <div>Error loading plans</div>;

  const subscriptionData = (responsePayload?.data?.data || []).filter(
    (plan: SubscriptionProps) => plan.is_active
  );

  return (
    <div className="gap-4 p-2 py-6 w-full">
      <div className="flex items-center justify-between">
        <Title as="h6" className="font-medium capitalize">
          Subscription Plans
        </Title>
        <Text
          as="p"
          className="text-gray-400 text-sm mt-0.5 font-normal capitalize"
        >
          Select a subscription plan to continue
        </Text>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-9">
        {subscriptionData.map((plan: SubscriptionProps) => (
          <div
            key={plan.id}
            onClick={() => onSelect(plan.id)}
            className={`relative flex flex-col bg-white rounded-2xl p-6 shadow-md border cursor-pointer transition-all duration-200
              ${
                selectedPlanId === plan.id
                  ? "border-primary ring-2 ring-primary"
                  : "border-gray-100"
              }
              hover:-translate-y-1 hover:shadow-lg
            `}
          >
            <div className="flex items-center justify-between mb-4">
              {/* <div className="flex items-center">{plan.color}</div> */}
              <div className="text-gray-400 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>

            <Title className="text-xl font-bold text-black">{plan.name}</Title>
            <Text className="text-sm text-gray-500 mt-1">
              {plan.description}
            </Text>

            <hr className="my-4 border-gray-200" />
            <ul className="mt-4 space-y-3">
              {plan.features.map((feature: Features) => (
                <li
                  key={feature.feature.id}
                  className="flex items-center text-sm text-gray-700"
                >
                  <svg
                    className="h-4 w-4 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {feature.feature.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SubscriptionPlan;
