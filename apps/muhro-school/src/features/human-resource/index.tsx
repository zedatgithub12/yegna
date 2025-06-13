"use client";

import React, { useState } from "react";
import { routes } from "@/lib/config/routes";
import { Button } from "@yegna-systems/ui/button";
import { useRouter } from "nextjs-toploader/app";
import { queryKeys } from "@/lib/api/query-keys";
import { useFetchData } from "@/lib/api/use-fetch-data";
import { FileInput, ListFilter } from "lucide-react";
import { useModal } from "@yegna-systems/lib/hooks/use-modal";
import { GetColumns } from "./column";
import { useQueryClient } from "@tanstack/react-query";
import { exportToExcel } from "@/utils/lib/export-data";
import { useDrawer } from "@yegna-systems/lib/hooks/use-drawer";
import SvgWrapper from "@/components/SvgWrapper";
import PageWrapper from "@/components/PagesWrapper";
import TableSearch from "@yegna-systems/lib/table/table-search";
import ControlledTable from "@/components/DataTable/table";
import Roles from "../rolePermissions/roles";
import DeleteRecord from "@/utils/components/DeleteRecord";
import UserFilter from "./components/UserFilter";
import useUserFilterStore from "@/store/user.store";

const HumanResource = () => {
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
      queryKeys.get_employees,
      currentPage,
      pageSize,
      searchTerm,
      role,
      gender,
      status,
    ],
    `${queryKeys.get_employees}?page=${currentPage}&limit=${pageSize}&search=${searchTerm}`
  );
  const usersData: EmployeeProps[] = usersPayload?.data?.data?.docs;

  const handleSelectRow = (user_id: string) => {
    setSelectedRowKeys((prev) =>
      prev.includes(user_id)
        ? prev.filter((key) => key !== user_id)
        : [...prev, user_id]
    );
  };

  const handleSelectAll = () => {
    if (usersData.length === selectedRowKeys.length) {
      setSelectedRowKeys([]);
    } else if (selectedRowKeys.length < usersData.length) {
      setSelectedRowKeys(usersData.map((user) => user.user_id));
    } else if (selectedRowKeys.length === 0) {
      setSelectedRowKeys(usersData.map((user) => user.user_id));
    }
  };

  const handleExportingExcel = () => {
    const selectedUsers =
      selectedRowKeys.length > 0
        ? usersData.filter((user) => selectedRowKeys.includes(user.user_id))
        : usersData;

    const _data = selectedUsers.map((user) => ({
      first_name: user.first_name,
      middle_name: user?.middle_name,
      last_name: user?.last_name,
      username: user.user_name,
      user_code: user.user_code,
      email: user?.email,
      phone: user?.phone_number,
      roles: user?.access_role,
    }));

    exportToExcel(
      _data,
      "First Name, Middle Name, Last Name, UserName, UserCode, Email, Phone, Roles",
      "Employees Data"
    );
  };

  return (
    <div>
      <PageWrapper
        isLoading={usersPayload.isFetching}
        title="Human Resource"
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
            Add Employee
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
              title="All Employees"
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
          </>
        }
      >
        <div className="table-wrapper flex-grow">
          <ControlledTable
            variant="modern"
            data={usersData}
            isLoading={usersPayload.isFetching}
            rowKey={"user_id"}
            scroll={{ x: 1000 }}
            // @ts-expect-error ts-migrate(2322) TS2551: Expression will have type 'never' because expression is not callable.
            columns={GetColumns({
              selectedRowKeys,
              onSelectRow: handleSelectRow,
              onSelectAll: handleSelectAll,
              allRowKeys: usersData?.map((user: EmployeeProps) => user.user_id),
              onDeleteUser: (user_id) =>
                openModal({
                  view: (
                    <DeleteRecord
                      key="delete employee"
                      title="Delete Employee"
                      description="Are you sure do you want to delete this employee"
                      url={`${queryKeys.get_employees}/${user_id}`}
                      onRefresh={() =>
                        queryClient.invalidateQueries({
                          queryKey: [queryKeys.get_employees],
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

export default HumanResource;
