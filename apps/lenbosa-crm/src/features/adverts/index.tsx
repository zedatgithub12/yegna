"use client";

import React, { useState } from "react";
import { routes } from "@/lib/config/routes";
import { Button } from "@yegna-systems/ui/button";
import { useRouter } from "nextjs-toploader/app";
import { queryKeys } from "@/lib/api/query-keys";
import { useFetchData } from "@/lib/api/use-fetch-data";
import SvgWrapper from "@/components/SvgWrapper";
import PageWrapper from "@/components/PagesWrapper";
import TableSearch from "@yegna-systems/lib/table/table-search";
import ControlledTable from "@/components/DataTable/table";
import { GetColumns } from "./column";
import DeleteRecord from "@/utils/components/DeleteRecord";
import { useModal } from "@yegna-systems/lib/hooks/use-modal";
import { useQueryClient } from "@tanstack/react-query";

const Adverts = () => {
  const router = useRouter();
  const { openModal, closeModal } = useModal();
  const queryClient = useQueryClient();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const responsePayload = useFetchData(
    [queryKeys.adverts, currentPage, pageSize, searchTerm],
    `${queryKeys.adverts}?page=${currentPage}&limit=${pageSize}&search=${searchTerm}`
  );
  const _data = responsePayload?.data?.data?.data;

  return (
    <div>
      <PageWrapper
        isLoading={responsePayload.isFetching}
        title="Ads & Campaigns"
        back={false}
        search={true}
        breadcrumb={true}
        hasActionButton
        actionButtons={
          <Button
            variant="solid"
            color="primary"
            className="hover:bg-primary-dark text-secondary font-medium cursor-pointer gap-1 rounded-lg py-5"
            onClick={() => router.push(routes.adverts.create)}
          >
            <SvgWrapper
              src="/icons/add-01.svg"
              width="22px"
              height="22px"
              color="#bbf451"
            />
            Create New Ad
          </Button>
        }
        staticComponent={
          <>
            <TableSearch
              title="All Adverts"
              setDebouncedValue={(val) => {
                setCurrentPage(1);
                setSearchTerm(val);
              }}
              placeholder="Search..."
              className="w-full bg-gray-100 rounded-xl "
            ></TableSearch>
          </>
        }
      >
        <div className="table-wrapper flex-grow">
          <ControlledTable
            variant="modern"
            data={_data}
            isLoading={responsePayload.isFetching}
            rowKey={"id"}
            scroll={{ x: 1000 }}
            columns={GetColumns({
              onDeleteUser: (ad_id) =>
                openModal({
                  view: (
                    <DeleteRecord
                      key="delete ad"
                      title="Delete Ad"
                      description="Are you sure do you want to delete this Ad"
                      url={`${queryKeys.adverts}/${ad_id}`}
                      onRefresh={() =>
                        queryClient.invalidateQueries({
                          queryKey: [queryKeys.adverts],
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

export default Adverts;
