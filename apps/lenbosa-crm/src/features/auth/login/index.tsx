"use client";
import useDynamicMutation from "@/lib/api/use-post-data";
import FormikInput from "@yegna-systems/lib/forms/input";
import React from "react";
import AuthWrapper from "../auth-wrapper";
import Link from "next/link";
import Logo from "@/components/logo";
import FormikPasswordInput from "@yegna-systems/lib/forms/password";
import { loginSchema, LoginType } from "@/validations/auth.schema";
import { Button } from "@yegna-systems/ui/button";
import { Form, Formik } from "formik";
import { Text, Title } from "@yegna-systems/ui/typography";
import { routes } from "@/lib/config/routes";
import { queryKeys } from "@/lib/api/query-keys";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

const LoginPage = () => {
  const postMutation = useDynamicMutation({});

  const initialValues: LoginType = {
    username: "",
    password: "",
  };

  const initialLoginSubmitHandler = async (values: LoginType) => {
    try {
      await postMutation.mutateAsync({
        url: queryKeys.login,
        method: "POST",
        body: {
          username: values.username,
          password: values.password,
        },
        onSuccess: (res) => {
          const userData = {
            ...res?.data,
            ...res?.data?.user,
            token: res?.data?.access_token,
          };

          signIn("credentials", {
            data: JSON.stringify(userData),
            callbackUrl: "/",
          });

          toast.loading("Login Successful, Redirecting...");
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
          <div className="flex flex-col items-center justify-center p-6  h-5/6">
            <Logo />

            <Title as="h4" className=" text-center max-w-xl mx-auto mt-2">
              Login to your Account
            </Title>

            <Text className="mt-1 text-gray-500 font-normal mb-4">
              Enter your Credentials to log in and access your account
            </Text>

            <Formik
              initialValues={initialValues}
              validationSchema={loginSchema}
              onSubmit={initialLoginSubmitHandler}
            >
              {() => (
                <Form className="space-y-3 w-full pb-4 px-3">
                  <FormikInput
                    label="Email"
                    inputClassName="w-full flex-grow  !mr-0 !pr-0 "
                    name="username"
                    placeholder="Enter your email"
                  />
                  <FormikPasswordInput
                    label="Password"
                    name="password"
                    placeholder="Enter Your Password"
                  />

                  <div className="flex items-end justify-end w-full self-end mb-12">
                    <Link
                      href={routes.forgotPassword}
                      className="cursor-pointer text-sm text-primary hover:underline text-end  w-fit font-medium"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    className="w-full text-secondary "
                    isLoading={postMutation.isPending}
                  >
                    Login
                  </Button>
                </Form>
              )}
            </Formik>
          </div>

          <div className="flex items-end justify-end self-end relative">
            <Text
              as="p"
              className=" absolute bottom-0 left-0 text-center select-none w-full text-xs h-full text-gray-400 z-30  "
            >
              Lenbosa by Nexel Design PLC
            </Text>
          </div>
        </div>
      </AuthWrapper>
    </div>
  );
};

export default LoginPage;
