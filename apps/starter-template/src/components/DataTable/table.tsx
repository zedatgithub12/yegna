"use client";
import React from "react";
import dynamic from "next/dynamic";
import isEmpty from "lodash/isEmpty";
import { Table, type TableProps } from "@/components/ui/table";
import type { TablePaginationProps } from "./table-pagination";
import cn from "@yegna-systems/ui/cn";
import Loader from "./loader";


const TablePagination = dynamic(() => import("./table-pagination"), {
  ssr: false,
});
export type TableFilterProps = {
  searchTerm: string;
  onSearchClear: () => void;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: { [key: string]: any }[];
  checkedColumns: string[];
  setCheckedColumns: React.Dispatch<React.SetStateAction<string[]>>;
  hideIndex?: number;
  children?: React.ReactNode;
  drawerTitle?: string;
  hasSearched?: boolean;
  showSearchOnTheRight?: boolean;
  enableDrawerFilter?: boolean;
  menu?: React.ReactNode;
};

type ControlledTableProps = {
  isLoading?: boolean;
  showLoadingText?: boolean;
  filterElement?: React.ReactElement;
  filterOptions?: TableFilterProps;
  paginatorOptions?: TablePaginationProps;
  tableFooter?: React.ReactNode;
  className?: string;
  paginatorClassName?: string;
} & TableProps;

export default function ControlledTable({
  isLoading,
  // filterElement,
  // filterOptions,
  paginatorOptions,
  tableFooter,
  paginatorClassName,
  className,
  ...tableProps
}: ControlledTableProps) {
  if (isLoading) {
    return (
      <div className=" w-full h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="relative bg-white shadow-sm shadow-gray-100 my-3 rounded-2xl">
        <Table
          scroll={{ x: 1000 }}
          rowKey={(record) => (record as { id: string | number }).id}
          className={cn(
        className,
        "overflow-hidden rounded-2xl border border-gray-200 text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0 no-scrollbar"
          )}
          striped={true}
          {...tableProps}
        />

        {tableFooter ? tableFooter : null}
      </div>

      {!isEmpty(paginatorOptions) && (
        <TablePagination
          paginatorClassName={paginatorClassName}
          {...paginatorOptions}
        />
      )}
    </>
  );
}
