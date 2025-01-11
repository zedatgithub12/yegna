"use client";
import React from "react";
import dynamic from "next/dynamic";
import isEmpty from "lodash/isEmpty";
import { Table, type TableProps } from "@coop-super-app/ui/table";
import type { TablePaginationProps } from "./table-pagination";
import cn from "@coop-super-app/ui/cn";
import TableLoader from "./table-loader";

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
        <TableLoader  />
      </div>
    );
  }

  return (
    <>
      <div className="relative">
        <Table
          scroll={{ x: 1300 }}
          rowKey={(record) => record.id}
          className={cn(className)}
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
