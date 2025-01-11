import useDynamicMutation from "@/lib/api/usePostData";
import useCustomerStore from "@/store/customer.store";
import { useModal } from "@coop-super-app/lib/hooks/use-modal";
import React from "react";
import SearchCustomer from "./search-customer";
import ModalHeader from "@/components/modal-header";
import PasswordIcon from "@/components/icons/password";
import ModalButtons from "@/components/modal-buttons";
import { toast } from "sonner";
import { reasonSchema, ReasonType } from "@/validations/customer-action.schema";
import { Form, Formik } from "formik";
import FormikTextArea from "@coop-super-app/lib/forms/text-area";
import OtpVerifyForm, { OtpVerifyFormRef } from "./_components/otp-verify-form";

type Props = {
  customerCode?: string;
};

const headerTitles = {
  1: {
    title: "Enable User",
    desc: " Enable user to allow them to access the super app",
    btnText: "Send OTP",
  },
  2: {
    title: "Verify OTP",
    desc: "A verification code has been sent to the users phone number. Enter it to proceed.",
    btnText: "Verify OTP",
  },
};
const EnableUser = ({ customerCode }: Props) => {
  const [tempReason, setTempReason] = React.useState<string>(""); //used when resending otp
  const otpFormRef = React.useRef<OtpVerifyFormRef | null>(null);
  const { closeModal } = useModal();
  const [currentStep, setCurrentStep] = React.useState<number>(1); //step one send otp step 2 verify otp
  const { customerInfo } = useCustomerStore((state) => state);
  const postMutation = useDynamicMutation();

  const phoneNumberValues: ReasonType = {
    reason: "",
  };
  const sendEnableOtpRequestHandler = async (val: ReasonType) => {
    try {
      await postMutation.mutateAsync({
        url: `ldap/sendUnLinkOTPDevice`,
        method: "POST",
        body: {
          userCode: customerCode ?? customerInfo?.userCode,
        },
        onSuccess: () => {
          setTempReason(val.reason);
          setCurrentStep((p) => p + 1);
          closeModal();
          otpFormRef.current?.resetTime();
          toast.success("OTP sent to the customer successfully!");
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {!customerCode && customerInfo?.userCode ? (
        <SearchCustomer description="Search for a customer to change their phone number" />
      ) : (
        <div className="flex flex-col items-center justify-center space-y-5 p-5">
          <ModalHeader
            icon={<PasswordIcon />}
            title={headerTitles[currentStep as keyof typeof headerTitles].title}
            desc={headerTitles[currentStep as keyof typeof headerTitles].desc}
          />
          <div className="w-full">
            {currentStep === 1 ? (
              <Formik
                initialValues={phoneNumberValues}
                validationSchema={reasonSchema}
                onSubmit={sendEnableOtpRequestHandler}
              >
                {() => (
                  <Form className="flex flex-col items-start space-y-4 w-full">
                    <FormikTextArea
                      name="reason"
                      label="Reason"
                      placeholder="Enter Your Reason"
                      className="w-full"
                    />
                    <ModalButtons
                      loading={postMutation.isPending}
                      submitButtonType="submit"
                      submitButtonText={
                        headerTitles[currentStep as keyof typeof headerTitles]
                          .btnText
                      }
                    />
                  </Form>
                )}
              </Formik>
            ) : (
              <OtpVerifyForm
                body={{}}
                url=""
                onSuccess={() => {}}
                sendingOtp={postMutation.isPending}
                onResendOtp={() =>
                  sendEnableOtpRequestHandler({
                    reason: tempReason,
                  })
                }
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EnableUser;
