"use client";

import { Button } from "@yegna-systems/ui/button";
import React, { useState } from "react";
import { queryKeys } from "@/lib/api/query-keys";
import { useFetchData } from "@/lib/api/use-fetch-data";
import { FileInput, ListFilter } from "lucide-react";
import { useModal } from "@yegna-systems/lib/hooks/use-modal";
import { GetColumns } from "./column";
import { useQueryClient } from "@tanstack/react-query";
import { exportToExcel } from "@/utils/lib/export-data";
import { useDrawer } from "@yegna-systems/lib/hooks/use-drawer";
import PageWrapper from "@/components/PagesWrapper";
import TableSearch from "@yegna-systems/lib/table/table-search";
import ControlledTable from "@/components/DataTable/table";
import DeleteRecord from "@/utils/components/DeleteRecord";
import UserFilter from "./components/UserFilter";
import useUserFilterStore from "@/store/user.store";

const Transactions = () => {
  const queryClient = useQueryClient();
  const { openModal, closeModal } = useModal();
  const { openDrawer } = useDrawer();

  const { role, gender, status } = useUserFilterStore((state) => state);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  //get the user data
  const transactionPayload = useFetchData(
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
  const usersData: UserDataProps[] = transactionPayload?.data?.data?.data;

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
      gender: user?.gender,
      status: user.status,
    }));

    exportToExcel(
      _data,
      "Name, UserName, Email, Phone, Gender, Status",
      "Users Data"
    );
  };

  return (
    <PageWrapper
      isLoading={transactionPayload.isFetching}
      title="Transactions"
      back={false}
      search={true}
      isError={transactionPayload.isError}
      breadcrumb={true}
      staticComponent={
        <TableSearch
          title="Search Transactions"
          setDebouncedValue={(val) => {
            setCurrentPage(1);
            setSearchTerm(val);
          }}
          placeholder="Search..."
          className="w-full bg-gray-100 rounded-xl "
          titleClassName="text-sm"
        >
          <Button
            className="flex items-center gap-2 w-full rounded-2xl text-black bg-gray-100 hover:bg-gray-200 border border-gray-200"
            onClick={() =>
              openDrawer({
                view: <UserFilter />,
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
      }
      childrenClassnames="px-0 py-3"
    >
      <div className="table-wrapper flex-grow">
        <ControlledTable
          variant="modern"
          data={usersData}
          isLoading={transactionPayload.isFetching}
          rowKey={"id"}
          scroll={{ x: 1000 }}
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
            total: transactionPayload?.data?.total,
            current: currentPage,
            onChange: (page: number) => setCurrentPage(page),
          }}
        />
      </div>
    </PageWrapper>
  );
};

export default Transactions;
