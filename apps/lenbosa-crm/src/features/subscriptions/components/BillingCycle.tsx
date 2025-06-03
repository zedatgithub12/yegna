import React from "react";
import { Text, Title } from "@yegna-systems/ui/typography";
import { FaCircleCheck } from "react-icons/fa6";
import { Circle } from "lucide-react";

const billingCycles = ["monthly", "yearly"];

const BillingCycle = ({
  selectedCycle,
  setSelectedCycle,
}: {
  selectedCycle: string;
  setSelectedCycle: (value: string) => void;
}) => {
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
            className={`col-span-12 transition-all ease-out duration-100 cursor-pointer rounded-xl p-5 flex items-center justify-between w-1/2 ${
              selectedCycle === cycle
                ? "bg-gradient-to-r from-primary to-secondary animate-gradient"
                : "bg-white border border-primary"
            }`}
            onClick={() => setSelectedCycle(cycle)}
          >
            <Text
              className={`text-[15px] font-medium capitalize ${
                selectedCycle === cycle ? "text-secondary" : "text-primary"
              }`}
            >
              {cycle}
            </Text>

            {selectedCycle === cycle ? (
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
