"use client";
import { queryKeys } from "@/lib/api/query-keys";
import { useFetchData } from "@/lib/api/useFetchData";
import ControlledTable from "@coop-super-app/lib/table/table";
import React from "react";
import { getColumns } from "./customers-columns";
import { Select } from "@coop-super-app/ui/select";
import TableSearch from "@coop-super-app/lib/table/table-search";
import { useQueryClient } from "@tanstack/react-query";

export const statusOptions = [
  { label: "PENDING", value: "PENDING" },
  { label: "AUTHORIZED", value: "AUTHORIZED" },
  { label: "DENIED", value: "DENIED" },
  { label: "INITIATED", value: "INITIATED" },
];

const CustomersList = () => {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(5);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [status, setStatus] = React.useState("");
  const customersData = useFetchData(
    [queryKeys.getAllCustomersListQuery, currentPage, pageSize, status],
    `ldap/paginate?page=${currentPage}&limit=${pageSize}&searchKey=${searchTerm}&status=${status}`
  );
  return (
    <>
      <div className="px-2 py-2">
        <TableSearch
          setDebouncedValue={setSearchTerm}
          placeholder="Search by name, ft number or transaction ID"
          className="w-full max-w-xl"
          onRefresh={() => {
            queryClient.invalidateQueries({
              queryKey: [queryKeys.getAllCustomersListQuery],
            });
          }}
        >
          <Select
            options={statusOptions}
            value={status}
            onChange={(e: { value: string }) => setStatus(e?.value)}
            className={"w-52"}
            placeholder="Filter by status"
            variant="flat"
            clearable
            onClear={() => setStatus("")}
          />
        </TableSearch>
      </div>
      <div className="mx-2 mt-2 rounded-md bg-white p-2">
        <div className={"table-wrapper flex-grow"}>
          <ControlledTable
            variant={"modern"}
            isLoading={customersData.isFetching}
            showLoadingText={true}
            data={customersData?.data?.data.docs}
            scroll={{ x: 1400 }}
            columns={getColumns()}
            paginatorOptions={{
              pageSize,
              setPageSize,
              total: customersData?.data?.totalDocs,
              current: currentPage,
              onChange: (page: number) => setCurrentPage(page),
            }}
            className={
              "overflow-hidden rounded-md border border-gray-200 text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
            }
          />
        </div>
      </div>
    </>
  );
};

export default CustomersList;
