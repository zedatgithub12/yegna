import FolderCard from "@/components/FolderCard";
import PageWrapper from "@/components/PagesWrapper";
import { queryKeys } from "@/lib/api/query-keys";
import { useFetchData } from "@/lib/api/use-fetch-data";
import { useModal } from "@yegna-systems/lib/hooks/use-modal";
import { Title } from "@yegna-systems/ui/typography";
import React, { useState } from "react";
import GroupDetail from "./GroupDetail";
import Image from "next/image";
import { Button } from "@yegna-systems/ui/button";
import SvgWrapper from "@/components/SvgWrapper";
import CreateRecipientGroup from "./CreateRecipientGroup";

const RecipientGroup = () => {
  const { openModal, closeModal } = useModal();
  const [selectedGroup, setSelectedGroup] = useState<groupProp | null>(null);

  const recipientGroupPayload = useFetchData(
    [queryKeys.get_groups],
    `${queryKeys.get_groups}`
  );

  const recipientGroupData: groupProp[] =
    recipientGroupPayload?.data?.data?.data || [];

  const handleCreateMessage = () => {
    openModal({
      view: (
        <CreateRecipientGroup
          onClose={closeModal}
          onSubmit={() => {
            recipientGroupPayload.refetch();
          }}
        />
      ),
      position: "right",
      rounded: "md",
      customSize: "400px",
    });
  };

  return (
    <PageWrapper
      hasHeader={false}
      isLoading={recipientGroupPayload.isFetching}
      title="Recipient Group"
      back={false}
      search={false}
      isError={recipientGroupPayload.isError}
      breadcrumb={true}
      notfound={false}
      fallback={{
        status_code: "500",
        title: "Server Error getting templates",
        message: "Opps! There's Error getting templates",
      }}
      staticComponent={
        !selectedGroup && (
          <>
            <div className="bg-white p-4 rounded-xl flex items-center justify-between w-full mb-4">
              <Title className="text-lg font-semibold">Recipient Group</Title>
              <Button
                variant="solid"
                color="primary"
                className="hover:bg-primary-dark text-secondary font-medium cursor-pointer gap-1 rounded-lg py-5"
                onClick={handleCreateMessage}
              >
                <SvgWrapper
                  src="/icons/add-01.svg"
                  width="22px"
                  height="22px"
                  color="#bbf451"
                />
                Add Recipient Group
              </Button>
            </div>
          </>
        )
      }
    >
      {selectedGroup ? (
        <div>
          <GroupDetail
            group={selectedGroup}
            id={selectedGroup.id}
            goBack={() => setSelectedGroup(null)}
          />
        </div>
      ) : recipientGroupData.length > 0 ? (
        <div className="flex flex-wrap gap-10 mt-14">
          {recipientGroupData.map((group, index) => (
            <div key={group.id} onClick={() => setSelectedGroup(group)}>
              <FolderCard
                title={
                  group?.name.length > 12
                    ? `${group.name.substring(0, 12)}...`
                    : group.name
                }
                users={group?.count}
                labelColor={index % 2 ? "orange" : "indigo"}
                avatars={group.three__user_profiles}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 flex flex-col items-center justify-center w-full">
          <div className="w-56 h-56 relative mb-4">
            <Image
              src="/images/no-message.gif"
              alt="Mailbox"
              fill
              className="object-contain"
            />
          </div>
          <p className="text-center text-lg font-semibold text-primary">
            Opps! There&apos;s No Message Yet
          </p>
        </div>
      )}
    </PageWrapper>
  );
};

export default RecipientGroup;
