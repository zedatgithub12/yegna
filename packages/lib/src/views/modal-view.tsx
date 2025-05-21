"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Modal } from "@yegna-systems/ui/modal";
import { useModal } from "../hooks/use-modal";
import cn from "@yegna-systems/ui/cn";

export default function GlobalModal() {
  const {
    isOpen,
    view,
    closeModal,
    customSize,
    containerClassName,
    position,
    rounded,
  } = useModal();
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
      rounded={rounded}
      customSize={customSize}
      position={position}
      overlayClassName="bg-black bg-opacity-40 backdrop-blur-sm"
      containerClassName={cn("bg-white overflow-hidden rounded-xl", containerClassName)}
      noGutter
      size="full"
    >
      {view}
    </Modal>
  );
}
