import useDynamicMutation from "@/lib/api/usePostData";
import useCustomerStore from "@/store/customer.store";
import { useModal } from "@coop-super-app/lib/hooks/use-modal";
import React from "react";
import SearchCustomer from "./search-customer";
import ModalHeader from "@/components/modal-header";
import PasswordIcon from "@/components/icons/password";
import ModalButtons from "@/components/modal-buttons";
import { toast } from "sonner";
import {
  phoneNumberSchema,
  PhoneNumberType,
} from "@/validations/customer-action.schema";
import { Form, Formik } from "formik";
import FormikInput from "@coop-super-app/lib/forms/input";
import OtpVerifyForm, { OtpVerifyFormRef } from "./_components/otp-verify-form";

type Props = {
  customerCode?: string;
};

const headerTitles = {
  1: {
    title: "Attach Phone Number",
    desc: "Add the customer's new phone number to attach to existing  account",
    btnText: "Send OTP",
  },
  2: {
    title: "Verify OTP",
    desc: "A verification code has been sent to the users phone number. Enter it to proceed.",
    btnText: "Verify OTP",
  },
};
const DetachPhoneNumber = ({ customerCode }: Props) => {
  const [tempPhoneNumber, setTempPhoneNumber] = React.useState<string>(""); //used when resending otp
  const otpFormRef = React.useRef<OtpVerifyFormRef | null>(null);
  const { closeModal } = useModal();
  const [currentStep, setCurrentStep] = React.useState<number>(1); //step one send otp step 2 verify otp
  const { customerInfo } = useCustomerStore((state) => state);
  const postMutation = useDynamicMutation();

  const phoneNumberValues: PhoneNumberType = {
    phone: "",
  };
  const sendAttachPhoneOtpRequestHandler = async (val: PhoneNumberType) => {
    try {
      await postMutation.mutateAsync({
        url: `ldap/sendUnLinkOTPDevice`,
        method: "POST",
        body: {
          userCode: customerCode ?? customerInfo?.userCode,
        },
        onSuccess: () => {
          setTempPhoneNumber(val.phone);
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
                validationSchema={phoneNumberSchema}
                onSubmit={sendAttachPhoneOtpRequestHandler}
              >
                {() => (
                  <Form className="flex flex-col items-start space-y-4 w-full">
                    <FormikInput
                      prefix="+251"
                      name="phone"
                      label="Phone Number"
                      placeholder="Enter phone number"
                      className="w-full"
                      type="number"
                      pattern="number"
                      maxLength={9}
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
                  sendAttachPhoneOtpRequestHandler({
                    phone: tempPhoneNumber,
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

export default DetachPhoneNumber;
