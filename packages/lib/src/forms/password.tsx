/* eslint-disable react/prop-types */
"use client";
import cn from "@coop-super-app/ui/cn";
import { useField, ErrorMessage } from "formik";
import { Password, PasswordProps } from "@coop-super-app/ui/password";
interface FormikPasswordInputProps extends PasswordProps {
  name: string;
}

const FormikPasswordInput: React.FC<FormikPasswordInputProps> = ({
  name,
  className,
  inputClassName,
  color,
  size = "md",
  ...props
}) => {
  const [field] = useField(name);
  return (
    <div className={cn("", className)}>
      <Password
        autoComplete="off"
        {...field}
        className={cn("[&>label>span]:font-medium ", className)}
        inputClassName={cn(
          "text-sm bg-gray-50 dark:bg-gray-100 placeholder:!text-gray-950 [&>label>span]:font-medium border-gray-50  shadow-none",
          inputClassName
        )}
        color={color}
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

export default FormikPasswordInput;
