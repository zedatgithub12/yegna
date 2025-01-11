import { useModal } from "@coop-super-app/lib/hooks/use-modal";
import { Button } from "@coop-super-app/ui/button";
import { Text, Title } from "@coop-super-app/ui/typography";
import React from "react";

type Props = {
  title: string;
  description: string;
  rejectConfirmView: React.ReactNode;
  approveConfirmView: React.ReactNode;
  additionalInfo?: React.ReactNode;
};
const RequestActionViewCard = ({
  title,
  description,
  rejectConfirmView,
  approveConfirmView,
  additionalInfo,
}: Props) => {
  const { openModal } = useModal();
  return (
    <div className="border border-gray-100 p-3 rounded-md">
      <Title as="h6" className="capitalize">
        {title}
      </Title>
      <Text className="text-gray-500 capitalize">{description}</Text>
      {additionalInfo}
      <div className="flex items-center justify-end w-full gap-2 pt-3">
        <Button
          color="danger"
          onClick={() => openModal({ view: rejectConfirmView })}
        >
          Reject
        </Button>
        <Button onClick={() => openModal({ view: approveConfirmView })}>
          Approve
        </Button>
      </div>
    </div>
  );
};

export default RequestActionViewCard;
