"use client";

import React, { useRef } from "react";

import { Title } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

const SuccessModal = ({
  title,
  description,
  closeModal,
}: {
  closeModal: () => void;
  title: string;
  description: string;
}) => {
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);

  const handleDone = () => {
    closeModal();
    router.back();
  };

  return (
    <div>
      <div
        ref={modalRef}
        className="bg-gray-50 min-h-24 h-full flex flex-col items-start rounded-2xl overflow-hidden mb-2 px-2 pt-2"
      >
        <div className=" pb-3 w-full flex flex-col items-center mt-3 px-3 ">
          <div className="bg-green-100 p-6  rounded-xl flex flex-col items-center w-full max-w-lg">
            <Image
              src="/icons/check.svg"
              alt="Success"
              width={80}
              height={100}
              className="mb-4"
            />
          </div>
          <div className="py-4 flex flex-col items-center justify-center mb-6">
            <Title as="h4" className=" font-bold text-gray-800 mb-2">
              {title}
            </Title>
            <p className="text-gray-400 text-center text-sm font-normal">
              {description}
            </p>
          </div>
          <div className="flex items-center justify-between w-full gap-4">
            <Button
              type="button"
              variant="outline"
              className="px-4 py-1 rounded-md w-full border-primary text-primary"
              onClick={handleDone}
              color="primary"
            >
              Done
            </Button>
            <Button
              type="button"
              variant="solid"
              color="primary"
              className="px-4 py-1 rounded-md w-full"
              onClick={() => {
                console.log("Share info clicked");
              }}
            >
              Share Info
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
