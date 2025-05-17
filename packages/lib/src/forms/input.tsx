/* eslint-disable react/prop-types */
"use client";
import { Input, InputProps } from "@yegna-systems/ui/input";
import cn from "@yegna-systems/ui/cn";
import { useField, ErrorMessage } from "formik";
interface FormikInputProps extends InputProps {
  name: string;
  pattern?: "alphabet" | "alphaNumerics" | "number";
}

const FormikInput: React.FC<FormikInputProps> = ({
  name,
  label,
  type = "text",
  className,
  inputClassName,
  color = "primary",
  disabled = false,
  size = "md",
  maxLength = 100,
  pattern,
  required,
  labelClassName,
  ...props
}) => {
  const [field] = useField(name);
  return (
    <div className={cn("", className)}>
      <Input
        autoComplete="off"
        maxLength={maxLength}
        onInput={(e) => {
          const input = e.currentTarget;
          if (pattern === "number") {
            input.value = input.value.replace(/[^0-9e.-]/g, "");
          }

          if (pattern === "alphaNumerics") {
            input.value = input.value.replace(/[^a-zA-Z0-9]/g, "");
          }

          if (pattern === "alphabet") {
            input.value = input.value.replace(/[^a-zA-Z\s]/g, "");
          }
          if (input.value.length > input.maxLength) {
            input.value = input.value.slice(0, input.maxLength);
          }
        }}
        {...field}
        type={type}
        label={
          <div className={cn("", labelClassName)}>
            {label}
            {required && <sup className="text-red-500">*</sup>}
          </div>
        }
        name={name}
        className={cn("[&>label>span]:font-medium", className)}
        inputClassName={cn(
          "text-sm bg-gray-50 dark:bg-gray-100 placeholder:!text-gray-950 [&>label>span]:font-medium border-gray-50  shadow-none",
          inputClassName
        )}
        color={color}
        disabled={disabled}
        size={size}
        {...props}
      />
      <ErrorMessage
        name={name}
        component="div"
        className={"text-xs text-red-500 pt-1 font-medium"}
      />
    </div>
  );
};

export default FormikInput;
