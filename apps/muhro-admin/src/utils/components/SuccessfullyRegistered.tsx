"use client";

import React, { useEffect, useRef } from "react";

import { Title } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import { Avatar } from "@yegna-systems/ui/avatar";
import Image from "next/image";

const SuccessfullyRegistered = ({
  closeModal,
  institutionName,
  institutionId,
  institutionImage,
  institutionEmail,
  institutionPhone,
}: {
  closeModal: () => void;
  institutionName: string;
  institutionId?: string;
  institutionImage?: string;
  institutionEmail?: string;
  institutionPhone?: string;
}) => {
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);

  const handleDone = React.useCallback(() => {
    closeModal();
    router.back();
  }, [closeModal, router]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        handleDone();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleDone]);

  return (
    <div>
      <div
        ref={modalRef}
        className="  bg-gray-50 min-h-32 h-full flex flex-col items-start space-y-5  overflow-hidden mb-2"
      >
        <div className=" pb-3 w-full flex flex-col items-center mt-5 p-3 ">
          <div className="bg-green-100 p-6  rounded-2xl flex flex-col items-center w-full max-w-lg">
            <Image
              src="/icons/check.svg"
              alt="Success"
              width={100}
              height={125}
              className="mb-4"
            />
            <Title className="text-2xl font-bold text-gray-800 mb-2">
              Successfully Registered
            </Title>
            <p className="text-gray-600 text-center text-sm font-normal">
              You have successfully registered your institution. Please make
              sure to copy and share the info below.
            </p>
          </div>

          <div className="institution-detail  p-4 rounded-lg w-full mb-6 mt-6 bg-white shadow-sm">
            <h3 className="font-semibold text-sm mb-2 text-primary">
              Institution Detail
            </h3>
            <hr className="border-gray-200 mb-4" />
            <div className="flex items-center justify-between px-3 bg-[#F9F7F2] rounded-lg p-2 mt-4">
              <div className="flex items-center gap-3 mt-2 rounded-lg">
                <Avatar
                  src={institutionImage}
                  name={institutionName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="">
                  <p className="font-semibold text-[15px]">{institutionName}</p>
                  <p className="text-sm text-gray-500 font-normal">
                    {institutionEmail || "No email provided"}
                  </p>
                  {institutionPhone && (
                    <p className="text-sm text-gray-500 font-normal">
                      {institutionPhone}
                    </p>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400 font-normal">Admin ID</p>
                <p className="font-semibold text-[15px] mt-0.5">
                  {institutionId}
                </p>
              </div>
            </div>
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

export default SuccessfullyRegistered;
