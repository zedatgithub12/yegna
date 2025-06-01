"use client";

import React from "react";
import { IoMdClose } from "react-icons/io";
import useDynamicMutation from "@/lib/api/use-post-data";
import { toast } from "sonner";
import { Title } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";

const DeleteRecord = ({
  url,
  title,
  description,
  onRefresh,
  closeModal,
}: {
  url: string;
  title: string;
  description: string;
  onRefresh: () => void;
  closeModal: () => void;
}) => {
  const postMutation = useDynamicMutation({});

  const handleDeleting = async () => {
    try {
      await postMutation.mutateAsync({
        url: url,
        method: "DELETE",
        onSuccess: (res) => {
          if (res.success) {
            closeModal();
            onRefresh();
          } else {
            toast.error(res.message);
          }
        },
      });

      //eslint-disable-next-line
    } catch (err: any) {
      toast.error(err?.message);
    }
  };

  return (
    <div className="min-h-32 h-full flex flex-col items-start space-y-5  rounded-2xl overflow-hidden mb-2">
      <div className="w-full flex  items-center justify-between bg-gray-100 p-2">
        <Title className="text-[16px] font-bold text-left ">
          {title ? title : "Delete"}
        </Title>

        <div
          className="w-4 h-4 rounded-full mr-2 cursor-pointer"
          onClick={closeModal}
        >
          <IoMdClose size={20} />
        </div>
      </div>

      <div className="px-4 pb-3 pr-1 w-full">
        <p className="text-gray-400 text-left text-sm font-normal ">
          {description
            ? description
            : "Are you sure you want to delete the record, This action cannot be undone."}
        </p>

        <div className="col-span-2 flex items-center justify-between mt-12 w-full gap-4 pr-3">
          <Button
            type="button"
            variant="outline"
            className="px-4 py-1 rounded-md w-full border-primary text-primary"
            onClick={() => closeModal()}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="solid"
            color="danger"
            className="px-4 py-1  rounded-md w-full"
            onClick={() => handleDeleting()}
            isLoading={postMutation.isPending}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteRecord;
