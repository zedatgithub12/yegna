import React from "react";
import OtpVerifyForm, { OtpVerifyFormRef } from "./_components/otp-verify-form";
import useCustomerStore from "@/store/customer.store";
import useDynamicMutation from "@/lib/api/usePostData";
import SearchCustomer from "./search-customer";
import ModalHeader from "@/components/modal-header";
import PasswordIcon from "@/components/icons/password";
import {
  accountNumberSchema,
  AccountNumberType,
} from "@/validations/customer-action.schema";
import { Form, Formik } from "formik";
import FormikInput from "@coop-super-app/lib/forms/input";
import { Button } from "@coop-super-app/ui/button";
import ModalButtons from "@/components/modal-buttons";
import { toast } from "sonner";

type Props = {
  customerCode?: string;
};
const headerTitles = {
  1: {
    title: "Link Account",
    desc: "Select from the user's listed accounts or create and link it.",
    btnText: "Send Link OTP",
  },
  2: {
    title: "Verify OTP",
    desc: "A verification code has been sent to the users phone number. Enter it to proceed.",
    btnText: "Verify OTP",
  },
};
const LinkAccount = ({ customerCode }: Props) => {
  const postMutation = useDynamicMutation();
  const { customerInfo, tempAccountInfo } = useCustomerStore((state) => state);
  const [currentStep, setCurrentStep] = React.useState<number>(1);
  const otpFormRef = React.useRef<OtpVerifyFormRef | null>(null);
  const initialValues: AccountNumberType = {
    accountNumber: "",
  };

  const accountLookUpRequestHandler = async (val: AccountNumberType) => {
    try {
      await postMutation.mutateAsync({
        url: `ldap/accountLookup`,
        method: "POST",
        body: {
          account_number: val.accountNumber,
        },
        onSuccess: () => {
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const sendOtpSubmitHandler = async () => {
    try {
      await postMutation.mutateAsync({
        url: `ldap/sendLinkOTP`,
        method: "POST",
        body: {
          //   userCode: customerId ?? userInfo?.userCode,
          //   accountNumber: accountValue,
        },
        onSuccess: () => {
          setCurrentStep((p) => p + 1);
          toast.success("OTP sent to the customer successfully!");
          otpFormRef.current?.resetTime();
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
              <div>
                <Formik
                  initialValues={initialValues}
                  validationSchema={accountNumberSchema}
                  onSubmit={accountLookUpRequestHandler}
                >
                  {() => (
                    <Form className="flex flex-col items-start space-y-4 w-full">
                      <FormikInput
                        name="accountNumber"
                        label="Account Number"
                        placeholder="Enter Account number"
                        inputClassName="!mr-0 !pr-0 "
                        className="w-full"
                        type="number"
                        pattern="number"
                        suffix={
                          <div className="flex items-end justify-end self-end">
                            <Button
                              className="!m-0 hover:bg-primary disabled:hover:bg-transparent"
                              type="submit"
                              size="md"
                              color="primary"
                              isLoading={postMutation.isPending}
                            >
                              Search
                            </Button>
                          </div>
                        }
                      />
                      <ModalButtons
                        loading={postMutation.isPending}
                        submitButtonType="button"
                        submitButtonText={
                          headerTitles[currentStep as keyof typeof headerTitles]
                            .btnText
                        }
                        disableSubmitBtn={!tempAccountInfo}
                        onSubmit={() => {
                          sendOtpSubmitHandler();
                        }}
                      />
                    </Form>
                  )}
                </Formik>
              </div>
            ) : (
              <OtpVerifyForm
                body={{}}
                url=""
                onSuccess={() => {}}
                sendingOtp={postMutation.isPending}
                onResendOtp={() => sendOtpSubmitHandler()}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LinkAccount;
