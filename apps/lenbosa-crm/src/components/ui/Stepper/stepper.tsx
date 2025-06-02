import cn from "@yegna-systems/ui/cn";
import { Check } from "lucide-react"; // Optional: use any icon library or replace with ✓

type Step = {
  label: string;
  description: string;
};

export type StepperProps = {
  steps: Step[];
  currentStep: number;
  stepClassName?: string;
};

export const Stepper = ({
  steps,
  currentStep,
  stepClassName,
}: StepperProps) => {
  return (
    <div className="flex items-center justify-between w-full p-4 rounded-lg bg-white">
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;

        return (
          <div
            key={index}
            className={cn(
              `flex items-center  ${index < steps.length - 1 ? "w-10/12" : ""}`,
              stepClassName
            )}
          >
            <div className="flex items-center gap-2">
              <div
                className={`min-w-10 min-h-10 rounded-full flex items-center justify-center text-[16px] font-bold  ${
                  isCompleted
                    ? "bg-green-600"
                    : isActive
                      ? "bg-primary text-secondary"
                      : "border-2 border-gray-300 text-black-300 bg-white"
                }`}
              >
                {isCompleted ? (
                  <Check size={20} className="text-white" />
                ) : (
                  index + 1
                )}
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-sm text-gray-900">
                  {step.label}
                </span>
                <span className="text-xs text-gray-400">
                  {step.description}
                </span>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5  mx-2 w-full rounded-full ${
                  isCompleted
                    ? "bg-green-600"
                    : isActive
                      ? "bg-primary"
                      : "bg-gray-800"
                }`}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
};
