"use client";

import { routes } from "@/lib/config/routes";
import { Button } from "@yegna-systems/ui/button";
import React, { useState } from "react";
import { useRouter } from "nextjs-toploader/app";
import { queryKeys } from "@/lib/api/query-keys";
import { useFetchData } from "@/lib/api/use-fetch-data";
import { FileInput, ListFilter } from "lucide-react";
import { useModal } from "@yegna-systems/lib/hooks/use-modal";
import { GetColumns } from "./column";
import { useQueryClient } from "@tanstack/react-query";
import { exportToExcel } from "@/utils/lib/export-data";
import SvgWrapper from "@/components/SvgWrapper";
import PageWrapper from "@/components/PagesWrapper";
import TableSearch from "@yegna-systems/lib/table/table-search";
import ControlledTable from "@/components/DataTable/table";
import Roles from "../rolePermissions/roles";
import DeleteRecord from "@/utils/components/DeleteRecord";
import UserFilter from "./components/UserFilter";
import { useDrawer } from "@yegna-systems/lib/hooks/use-drawer";
import useUserFilterStore from "@/store/user.store";

const Users = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { openModal, closeModal } = useModal();
  const { openDrawer } = useDrawer();

  const { role, gender, status } = useUserFilterStore((state) => state);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  const responsePayload = useFetchData(
    [queryKeys.get_roles],
    `${queryKeys.get_roles}`
  );

  const rolesData: rolesProps[] = responsePayload?.data?.data;

  //get the user data
  const usersPayload = useFetchData(
    [
      queryKeys.get_users,
      currentPage,
      pageSize,
      searchTerm,
      role,
      gender,
      status,
    ],
    `${queryKeys.get_users}?page=${currentPage}&limit=${pageSize}&search=${searchTerm}&role=${role}&gender=${gender}&status=${status}`
  );
  const usersData: UserDataProps[] = usersPayload?.data?.data?.data;

  const handleSelectRow = (id: string) => {
    setSelectedRowKeys((prev) =>
      prev.includes(id) ? prev.filter((key) => key !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (usersData.length === selectedRowKeys.length) {
      setSelectedRowKeys([]);
    } else if (selectedRowKeys.length < usersData.length) {
      setSelectedRowKeys(usersData.map((user) => user.id));
    } else if (selectedRowKeys.length === 0) {
      setSelectedRowKeys(usersData.map((user) => user.id));
    }
  };

  const handleExportingExcel = () => {
    const selectedUsers =
      selectedRowKeys.length > 0
        ? usersData.filter((user) => selectedRowKeys.includes(user.id))
        : usersData;

    const _data = selectedUsers.map((user) => ({
      name: user.name,
      username: user.username,
      email: user?.email,
      phone: user?.phone,
      roles: user.roles,
      gender: user?.gender,
      status: user.status,
    }));

    exportToExcel(
      _data,
      "Name, UserName, Email, Phone, Roles, Gender, Status",
      "Users Data"
    );
  };

  return (
    <div>
      <PageWrapper
        isLoading={usersPayload.isFetching}
        title="User Management"
        back={false}
        search={true}
        isError={usersPayload.isError}
        breadcrumb={true}
        hasActionButton
        actionButtons={
          <Button
            variant="solid"
            color="primary"
            className="hover:bg-primary-dark text-secondary font-medium cursor-pointer gap-1 rounded-lg py-5"
            onClick={() => router.push(routes.user.create)}
          >
            <SvgWrapper
              src="/icons/add-01.svg"
              width="22px"
              height="22px"
              color="#bbf451"
            />
            Add New User
          </Button>
        }
        staticComponent={
          <>
            {rolesData && (
              <Roles
                rolesData={rolesData}
                className="w-full flex justify-start gap-6 pt-10 pb-2 overflow-x-scroll scrollbar-hide mb-3"
              />
            )}

            <TableSearch
              title="All Users"
              setDebouncedValue={(val) => {
                setCurrentPage(1);
                setSearchTerm(val);
              }}
              placeholder="Search..."
              className="w-full bg-gray-100 rounded-xl "
            >
              <Button
                className="flex items-center gap-2 w-full rounded-2xl text-black bg-gray-100 hover:bg-gray-200 border border-gray-200"
                onClick={() =>
                  openDrawer({
                    view: <UserFilter roles={rolesData} />,
                    placement: "right",
                    customSize: 10,
                  })
                }
              >
                <ListFilter className="text-gray-600" size={18} />
                Filter
              </Button>

              {usersData?.length ? (
                <Button
                  color="primary"
                  className="flex items-center gap-2 w-full rounded-2xl text-secondary"
                  onClick={() => handleExportingExcel()}
                  disabled={usersData?.length === 0}
                >
                  <FileInput className="text-secondary" size={18} />
                  Export
                </Button>
              ) : null}
            </TableSearch>
          </>
        }
      >
        <div className="table-wrapper flex-grow">
          <ControlledTable
            variant="modern"
            data={usersData}
            isLoading={usersPayload.isFetching}
            rowKey={"id"}
            scroll={{ x: 1000 }}
            // @ts-expect-error ts-migrate(2322) TS2551: Expression will have type 'never' because expression is not callable.
            columns={GetColumns({
              selectedRowKeys,
              onSelectRow: handleSelectRow,
              onSelectAll: handleSelectAll,
              allRowKeys: usersData?.map((user: UserDataProps) => user.id),
              onDeleteUser: (user_id) =>
                openModal({
                  view: (
                    <DeleteRecord
                      key="delete user"
                      title="Delete User"
                      description="Are you sure do you want to delete this user"
                      url={`${queryKeys.get_users}/${user_id}`}
                      onRefresh={() =>
                        queryClient.invalidateQueries({
                          queryKey: [queryKeys.get_users],
                        })
                      }
                      closeModal={closeModal}
                    />
                  ),
                  customSize: "400px",
                  position: "center",
                  onClose: () => closeModal(),
                }),
            })}
            striped={false}
            paginatorOptions={{
              pageSize,
              setPageSize,
              total: usersPayload?.data?.total,
              current: currentPage,
              onChange: (page: number) => setCurrentPage(page),
            }}
          />
        </div>
      </PageWrapper>
    </div>
  );
};

export default Users;
