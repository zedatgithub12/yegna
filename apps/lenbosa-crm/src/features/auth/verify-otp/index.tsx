"use client";
import useDynamicMutation from "@/lib/api/use-post-data";
import React, { useEffect, useState } from "react";
import AuthWrapper from "../auth-wrapper";
import Logo from "@/components/logo";
import { OtpVerifyType, otpVerifySchema } from "@/validations/auth.schema";
import { Button } from "@yegna-systems/ui/button";
import { Form, Formik } from "formik";
import { Text, Title } from "@yegna-systems/ui/typography";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { queryKeys } from "@/lib/api/query-keys";
import Config from "@/config";
import FormikCodeInput from "@yegna-systems/lib/forms/otp";

const VerifyOTP = () => {
  const router = useRouter();
  const postMutation = useDynamicMutation({});
  const { email } = useParams();
  const decodedEmail = decodeURIComponent(email as string);
  const [otpSent, setOtpSent] = useState(true);
  const [countDown, setCountDown] = useState(90);

  const initialValues: OtpVerifyType = {
    code: "",
  };

  const handleStoringToken = async (token: string) => {
    sessionStorage.setItem("token", token);
  };
  const verifyOTPMutationSubmitHandler = async (values: OtpVerifyType) => {
    try {
      await postMutation.mutateAsync({
        url: queryKeys.verify_otp,
        method: "POST",
        body: {
          otp: values.code.toString(),
          email: decodedEmail,
        },
        onSuccess: async (res) => {
          toast.success("OTP is verified Successfully");
          await handleStoringToken(res?.data?.access_token);
          router.push("/auth/create-password");
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (otpSent) {
      const timer = setInterval(() => {
        setCountDown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setOtpSent(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [otpSent]);

  return (
    <div>
      <AuthWrapper>
        <div className=" relative max-w-xl  w-full h-full flex-col  justify-between ">
          <div className="flex flex-col items-center justify-center p-6 h-5/6 ">
            <Logo />

            <Title as="h4" className=" text-center max-w-xl mx-auto mt-2">
              Enter Confirmation Code
            </Title>

            <Text className="mt-1 text-gray-500 font-normal mb-4 text-center">
              Enter a confirmation code sent to the email address
            </Text>

            <Formik
              initialValues={initialValues}
              validationSchema={otpVerifySchema}
              onSubmit={verifyOTPMutationSubmitHandler}
            >
              {({ setFieldValue }) => (
                <Form className="flex w-full flex-col items-center space-y-3 pb-4">
                  <div className="mt-1">
                    <FormikCodeInput
                      setValue={(value) => setFieldValue("code", Number(value))}
                      name="code"
                      length={6}
                      placeholder="-"
                      inputClassName="bg-[#F9F7F2] p-1"
                      className="p-2.5"
                      size="lg"
                    />
                  </div>

                  <div className="flex items-center pb-2.5">
                    <Text className="text-sm font-regular text-[#474747]">
                      Resend Code in
                    </Text>
                    <Text className="px-2 py-0.5 text-sm bg-secondary rounded-[4px] ml-1 font-medium text-primary">
                      {countDown}s
                    </Text>
                  </div>

                  <Button
                    className={`w-[76%] mt-6 text-secondary`}
                    type="submit"
                    size="md"
                    color="primary"
                    isLoading={postMutation.isPending}
                  >
                    Verify
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

export default VerifyOTP;
