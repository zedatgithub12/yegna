"use client";

import { toast } from "sonner";
import { Formik, Form } from "formik";
import { generatePasswordValidationSchema } from "@/validations/auth.schema";
import { useModal } from "@coop-super-app/lib/hooks/use-modal";
import useDynamicMutation from "@/lib/api/use-post-data";
import PasswordIcon from "@/components/icons/password";
import FormikPasswordInput from "@coop-super-app/lib/forms/password";
import { useFetchData } from "@/lib/api/use-fetch-data";
import { queryKeys } from "@/lib/api/query-keys";
import * as Yup from "yup";
import { Text } from "@coop-super-app/ui/typography";
import cn from "@coop-super-app/ui/cn";
import {
  hasCapitalLetter,
  hasNumber,
  hasSmallLetter,
  hasSpecialCharacter,
} from "@coop-super-app/lib/utils/misc";
import Loader from "@coop-super-app/lib/table/loader";
import { useQueryClient } from "@tanstack/react-query";
import ModalFooter from "@coop-super-app/lib/view/modal-footer";
import ModalHeader from "@coop-super-app/lib/view/modal-header";
import ErrorMessage from "@coop-super-app/lib/view/error-message";
export default function ChangePassword() {
  const { closeModal } = useModal();
  const queryClient = useQueryClient();
  const postMutation = useDynamicMutation({});
  const passwordRuleData = useFetchData(
    [queryKeys.getLoginPasswordRuleQuery],
    `users/getPasswordRules`
  );
  const _data: PasswordData[] = passwordRuleData?.data;
  const _bpsPassword = _data?.find((item) => item.name === "BPS");
  const passwordSchema = generatePasswordValidationSchema(_bpsPassword!);
  const changePasswordSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Old Password is required"),
    password: passwordSchema,
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password must match")
      .transform((value) => value.trim())
      .required("Confirm Password is required"),
  });
  type ChangePasswordType = Yup.InferType<typeof changePasswordSchema>;
  const initialValues: ChangePasswordType = {
    oldPassword: "",
    password: "",
    confirmPassword: "",
  };
  const initialLoginMutationSubmitHandler = async (
    values: ChangePasswordType
  ) => {
    try {
      await postMutation.mutateAsync({
        url: `users/change-password`,
        method: "POST",
        body: {
          old_password: values.oldPassword,
          new_password: values.password,
        },
        onSuccess: () => {
          closeModal();
          toast.success("Password Changed Successfully");
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  if (passwordRuleData.isLoading) return <Loader className="py-5" />;
  if (passwordRuleData.isError)
    return (
      <ErrorMessage
        message="Something went wrong while fetching password rules"
        onRefresh={() =>
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getLoginPasswordRuleQuery],
          })
        }
      />
    );
  return (
    <div className="flex w-full flex-col items-start space-y-2 p-5">
      <ModalHeader icon={<PasswordIcon />} desc="" title={"Change Password"} />
      <Formik
        initialValues={initialValues}
        validationSchema={changePasswordSchema}
        onSubmit={initialLoginMutationSubmitHandler}
      >
        {({ values }) => (
          <Form className="w-full space-y-2">
            <FormikPasswordInput
              label="Old Password"
              name="oldPassword"
              placeholder="Enter Your Old Password"
              color="primary"
            />
            <FormikPasswordInput
              name="password"
              label="Password"
              placeholder="Enter Your Password"
              color="primary"
            />
            <FormikPasswordInput
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm Your Password"
              color="primary"
            />
            <div className="w-full">
              <Text className="pt-2 dark:text-black text-black">
                New Password Must Contain
              </Text>
              <div className="flex flex-col items-start space-y-[0.5px]">
                <Text
                  as="span"
                  className={cn(
                    "text-xs capitalize text-red-500 font-medium",
                    values.password.length >= (_bpsPassword?.minLength || 4) &&
                      " text-green-500"
                  )}
                >
                  At least {_bpsPassword?.minLength} characters
                </Text>
                <Text
                  as="span"
                  className={cn(
                    "text-xs capitalize text-red-500 font-medium",
                    values.password.length <= (_bpsPassword?.maxLength || 44) &&
                      " text-green-500"
                  )}
                >
                  Maximum {_bpsPassword?.maxLength} characters
                </Text>
                {_bpsPassword?.capitalLetters && (
                  <Text
                    as="span"
                    className={cn(
                      "text-xs capitalize text-red-500 font-medium",
                      hasCapitalLetter(values.password) && " text-green-500"
                    )}
                  >
                    one upper case
                  </Text>
                )}
                {_bpsPassword?.numbers && (
                  <Text
                    as="span"
                    className={cn(
                      "text-xs capitalize text-red-500 font-medium",
                      hasNumber(values.password) && " text-green-500"
                    )}
                  >
                    one number
                  </Text>
                )}
                {_bpsPassword?.smallLetters && (
                  <Text
                    as="span"
                    className={cn(
                      "text-xs capitalize text-red-500 font-medium",
                      hasSmallLetter(values.password) && " text-green-500"
                    )}
                  >
                    one lower case
                  </Text>
                )}
                {_bpsPassword?.characters && (
                  <Text
                    as="span"
                    className={cn(
                      "text-xs capitalize text-red-500 font-medium",
                      hasSpecialCharacter(values.password) && " text-green-500"
                    )}
                  >
                    #*%$ one special character
                  </Text>
                )}
              </div>
            </div>
            <div className="flex w-full items-center gap-3 pt-3">
              <ModalFooter
                loading={postMutation.isPending}
                submitButtonText="Change Password"
                submitButtonType="submit"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
