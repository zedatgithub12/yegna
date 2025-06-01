"use client";

import cn from "@yegna-systems/ui/cn";
import { MultiSelect, MultiSelectOption } from "@yegna-systems/ui/multi-select";
import { ErrorMessage } from "formik";
import React from "react";
interface FormikSelectProps {
  name: string;
  value: string[];
  label?: string;
  placeholder?: string;
  prefix?: React.ReactNode;
  className?: string;
  inputClassName?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  options: MultiSelectOption[];
  onChange: (value: string[]) => void;
  searchable?: boolean;
  displayValue?: (
    selectedItems: string[],
    options: MultiSelectOption[],
    handleClearItem?: (item: string) => void
  ) => React.ReactNode;
  required?: boolean;
  labelClassName?: string;
}

const FormikMultiSelect: React.FC<FormikSelectProps> = ({
  label,
  name,
  placeholder,
  prefix,
  className,
  inputClassName,
  disabled = false,
  size = "md",
  options,
  onChange,
  value,
  searchable,
  displayValue,
  required,
  labelClassName,
  ...props
}) => {
  return (
    <div className={cn("w-full", className)}>
      <MultiSelect
        prefix={prefix}
        placeholder={placeholder}
        options={options}
        value={value}
        onChange={onChange}
        label={
          <div className={cn("", labelClassName)}>
            {label}
            {required && <sup className="text-red-700 text-[16px]">*</sup>}
          </div>
        }
        // getOptionValue={(option: MultiSelectOption) => option.value}
        size={size}
        searchable={searchable}
        displayValue={displayValue}
        selectClassName={cn(
          "text-sm bg-gray-50 dark:bg-gray-100 placeholder:!text-gray-950 [&>label>span]:font-medium border-gray-50  shadow-none",
          inputClassName
        )}
        name={name}
        disabled={disabled}
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

export default FormikMultiSelect;
