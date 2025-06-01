import React from "react";
import { Text, Title } from "@yegna-systems/ui/typography";
import { FaCircleCheck } from "react-icons/fa6";

const BillingCycle = () => {
  return (
    <div className="p-2">
      <Title as="h4">Billing Cycle</Title>
      <Text className="text-gray-500 mt-1 text-xs">
        Billing Cycle Options for Subscription Plans
      </Text>

      <div className="flex items-center w-full gap-3 mt-6 ">
        <div className="col-span-12 co bg-primary rounded-xl p-5 flex items-center justify-between w-1/2">
          <Text className="text-secondary text-md font-medium">Monthly</Text>

          <FaCircleCheck size={16} className="text-secondary" />
        </div>

        <div className="bg-secondary rounded-xl p-5 flex items-center justify-between w-1/2">
          <Text className="text-primary text-md font-medium">Yearly</Text>

          <FaCircleCheck size={16} className="text-primary" />
        </div>
      </div>
    </div>
  );
};

export default BillingCycle;
