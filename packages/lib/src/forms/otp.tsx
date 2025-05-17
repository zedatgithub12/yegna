"use client";
import { PinCode, PinCodeProps } from "@yegna-systems/ui/pin-code";
import cn from "@yegna-systems/ui/cn";
import { ErrorMessage } from "formik";
import React from "react";

interface FormikCodeInputProps extends PinCodeProps {
  name: string;
}

const FormikCodeInput = ({
  name,
  placeholder,
  className,
  inputClassName,
  size = "md",
  length = 6,
  ...props
}: FormikCodeInputProps) => {
  return (
    <div className={cn("", className)}>
      <PinCode
        {...props}
        name={name}
        length={length}
        type="number"
        size={size}
        placeholder={placeholder}
        className={cn("[&>label>span]:font-medium", className)}
        inputClassName={cn(
          "text-sm bg-gray-50 dark:bg-gray-100 placeholder:!text-gray-950 [&>label>span]:font-medium border-gray-50  shadow-none",
          inputClassName
        )}
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-xs text-red-500 pt-1 font-medium"
      />
    </div>
  );
};

export default FormikCodeInput;
