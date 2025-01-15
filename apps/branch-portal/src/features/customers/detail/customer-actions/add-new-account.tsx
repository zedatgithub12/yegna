import PasswordIcon from "@/components/icons/password";
import ModalFooter from "@coop-super-app/lib/view/modal-footer";
import ModalHeader from "@coop-super-app/lib/view/modal-header";
import useDynamicMutation from "@/lib/api/use-post-data";
import useCustomerStore from "@/store/customer.store";
import {
  accountNumberSchema,
  AccountNumberType,
} from "@/validations/customer-action.schema";
import React from "react";
import SearchCustomer from "./search-customer";
import { Form, Formik } from "formik";
import FormikInput from "@coop-super-app/lib/forms/input";
import { Button } from "@coop-super-app/ui/button";
import OtpVerifyForm, { OtpVerifyFormRef } from "./_components/otp-verify-form";
import { toast } from "sonner";

type Props = {
  customerCode?: string;
};

const headerTitles = {
  1: {
    title: "Add New account",
    desc: "Search for another bank account and easily link it to your mobile banking for seamless transactions.",
    btnText: "Send OTP",
  },
  2: {
    title: "Verify OTP",
    desc: "A verification code has been sent to the users phone number. Enter it to proceed.",
    btnText: "Verify OTP",
  },
};
const AddNewAccount = ({ customerCode }: Props) => {
  const otpFormRef = React.useRef<OtpVerifyFormRef | null>(null);
  const [tempAccountInformation, setTempAccountInformation] =
    React.useState<string>("");
  const [currentStep, setCurrentStep] = React.useState<number>(1); //step one send otp step 2 verify otp
  const { customerInfo } = useCustomerStore((state) => state);
  const postMutation = useDynamicMutation({});
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
        onSuccess: (res) => {
          setTempAccountInformation(res);
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
                    <ModalFooter
                      loading={postMutation.isPending}
                      submitButtonType="button"
                      submitButtonText={
                        headerTitles[currentStep as keyof typeof headerTitles]
                          .btnText
                      }
                      disableSubmitBtn={!tempAccountInformation}
                      onSubmit={() => {
                        sendOtpSubmitHandler();
                      }}
                    />
                  </Form>
                )}
              </Formik>
            ) : (
              <OtpVerifyForm
                body={{}}
                successMessage="Add New Account Request Sent Successfully!"
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

export default AddNewAccount;
