import { useModal } from "@yegna-systems/lib/hooks/use-modal";
import { Button } from "@yegna-systems/ui/button";
import React from "react";

type Props = {
  loading: boolean;
  backText?: string;
  submitButtonText: string;
  onSubmit?: () => void;
  submitButtonType?: "submit" | "button";
  disableSubmitBtn?: boolean;
  submitBtnColor?: "primary" | "secondary" | "danger" | undefined;
};
export default function ModalFooter({
  loading,
  backText = "Cancel",
  submitButtonText,
  onSubmit,
  submitButtonType = "button",
  disableSubmitBtn = false,
  submitBtnColor = "primary",
}: Props) {
  const { closeModal } = useModal();
  return (
    <div className="flex flex-row md:flex-row items-center gap-3  w-full">
      <Button
        color="primary"
        className="w-full"
        variant="outline"
        onClick={closeModal}
      >
        {backText}
      </Button>
      <Button
        isLoading={loading && !disableSubmitBtn}
        color={submitBtnColor}
        className="w-full"
        onClick={onSubmit}
        type={submitButtonType}
        disabled={disableSubmitBtn}
      >
        {submitButtonText}
      </Button>
    </div>
  );
}
