"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Modal } from "@coop-super-app/ui/modal";
import { useModal } from "../hooks/use-modal";

export default function GlobalModal() {
  const { isOpen, view, closeModal, customSize } = useModal();
  const pathname = usePathname();
  useEffect(() => {
    closeModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        closeModal();
      }}
      customSize={customSize}
      overlayClassName="bg-black bg-opacity-40 backdrop-blur-lg"
      containerClassName="bg-white"
    >
      {view}
    </Modal>
  );
}
