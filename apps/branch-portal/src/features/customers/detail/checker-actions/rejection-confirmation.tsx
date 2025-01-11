import ModalButtons from "@/components/modal-buttons";
import useDynamicMutation from "@/lib/api/usePostData";
import { useModal } from "@coop-super-app/lib/hooks/use-modal";
import { Text, Title } from "@coop-super-app/ui/typography";
import React from "react";

type Props = {
  url: string;
};
const RejectRequestConfirmation = ({ url }: Props) => {
  const postMutation = useDynamicMutation();
  const { closeModal } = useModal();

  const rejectRequestSubmitHandler = async () => {
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
      <Text>rejection description</Text>
      <ModalButtons
        loading={postMutation.isPending}
        submitButtonType="button"
        submitBtnColor="danger"
        submitButtonText={"Reject"}
        onSubmit={() => {
          rejectRequestSubmitHandler();
        }}
      />
    </div>
  );
};

export default RejectRequestConfirmation;
