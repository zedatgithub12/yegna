"use client";

import PageWrapper from "@/components/PagesWrapper";
import React from "react";
import UserDetailPanel from "./components/UserDetails";
import ActivityLogs from "./components/ActivityLogs";
import { Button } from "@yegna-systems/ui/button";
import { useRouter } from "nextjs-toploader/app";
import { routes } from "@/lib/config/routes";
import { useParams } from "next/navigation";
import { queryKeys } from "@/lib/api/query-keys";
import { useFetchData } from "@/lib/api/use-fetch-data";
import { formatDate } from "@/utils/lib/format-date-time";
import { EthiopianPhoneNumber } from "@/utils/lib/ethiopian-phone";
import EditPencil from "@/components/icons/edit-pencil";

const activities: Logs[] = [
  {
    id: 1,
    action: "Create New Lead",
    target: "Ovid Clients",
    date: "July 14, 2024",
    time: "7:34 AM",
  },
  {
    id: 2,
    action: "Create New Lead",
    target: "Ovid Clients",
    date: "July 14, 2024",
    time: "7:34 AM",
  },
  {
    id: 3,
    action: "Create New Lead",
    target: "Ovid Clients",
    date: "July 14, 2024",
    time: "7:34 AM",
  },
  {
    id: 4,
    action: "Create New Lead",
    target: "Ovid Clients",
    date: "July 14, 2024",
    time: "7:34 AM",
  },
  {
    id: 5,
    action: "Create New Lead",
    target: "Ovid Clients",
    date: "July 14, 2024",
    time: "7:34 AM",
  },
];

const Details = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const userDataResponse = useFetchData(
    [queryKeys.get_users, id],
    `${queryKeys.get_users}/${id}`
  );

  const userData: UserDataProps = userDataResponse?.data?.data;

  return (
    <PageWrapper
      title="Customer Details"
      back={true}
      search={false}
      isLoading={userDataResponse.isFetching}
      isError={userDataResponse.isError}
      notfound={!userData}
      fallback={{
        status_code: "404",
        title: "Customer data not found",
        message: "",
      }}
      breadcrumb={true}
      hasActionButton
      actionButtons={
        <Button
          variant="solid"
          color="primary"
          className="hover:bg-primary-dark text-secondary font-medium cursor-pointer gap-1 rounded-lg "
          onClick={() => {
            if (typeof id === "string") {
              router.push(routes.user.edit(id));
            }
          }}
        >
          <EditPencil className="w-5 h-5 text-secondary pr-1" color="#D7F400" />
          Edit Info.
        </Button>
      }
      childrenClassnames="bg-white rounded-xl p-4 mt-4"
    >
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-12 md:col-span-6">
          <UserDetailPanel
            profilePhoto={userData?.profile_photo_url}
            name={userData?.name}
            userName={userData?.username}
            role={userData?.roles}
            registeredAt={formatDate(new Date(userData?.created_at))}
            email={userData?.email}
            phoneNumber={EthiopianPhoneNumber(userData?.phone) || ""}
            admin={{
              name: "Philemon Mehari",
              email: "philimom@gmail.com",
              id: "SOSxM01011234",
              photoUrl: "/images/admin.jpg",
            }}
            document={{
              fileName: "National ID.JPG",
              fileSize: "3.6 KB",
              uploadedAt: "12/03/2025",
            }}
          />
        </div>

        <div className="col-span-12 md:col-span-6">
          <ActivityLogs activities={activities} />
        </div>
      </div>
    </PageWrapper>
  );
};

export default Details;
