"use client";
import useDynamicMutation from "@/lib/api/use-post-data";
import FormikInput from "@yegna-systems/lib/forms/input";
import React from "react";
import AuthWrapper from "../auth-wrapper";
import Logo from "@/components/logo";
import { ForgotType, forgotPasswordSchema } from "@/validations/auth.schema";
import { Button } from "@yegna-systems/ui/button";
import { Form, Formik } from "formik";
import { Text, Title } from "@yegna-systems/ui/typography";
import { queryKeys } from "@/lib/api/query-keys";
import Config from "@/config";
import { useRouter } from "next/navigation";

const ForgotPassword = () => {
  const postMutation = useDynamicMutation({});
  const router = useRouter();

  const initialValues: ForgotType = {
    email: "",
  };

  const initialLoginSubmitHandler = async (values: ForgotType) => {
    try {
      await postMutation.mutateAsync({
        url: queryKeys.forgot_password,
        method: "POST",
        body: {
          email: values.email,
        },
        onSuccess: (res) => {
          if (res.success) {
            router.push(`/auth/verify-otp/${values.email}`);
          }
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <AuthWrapper>
        <div className=" relative max-w-xl  w-full h-full flex-col  justify-between ">
          <div className="flex flex-col items-center justify-center p-6 h-5/6 ">
            <Logo />

            <Title as="h4" className=" text-center max-w-xl mx-auto mt-2">
              Forgot Password
            </Title>

            <Text className="mt-1 text-gray-500 font-normal mb-4">
              Enter your email to reset your Password
            </Text>

            <Formik
              initialValues={initialValues}
              validationSchema={forgotPasswordSchema}
              onSubmit={initialLoginSubmitHandler}
            >
              {({ errors, touched }) => (
                <Form className="space-y-3 w-full pb-4 px-3">
                  <FormikInput
                    label="Email"
                    inputClassName="w-full flex-grow  !mr-0 !pr-0 "
                    name="email"
                    placeholder="Enter your email"
                    error={touched.email ? errors.email : undefined}
                  />

                  <Button
                    type="submit"
                    className="w-full text-secondary "
                    isLoading={postMutation.isPending}
                  >
                    Continue
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
          <div className="flex  items-end justify-end self-end ">
            <Text
              as="p"
              className=" text-center select-none w-full text-xs h-full text-gray-400 z-30  "
            >
              {Config.copy_right}
            </Text>
          </div>
        </div>
      </AuthWrapper>
    </div>
  );
};

export default ForgotPassword;
