import useDynamicMutation from "@/lib/api/use-post-data";
import useCustomerStore from "@/store/customer.store";
import { useModal } from "@coop-super-app/lib/hooks/use-modal";
import React from "react";
import { toast } from "sonner";
import SearchCustomer from "./search-customer";
import PasswordIcon from "@/components/icons/password";
import ModalFooter from "@coop-super-app/lib/view/modal-footer";
import ModalHeader from "@coop-super-app/lib/view/modal-header";

type Props = {
  customerCode?: string;
};
const DisableUser = ({ customerCode }: Props) => {
  const { closeModal } = useModal();
  const { customerInfo } = useCustomerStore((state) => state);
  const postMutation = useDynamicMutation({});

  const disableCustomerRequestHandler = async () => {
    try {
      await postMutation.mutateAsync({
        url: `ldap/sendUnLinkOTPDevice`,
        method: "POST",
        body: {
          userCode: customerCode ?? customerInfo?.userCode,
        },
        onSuccess: () => {
          closeModal();
          toast.success("Disable customer Request Sent Successfully");
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      {!customerCode && !customerInfo?.userCode ? (
        <SearchCustomer description="Search for a customer to disable them from accessing the super app" />
      ) : (
        <div className="flex flex-col items-center justify-center space-y-5 p-5">
          <ModalHeader
            icon={<PasswordIcon />}
            title="Disable User"
            desc="Disable user to prevent them from accessing the super app"
          />
          <ModalFooter
            loading={postMutation.isPending}
            onSubmit={disableCustomerRequestHandler}
            submitButtonText="Unlink"
          />
        </div>
      )}
    </div>
  );
};

export default DisableUser;
