"use client";

import PageWrapper from "@/components/PagesWrapper";
import SvgWrapper from "@/components/SvgWrapper";
import { queryKeys } from "@/lib/api/query-keys";
import { useFetchData } from "@/lib/api/use-fetch-data";
import { routes } from "@/lib/config/routes";

import { Button } from "@yegna-systems/ui/button";
import TableSearch from "@yegna-systems/lib/table/table-search";
import { FileInput, ListFilter } from "lucide-react";
import React, { useState } from "react";
import ControlledTable from "@/components/DataTable/table";
import { useRouter } from "next/navigation";
import { GetColumns } from "./components/column";
import DeleteRecord from "@/utils/components/DeleteRecord";
import { useQueryClient } from "@tanstack/react-query";
import { useModal } from "@yegna-systems/lib/hooks/use-modal";
import InstitutionFilter from "./components/InstitutionFilter";
import { useDrawer } from "@yegna-systems/lib/hooks/use-drawer";
import { exportToExcel } from "@/utils/lib/export-data";

const Institution = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { openModal, closeModal } = useModal();
  const { openDrawer } = useDrawer();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  const responsePayload = useFetchData(
    [queryKeys.get_institution, currentPage, pageSize, searchTerm],
    `${queryKeys.get_institution}?page=${currentPage}&limit=${pageSize}&search=${searchTerm}`
  );

  const institutionData: getInstitutionProps[] =
    responsePayload?.data?.data?.data;

  const categoriePayload = useFetchData(
    [queryKeys.get_categories],
    `${queryKeys.get_categories}`
  );

  const categoriesData = categoriePayload?.data?.data?.data ?? [];

  const handleSelectRow = (id: string) => {
    setSelectedRowKeys((prev) =>
      prev.includes(id) ? prev.filter((key) => key !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (institutionData.length === selectedRowKeys.length) {
      setSelectedRowKeys([]);
    } else if (selectedRowKeys.length < institutionData.length) {
      setSelectedRowKeys(institutionData.map((institution) => institution.id));
    } else if (selectedRowKeys.length === 0) {
      setSelectedRowKeys(institutionData.map((institution) => institution.id));
    }
  };

  const handleExportingExcel = () => {
    const selectedInstitution =
      selectedRowKeys.length > 0
        ? institutionData.filter((institution) =>
            selectedRowKeys.includes(institution.id)
          )
        : institutionData;

    const _data = selectedInstitution.map((institution) => ({
      name: institution.name,
      email: institution.email,
      phone: institution?.phone,
      location: institution?.address,
      institution_type: institution?.type,
    }));

    exportToExcel(
      _data,
      "Name, Email, Location, Phone Number, Type",
      "Institution Data"
    );
  };

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
        staticComponent={
          <TableSearch
            title="Search for Institution"
            titleClassName="text-md font-medium"
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
                  view: <InstitutionFilter categories={categoriesData} />,
                  placement: "right",
                  customSize: 10,
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
                onClick={() => handleExportingExcel()}
                disabled={institutionData?.length === 0}
              >
                <FileInput className="text-secondary" size={18} />
                Export
              </Button>
            ) : null}
          </TableSearch>
        }
      >
        <div className="tabel-wrapper flex-grow">
          <ControlledTable
            variant="modern"
            data={institutionData}
            isLoading={responsePayload.isFetching}
            rowKey={"id"}
            scroll={{ x: 1000 }}
            // @ts-expect-error ts-migrate(2322) TS2551: Expression will have type 'never' because expression is not callable.
            columns={GetColumns({
              selectedRowKeys,
              onSelectRow: handleSelectRow,
              onSelectAll: handleSelectAll,
              allRowKeys: institutionData?.map(
                (inst: getInstitutionProps) => inst.id
              ),
              onDeleteInstitution: (institution_id) =>
                openModal({
                  view: (
                    <DeleteRecord
                      key="delete institution"
                      title="Delete Institution"
                      description="Are you sure you want to delete this institution?"
                      url={`${queryKeys.get_institution}/${institution_id}`}
                      onRefresh={() =>
                        queryClient.invalidateQueries({
                          queryKey: [queryKeys.get_institution],
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
