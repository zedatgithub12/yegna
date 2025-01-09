import useDynamicMutation from "@/lib/api/usePostData";
import useCustomerStore from "@/store/customer.store";
import { useModal } from "@coop-super-app/lib/hooks/use-modal";
import React from "react";
import { toast } from "sonner";
import SearchCustomer from "./search-customer";
import ModalHeader from "@/components/modal-header";
import PasswordIcon from "@/components/icons/password";
import ModalButtons from "@/components/modal-buttons";

type Props = {
  customerCode?: string;
};
const UnlinkDevice = ({ customerCode }: Props) => {
  const { closeModal } = useModal();
  const { customerInfo } = useCustomerStore((state) => state);
  const postMutation = useDynamicMutation();

  const unlinkDeviceRequestHandler = async () => {
    try {
      await postMutation.mutateAsync({
        url: `ldap/sendUnLinkOTPDevice`,
        method: "POST",
        body: {
          userCode: customerCode ?? customerInfo?.userCode,
        },
        onSuccess: () => {
          closeModal();
          toast.success("Device Unlink Request Sent Successfully");
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      {!customerCode && !customerInfo?.userCode ? (
        <SearchCustomer description="Search for a customer to unlink device" />
      ) : (
        <div className="flex flex-col items-center justify-center space-y-5 p-5">
          <ModalHeader
            icon={<PasswordIcon />}
            title="Unlink Device"
            desc="Unlinking will disconnect the device from the linked account.
            Are you sure you want to proceed?"
          />
          <ModalButtons
            loading={postMutation.isPending}
            onSubmit={unlinkDeviceRequestHandler}
            approveText="Unlink"
          />
        </div>
      )}
    </div>
  );
};

export default UnlinkDevice;
