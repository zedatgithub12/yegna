import { Check } from "lucide-react"; // Optional: use any icon library or replace with ✓

type Step = {
  label: string;
  description: string;
};

export type StepperProps = {
  steps: Step[];
  currentStep: number;
};

export const Stepper = ({ steps, currentStep }: StepperProps) => {
  return (
    <div className="flex items-center justify-between w-full p-4 rounded-lg bg-gray-50">
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;

        return (
          <div key={index} className="flex items-center w-full">
            <div className="flex items-center gap-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                  isCompleted
                    ? "bg-green-600"
                    : isActive
                      ? "bg-teal-900"
                      : "border-2 border-gray-300 text-gray-600 bg-white"
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
              <div className="flex-1 h-px bg-gray-300 mx-2"></div>
            )}
          </div>
        );
      })}
    </div>
  );
};
