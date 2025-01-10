import { useModal } from "@coop-super-app/lib/hooks/use-modal";
import { Button } from "@coop-super-app/ui/button";
import React from "react";

type Props = {
  loading: boolean;
  backText?: string;
  submitButtonText: string;
  onSubmit?: () => void;
  submitButtonType?: "submit" | "button";
};
const ModalButtons = ({
  loading,
  backText = "Cancel",
  submitButtonText,
  onSubmit,
  submitButtonType = "button",
}: Props) => {
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
        isLoading={loading}
        color="primary"
        className="w-full"
        onClick={onSubmit}
        type={submitButtonType}
      >
        {submitButtonText}
      </Button>
    </div>
  );
};

export default ModalButtons;
