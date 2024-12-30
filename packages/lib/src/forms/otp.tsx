"use client";
import { PinCode, PinCodeProps } from "@coop-super-app/ui/pin-code";
import cn from "@coop-super-app/ui/cn";
import { useField, ErrorMessage } from "formik";
import React from "react";
interface FormikCodeInputProps extends PinCodeProps {
  name: string;
}

const FormikCodeInput: React.FC<FormikCodeInputProps> = ({
  name,
  placeholder,
  className,
  inputClassName,
  color,
  disabled = false,
  size = "md",
  length = 6,
  setValue,
  ...props
}) => {
  const [field] = useField(name);
  return (
    <div className={cn("", className)}>
      <PinCode
        autoComplete="off"
        {...field}
        length={length}
        setValue={setValue}
        name={name}
        placeholder={placeholder}
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
        className={"text-xs  text-red-500 pt-1 font-medium"}
      />
    </div>
  );
};

export default FormikCodeInput;
