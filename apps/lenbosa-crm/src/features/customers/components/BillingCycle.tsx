import React from "react";
import { Text, Title } from "@yegna-systems/ui/typography";
import { FaCircleCheck } from "react-icons/fa6";
import { useFormikContext } from "formik";
import { Circle } from "lucide-react";

const billingCycles = ["monthly", "yearly"];

const BillingCycle = () => {
  const { values, setFieldValue } = useFormikContext<CustomerFormValues>();

  return (
    <div className="p-2">
      <Title as="h5">Billing Cycle</Title>
      <Text className="text-gray-500 mt-1 text-xs">
        Billing Cycle Options for Subscription Plans
      </Text>

      <div className="flex items-center w-full gap-5 mt-6 ">
        {billingCycles.map((cycle, index) => (
            <div
            key={index}
            className={`col-span-12 hover:scale-105 transition-all ease-out duration-100 cursor-pointer rounded-xl p-5 flex items-center justify-between w-1/2 ${
              values.billing_cycle === cycle
              ? "bg-gradient-to-r from-primary to-secondary animate-gradient"
              : "bg-white"
            }`}
            onClick={() => setFieldValue("billing_cycle", cycle)}
            >
            <Text
              className={`text-[15px] font-medium capitalize ${
              values.billing_cycle === cycle ? "text-secondary" : "text-primary"
              }`}
            >
              {cycle}
            </Text>

            {values.billing_cycle === cycle ? (
              <FaCircleCheck size={22} className="text-primary" />
            ) : (
              <Circle size={16} className="text-primary" />
            )}
            </div>
        ))}
      </div>
    </div>
  );
};

export default BillingCycle;
