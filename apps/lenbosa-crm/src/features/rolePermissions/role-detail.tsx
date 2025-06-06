import React, { useState } from "react";
import UsersCard from "@/components/Card/UsersCard";
import Pagination from "@/components/DataTable/pagination";
import EditPencil from "@/components/icons/edit-pencil";
import RoleFolder from "@/components/icons/role-folder";
import Loader from "@/components/Loader";
import { queryKeys } from "@/lib/api/query-keys";
import { useFetchData } from "@/lib/api/use-fetch-data";
import { routes } from "@/lib/config/routes";
import { formatDate } from "@/utils/lib/format-date-time";
import { useModal } from "@yegna-systems/lib/hooks/use-modal";
import { Button } from "@yegna-systems/ui/button";
import { Text, Title } from "@yegna-systems/ui/typography";
import { ChevronLeft, User } from "lucide-react";
import { useRouter } from "next/navigation";

const RoleDetail = ({
  id,
  roleName,
  created_at,
  user_count,
  description,
}: {
  id: string;
  roleName: string;
  created_at: string;
  user_count: number;
  description: string;
}) => {
  const { closeModal } = useModal();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const responsePayload = useFetchData(
    [queryKeys.get_roles, id, currentPage],
    `${queryKeys.get_roles}/${id}?page=${currentPage}`
  );

  const roleUsers: roleUser[] = responsePayload?.data?.data?.users?.data;

  return (
    <div className="relative h-[98dvh] ">
      <div className="sticky right-0 left-0 py-3 pb-0  bg-white rounded-sm">
        <div className="flex items-center justify-between border-b px-2 pb-2.5">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => closeModal()}
          >
            <ChevronLeft size={22} />
            <Text className="flex items-center font-semibold text-[14px]">
              Back
            </Text>
          </div>

          <Button
            variant="outline"
            color="primary"
            className="py-4 px-2 border-primary text-primary flex items-center gap-2"
            size="sm"
            onClick={() => router.push(routes.role_permission.edit(id))}
          >
            <EditPencil width={18} height={18} />
            <Text className="text-primary font-medium text-sm">Edit Role</Text>
          </Button>
        </div>

        <div className="w-full flex items-center p-4 gap-4 px-6">
          <div className="bg-primary rounded-lg  w-16 h-16 flex items-center justify-center">
            <RoleFolder width={40} height={40} />
          </div>

          <div className="w-10/12 flex items-start justify-between">
            <div>
              <Text className="text-lg font-medium">{roleName} -Role </Text>
              <Text className="text-xs font-normal text-gray-500 mt-1.5">
                Created at:{" "}
                {created_at ? formatDate(new Date(created_at)) : "_ "}
              </Text>
            </div>

            <div className="border bg-gray-50 rounded-md p-1.5 px-2 w-26 flex items-center gap-2">
              <User size={16} className="text-black" />
              <Text className="text-black">
                {user_count} User{user_count > 1 ? "s" : ""}
              </Text>{" "}
            </div>
          </div>
        </div>

        <div className="px-6">
          <Title as="h5">Description</Title>

          <Text className="text-sm text-gray-400 mt-2.5">
            {description ? description : "No description"}
          </Text>
        </div>

        <div className="px-6 py-4">
          <div>
            <Title as="h5">
              Assigned Users
              <span className="text-sm font-normal text-gray-600">
                {" "}
                ({user_count} Users)
              </span>{" "}
            </Title>
          </div>

          {responsePayload.isFetching ? (
            <Loader size={12} />
          ) : roleUsers.length > 0 ? (
            <div className="flex flex-col justify-between h-[51dvh]">
              <div>
                {roleUsers.map((user) => (
                  <UsersCard
                    key={user.id}
                    showIcon={false}
                    avatar={user.profile_photo_url}
                    name={user.name}
                    email={user.email}
                    onPress={() => {}}
                    onRemove={() => {}}
                  />
                ))}
              </div>

              {responsePayload?.data?.data?.users?.total > pageSize && (
                <Pagination
                  total={responsePayload?.data?.data?.users?.total}
                  pageSize={pageSize}
                  current={currentPage}
                  onChange={(page: number) => setCurrentPage(page)}
                  showLessItems={true}
                  prevIconClassName="py-0 text-gray-500 !leading-[26px]"
                  nextIconClassName="py-0 text-gray-500 !leading-[26px]"
                  color="primary"
                  className="rounded-2xl justify-end"
                />
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default RoleDetail;
