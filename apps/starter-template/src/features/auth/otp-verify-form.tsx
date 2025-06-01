import React from "react";
import { Formik, Form } from "formik";
import { toast } from "sonner";
import { otpVerifySchema, OtpVerifyType } from "@/validations/auth.schema";
import FormikCodeInput from "@yegna-systems/lib/forms/otp";
import { Button } from "@yegna-systems/ui/button";
import useDynamicMutation from "@/lib/api/use-post-data";
type Props<T> = {
  onSuccess: (v: T) => void;
  body: {
    [key: string]: string | number;
  };
};
const OtpVerifyForm = <T,>({ onSuccess, body }: Props<T>) => {
  const postMutation = useDynamicMutation({});
  const initialValues: OtpVerifyType = {
    code: "",
  };

  const verifyOTPMutationSubmitHandler = async (values: OtpVerifyType) => {
    try {
      await postMutation.mutateAsync({
        url: "users/verify-password",
        method: "POST",
        body: {
          ...body,
          otpCode: values.code.toString(),
        },
        onSuccess: (res) => {
          onSuccess(res);
          toast.success("OTP has been sent to your phone!");
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="mx-auto w-full max-w-xl flex-grow p-3 py-3 lg:p-5 lg:py-8">
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
              />
            </div>
            <Button
              className="w-[70%]"
              type="submit"
              size="md"
              color="primary"
              isLoading={postMutation.isPending}
            >
              Verify OTP
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default OtpVerifyForm;
