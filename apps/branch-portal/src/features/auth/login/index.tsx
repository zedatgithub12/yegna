"use client";
import useDynamicMutation from "@/lib/api/use-post-data";
import { loginSchema, LoginType } from "@/validations/auth.schema";
import FormikInput from "@coop-super-app/lib/forms/input";
import { Button } from "@coop-super-app/ui/button";
import { Form, Formik } from "formik";
import React from "react";
import AuthWrapper from "../auth-wrapper";
import OtpVerifyForm from "../otp-verify-form";
import { Text, Title } from "@coop-super-app/ui/typography";
import Link from "next/link";
import { routes } from "@/lib/config/routes";
import PasswordLogin from "./password-login";
import CreatePasswordAndLogin from "../create-password";

const LoginPage = () => {
  const postMutation = useDynamicMutation({});
  const [time, setTime] = React.useState(120);
  const [isOtpSent, setIsOtpSent] = React.useState(false);
  const initialValues: LoginType = {
    username: "",
  };

  React.useEffect(() => {
    if (time > 0) {
      const timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [time]);
  const initialLoginSubmitHandler = async (values: LoginType) => {
    try {
      await postMutation.mutateAsync({
        url: `users/login`,
        method: "POST",
        body: {
          username: values.username,
        },
        onSuccess: () => {
          setTime(120);
          setIsOtpSent(true);
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <AuthWrapper>
        <div className="max-w-md mx-auto w-full">
          <div className="flex flex-col items-center justify-center">
            <Title as="h4" className="">
              Welcome Back
            </Title>
            <Title as="h4" className=" text-center max-w-xl mx-auto">
              Login to your Dashboard
            </Title>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={initialLoginSubmitHandler}
          >
            {() => (
              <Form className="space-y-3 w-full pb-4">
                <FormikInput
                  label="Username"
                  inputClassName="w-full flex-grow  !mr-0 !pr-0 "
                  name="username"
                  placeholder="Enter Your username"
                  pattern="alphabet"
                  suffix={
                    <div className="flex items-end justify-end self-end">
                      <Button
                        className="!m-0 hover:bg-primary disabled:hover:bg-transparent"
                        type="submit"
                        size="md"
                        color="primary"
                        isLoading={postMutation.isPending}
                        disabled={isOtpSent && time > 0}
                      >
                        {isOtpSent ? "Resend OTP" : "Get OTP"}
                      </Button>
                    </div>
                  }
                />
              </Form>
            )}
          </Formik>
          {!isOtpSent && (
            <div className="flex items-end justify-end w-full self-end">
              <Link
                href={routes.forgotPassword}
                className="cursor-pointer text-sm text-primary hover:underline text-end  w-fit font-medium"
              >
                Forgot PIN
              </Link>
            </div>
          )}
          {isOtpSent && <OtpVerifyForm onSuccess={() => {}} body={{}} />}
          <PasswordLogin />
          <CreatePasswordAndLogin />
          <div className="flex items-end justify-end self-end pt-10">
            <Text
              as="p"
              className="text-center select-none w-full text-xs h-full text-gray-400 z-30  "
            >
              Copyright © 2024 Coop Super App Bank SC. All rights reserved.
            </Text>
          </div>
        </div>
      </AuthWrapper>
    </div>
  );
};

export default LoginPage;
