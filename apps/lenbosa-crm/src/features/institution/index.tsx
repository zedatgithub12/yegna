"use client";

import PageWrapper from "@/components/PagesWrapper";
import SvgWrapper from "@/components/SvgWrapper";
import { handleExport } from "@/components/ui/export-handler";
import { queryKeys } from "@/lib/api/query-keys";
import { useFetchData } from "@/lib/api/use-fetch-data";
import { routes } from "@/lib/config/routes";
import { useGetHeaders } from "@/lib/hooks/use-get-headers";
import { useModal } from "@/lib/hooks/use-modal";
import { Button } from "@yegna-systems/ui/button";
import TableSearch from "@yegna-systems/lib/table/table-search";
import { FileInput, ListFilter } from "lucide-react";
import React, { useState } from "react";
import ControlledTable from "@/components/DataTable/table";
import { useRouter } from "next/navigation";
import { GetColumns } from "./componets/column";

const Institution = () => {
  const router = useRouter();
  const { openModal } = useModal();
  const headers = useGetHeaders({ type: "Json" });

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const responsePayload = useFetchData(
    [queryKeys.get_institution],
    `${queryKeys.get_institution}`
  );

  const institutionData: getInstitutionProps[] =
    responsePayload?.data?.data?.data;

  return (
    <div>
      <PageWrapper
        isLoading={responsePayload.isFetching}
        title="Institution Management"
        back={false}
        search={true}
        breadcrumb={true}
        hasActionButton
        actionButtons={
          <Button
            variant="solid"
            color="primary"
            className="hover:bg-primary-dark text-secondary font-medium cursor-pointer gap-1 rounded-lg py-5"
            onClick={() => router.push(routes.institution.create)}
          >
            <SvgWrapper
              src="/icons/add-01.svg"
              width="22px"
              height="22px"
              color="#bbf451"
            />
            Add Institution
          </Button>
        }
      >
        <TableSearch
          title="Search for Institution"
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
                // position: "right",
              })
            }
          >
            <ListFilter className="text-gray-600" size={18} />
            Filter
          </Button>

          {institutionData?.length ? (
            <Button
              color="primary"
              className="flex items-center gap-2 w-full rounded-2xl text-secondary"
              onClick={() =>
                handleExport(
                  `users/export-all/?format=excel&page=${currentPage}&limit=${pageSize}&search=${searchTerm}`,
                  headers
                )
              }
              disabled={institutionData?.length === 0}
            >
              <FileInput className="text-secondary" size={18} />
              Export
            </Button>
          ) : null}
        </TableSearch>

        <div className="tabel-wrapper flex-grow">
          <ControlledTable
            variant="modern"
            data={institutionData}
            isLoading={responsePayload.isFetching}
            rowKey={"id"}
            scroll={{ x: 1000 }}
            // @ts-expect-error ts-migrate(2322) TS2551: Expression will have type 'never' because expression is not callable.
            columns={GetColumns()}
            paginatorOptions={{
              pageSize,
              setPageSize,
              total: responsePayload?.data?.total,
              current: currentPage,
              onChange: (page: number) => setCurrentPage(page),
            }}
          />
        </div>
      </PageWrapper>
    </div>
  );
};

export default Institution;
