/* eslint-disable react/prop-types */
"use client";
import { Textarea, TextareaProps } from "@yegna-systems/ui/textarea";
import cn from "@yegna-systems/ui/cn";
import { useField, ErrorMessage } from "formik";
interface FormikTextAreaProps extends TextareaProps {
  name: string;
}

const FormikTextArea: React.FC<FormikTextAreaProps> = ({
  label,
  name,
  placeholder,
  prefix,
  className,
  textareaClassName,
  color,
  disabled = false,
  labelClassName,
  required,
  ...props
}) => {
  const [field] = useField(name);
  return (
    <div className={cn("", className)}>
      <Textarea
        prefix={prefix}
        autoComplete="off"
        {...field}
        label={
          <div className={cn("", labelClassName)}>
            {label}
            {required && <sup className="text-red-500">*</sup>}
          </div>
        }
        name={name}
        textareaClassName={cn(
          "text-sm bg-gray-50 dark:bg-gray-100 placeholder:!text-gray-950 [&>label>span]:font-medium border-gray-50  shadow-none",
          textareaClassName
        )}
        placeholder={placeholder}
        className={cn("[&>label>span]:font-medium ", className)}
        color={color}
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

export default FormikTextArea;
