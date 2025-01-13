import { queryKeys } from "@/lib/api/query-keys";
import { useFetchData } from "@/lib/api/useFetchData";
import useDynamicMutation from "@/lib/api/usePostData";
import { generatePasswordValidationSchema } from "@/validations/auth.schema";
import FormikPasswordInput from "@coop-super-app/lib/forms/password";
import { Button } from "@coop-super-app/ui/button";
import { Text } from "@coop-super-app/ui/typography";
import { Form, Formik } from "formik";
import React from "react";
import cn from "@coop-super-app/ui/cn";
import * as Yup from "yup";
import {
  hasCapitalLetter,
  hasNumber,
  hasSmallLetter,
  hasSpecialCharacter,
} from "@/utils/misc";
import Loader from "@coop-super-app/lib/table/loader";
const CreatePasswordAndLogin = () => {
  const postMutation = useDynamicMutation();
  const passwordRuleData = useFetchData(
    [queryKeys.getLoginPasswordRuleQuery],
    `users/getPasswordRules`
  );
  const _data: PasswordData[] = passwordRuleData?.data;
  const _bpsPassword = _data?.find((item) => item.name === "BPS");
  const passwordSchema = generatePasswordValidationSchema(_bpsPassword!);
  const createPasswordSchema = Yup.object().shape({
    password: passwordSchema,
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password must match")
      .transform((value) => value.trim())
      .required("Confirm Password is required"),
  });
  type CreatePassword = Yup.InferType<typeof createPasswordSchema>;

  const createPasswordAndLoginSubmitHandler = async (
    values: CreatePassword
  ) => {
    try {
      await postMutation.mutateAsync({
        url: `users/login`,
        method: "POST",
        body: {
          username: values.password,
        },
        onSuccess: () => {},
      });
    } catch (err) {
      console.log(err);
    }
  };

  if (passwordRuleData.isPending) return <Loader />;
  if (passwordRuleData.isError) {
    return <span>Error: {passwordRuleData.error.message}</span>;
  }
  return (
    <div>
      <Formik
        initialValues={{
          password: "",
          confirmPassword: "",
        }}
        validationSchema={createPasswordSchema}
        onSubmit={createPasswordAndLoginSubmitHandler}
      >
        {({ values }) => (
          <Form className="space-y-3 w-full pb-4">
            <FormikPasswordInput
              label="Password"
              name="password"
              placeholder="Enter Your Password"
            />
            <FormikPasswordInput
              label="Confirm Password"
              name="confirmPassword"
              placeholder="Confirm Your Password"
            />
            <div className="w-full">
              <Text className="pt-2 dark:text-black text-black">
                Password Must Contain
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
            <Button
              type="submit"
              className="w-full"
              isLoading={postMutation.isPending}
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreatePasswordAndLogin;
