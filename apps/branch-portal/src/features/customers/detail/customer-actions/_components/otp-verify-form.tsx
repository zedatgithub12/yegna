import React from "react";
import { Formik, Form } from "formik";
import { toast } from "sonner";
import { otpVerifySchema, OtpVerifyType } from "@/validations/auth.schema";
import FormikCodeInput from "@coop-super-app/lib/forms/otp";
import useDynamicMutation from "@/lib/api/usePostData";
import { AxiosRequestConfig } from "axios";
import { formatTime } from "@/utils/format-date-time";
import { Text } from "@coop-super-app/ui/typography";
import IconLoader from "@/components/icon-loader";
import ModalButtons from "@/components/modal-buttons";

export type OtpVerifyFormRef = {
  resetTime: () => void;
};

type Props<T> = {
  url: string;
  method?: AxiosRequestConfig["method"];
  successMessage?: string;
  onSuccess: (v: T) => void;
  body: {
    [key: string]: string | number;
  };
  otpBodyKey?: string; //body key for otp
  resetTime?: () => void;
  onResendOtp: (val?: T) => Promise<void>;
  sendingOtp?: boolean;
};
/*
 * reusable otp verify form used on all actions with customizable options
 * @param url: string
 * @param method?: AxiosRequestConfig["method"]
 * @param onSuccess: (v: T) => void
 * @param body: {
 *    [key: string]: string | number;
 *  }
 * @param otpBodyKey?: string
 * @param resetTime?: () => void
 * @param onResendOtp?: () => Promise<void>
 * @param sendingOtp?: boolean
 * @param onResendOtp?: () => Promise<void>
 * @param onSuccess: (v: T) => void
 *
 */
const OtpVerifyForm = <T,>({
  onSuccess,
  body,
  url,
  method,
  otpBodyKey = "otpCode",
  resetTime,
  sendingOtp,
  onResendOtp,
  successMessage,
}: Props<T>) => {
  const postMutation = useDynamicMutation();
  const [time, setTime] = React.useState(120);
  const initialValues: OtpVerifyType = {
    code: "",
  };

  React.useImperativeHandle(resetTime, () => ({
    resetTime: () => setTime(120),
  }));
  React.useEffect(() => {
    if (time > 0) {
      const timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [time]);
  const verifyOTPMutationSubmitHandler = async (values: OtpVerifyType) => {
    try {
      await postMutation.mutateAsync({
        url,
        method: method ?? "POST",
        body: {
          ...body,
          [otpBodyKey]: values.code.toString(),
        },
        onSuccess: (res) => {
          onSuccess(res);
          toast.success(successMessage ?? "OTP verified successfully!");
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={otpVerifySchema}
      onSubmit={verifyOTPMutationSubmitHandler}
    >
      {({ setFieldValue }) => (
        <Form className="flex w-full flex-col items-center space-y-3 ">
          <FormikCodeInput
            setValue={(value) => setFieldValue("code", Number(value))}
            name="code"
            length={6}
            placeholder="-"
          />
          <div className="mt-1">
            {time > 0 ? (
              <Text as="p" className="text-black text-center">
                {formatTime(time)}
                <span className="text-sm"> {time < 60 ? "Sec" : "Min"}</span>
              </Text>
            ) : (
              <div className="flex items-center gap-1">
                <Text
                  onClick={() => onResendOtp()}
                  as="strong"
                  className="text-primary  cursor-pointer underline text-center"
                >
                  Resend OTP
                </Text>
                {sendingOtp && <IconLoader />}
              </div>
            )}
          </div>
          <ModalButtons
            loading={postMutation.isPending}
            submitButtonType="submit"
            submitButtonText={"Verify OTP"}
          />
        </Form>
      )}
    </Formik>
  );
};

export default OtpVerifyForm;
