"use client";

import React from "react";
import { Title, Text } from "@/components/ui/typography";
import cn from "@/utils/lib/class-names";
import { Checkbox } from "@/components/ui/checkbox";
import SubscriptionPlan from "./SubscriptionPlan";
import { useFormikContext } from "formik";

const BillingCycles = ["monthly", "yearly"] as const;

const DocumentsAndAgreements = () => {
  const { values, setFieldValue } = useFormikContext<institutionProps>();

  return (
    <>
      <div className="grid grid-row-12 gap-4 p-2 justify-between w-full">
        <div className="col-span-4">
          <Title as="h6" className="font-medium capitalize">
            Billing Cycle
          </Title>
          <Text
            as="p"
            className="text-gray-400 text-sm mt-0.5 font-normal capitalize"
          >
            Billing Cycle Options for Subscription Plans
          </Text>
        </div>

        <div className="col-span-8 flex gap-4">
          {BillingCycles.map((cycle) => {
            const isSelected = values.subscription_cycle === cycle;

            return (
              <button
                key={cycle}
                type="button"
                onClick={() => setFieldValue("subscription_cycle", cycle)}
                className={cn(
                  "relative flex items-center justify-between px-6 py-4 w-full rounded-xl text-base font-medium transition-all duration-200",
                  isSelected
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                )}
              >
                <span className="capitalize">{cycle}</span>
                {isSelected && (
                  <Checkbox
                    checked
                    readOnly
                    className="absolute top-2 right-2"
                    size="md"
                    variant="flat"
                    rounded="full"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
      <SubscriptionPlan
        selectedPlanId={values.subscription_plan_id}
        onSelect={(id) => setFieldValue("subscription_plan_id", id)}
      />
    </>
  );
};

export default DocumentsAndAgreements;
