import ModalFooter from "@coop-super-app/lib/view/modal-footer";
import useDynamicMutation from "@/lib/api/use-post-data";
import { useModal } from "@coop-super-app/lib/hooks/use-modal";
import { Text, Title } from "@coop-super-app/ui/typography";
import React from "react";

type Props = {
  url: string;
};
const ApproveRequestConfirmation = ({ url }: Props) => {
  const postMutation = useDynamicMutation({});
  const { closeModal } = useModal();

  const approveRequestSubmitHandler = async () => {
    try {
      await postMutation.mutateAsync({
        url: url,
        method: "POST",
        body: {},
        onSuccess: () => {
          closeModal();
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center space-y-5 p-5">
      <Title>are u sure</Title>
      <Text>accept description</Text>
      <ModalFooter
        loading={postMutation.isPending}
        submitButtonType="button"
        submitButtonText={"Reject"}
        onSubmit={() => {
          approveRequestSubmitHandler();
        }}
      />
    </div>
  );
};

export default ApproveRequestConfirmation;
