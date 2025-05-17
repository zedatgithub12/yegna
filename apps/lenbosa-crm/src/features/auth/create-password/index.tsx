"use client";
import useDynamicMutation from "@/lib/api/use-post-data";
import React from "react";
import AuthWrapper from "../auth-wrapper";
import Logo from "@/components/logo";
import {
  createPasswordSchema,
  createPasswordType,
} from "@/validations/auth.schema";
import { Button } from "@yegna-systems/ui/button";
import { Form, Formik } from "formik";
import { Text, Title } from "@yegna-systems/ui/typography";
import { toast } from "sonner";
import Config from "@/config";
import { queryKeys } from "@/lib/api/query-keys";
import FormikPasswordInput from "@yegna-systems/lib/forms/password";
import { useRouter } from "nextjs-toploader/app";

const CreatePassword = () => {
  const router = useRouter();
  const postMutation = useDynamicMutation({});
  const initialCreateValues: createPasswordType = {
    password: "",
    confirm_password: "",
  };

  const handleSettingNewPassword = async (values: createPasswordType) => {
    const token = sessionStorage.getItem("token");
    try {
      await postMutation.mutateAsync({
        url: queryKeys.create_password,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: {
          password: values.password,
          confirm_password: values.confirm_password,
        },
        onSuccess: () => {
          toast.success("Successfully set new password");
          router.replace("/");
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
              Enter New Password
            </Title>

            <Text className="mt-1 text-gray-500 font-normal mb-4 text-center">
              Enter New password to access your account
            </Text>

            <Formik
              initialValues={initialCreateValues}
              validationSchema={createPasswordSchema}
              onSubmit={handleSettingNewPassword}
            >
              {({ touched, errors }) => (
                <Form className="flex w-full flex-col items-center space-y-3 pb-4">
                  <FormikPasswordInput
                    label="New Password"
                    name="password"
                    placeholder="Enter Your Password"
                    className="w-full mt-2"
                    error={touched.password ? errors.password : undefined}
                  />

                  <FormikPasswordInput
                    label="Confirm Password"
                    name="confirm_password"
                    placeholder="Enter Your Password"
                    className="w-full "
                    error={
                      touched.confirm_password
                        ? errors.confirm_password
                        : undefined
                    }
                  />

                  <div className="mt-2.5 w-full">
                    <Button
                      className={`w-full mt-6 text-secondary`}
                      type="submit"
                      size="md"
                      color="primary"
                      isLoading={postMutation.isPending}
                    >
                      Set Password
                    </Button>
                  </div>
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

export default CreatePassword;
