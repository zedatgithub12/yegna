"use client";

import { routes } from "@/lib/config/routes";
import { Button } from "@yegna-systems/ui/button";
import React, { useState } from "react";
import { useRouter } from "nextjs-toploader/app";
import SvgWrapper from "@/components/SvgWrapper";
import PageWrapper from "@/components/PagesWrapper";
import Roles from "./roles";
import { queryKeys } from "@/lib/api/query-keys";
import { useFetchData } from "@/lib/api/use-fetch-data";
import TableSearch from "@yegna-systems/lib/table/table-search";
import { handleExport } from "@/components/ui/export-handler";
import { useGetHeaders } from "@/lib/hooks/use-get-headers";
import { FileInput, ListFilter } from "lucide-react";
import { useModal } from "@yegna-systems/lib/hooks/use-modal";
import ControlledTable from "@/components/DataTable/table";
import { GetColumns } from "./column";

const Users = () => {
  const router = useRouter();
  const { openModal } = useModal();
  const headers = useGetHeaders({ type: "Json" });

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const responsePayload = useFetchData(
    [queryKeys.get_roles],
    `${queryKeys.get_roles}`
  );

  const rolesData: rolesProps[] = responsePayload?.data?.data;

  const usersPayload = useFetchData(
    [queryKeys.get_users, currentPage, pageSize, searchTerm],
    `${queryKeys.get_users}?role=Admin&page=${currentPage}&limit=${pageSize}&search=${searchTerm}`
  );
  const usersData = usersPayload?.data?.data?.data;
  console.log(usersPayload);
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
      >
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
              openModal({
                view: <div className="flex flex-col">Filter Modal</div>,
                customSize: "400px",
                position: "right",
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
              onClick={() =>
                handleExport(
                  `users/export-all/?format=excel&page=${currentPage}&limit=${pageSize}&search=${searchTerm}`,
                  headers
                )
              }
              disabled={usersData?.length === 0}
            >
              <FileInput className="text-secondary" size={18} />
              Export
            </Button>
          ) : null}
        </TableSearch>

        <div className="tabel-wrapper flex-grow">
          <ControlledTable
            variant="modern"
            data={usersData}
            isLoading={usersPayload.isFetching}
            rowKey={"id"}
            scroll={{ x: 1000 }}
            columns={GetColumns()}
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
