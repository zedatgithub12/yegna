import React from "react";
import Table from "rc-table";

import cn from "@/utils/lib/class-names";
import { DefaultRecordType } from "rc-table/lib/interface";

export type ExtractProps<T> = T extends React.ComponentType<infer P> ? P : T;

const tableStyles = {
  table: "[&_.rc-table-content]:overflow-x-auto [&_table]:w-full",
  thead:
    "[&_thead]:text-left [&_thead]:rtl:text-right [&_th.rc-table-cell]:capitalize [&_th.rc-table-cell]:bg-[#EFFFF1] [&_th.rc-table-cell]:text-xs [&_th.rc-table-cell]:font-medium [&_th.rc-table-cell]:tracking-wide",
  tCell:
    "[&_.rc-table-cell]:px-3 [&_th.rc-table-cell]:py-3 [&_td.rc-table-cell]:py-4",
  variants: {
    classic:
      "[&_thead]:bg-muted/50 [&_.rc-table-container]:border-x [&_.rc-table-container]:border-muted [&_td.rc-table-cell]:border-b [&_td.rc-table-cell]:border-muted [&_thead]:border-y [&_thead]:border-muted",
    modern:
      "[&_thead]:bg-muted/50 [&_td.rc-table-cell]:border-b [&_td.rc-table-cell]:border-muted",
    minimal: "[&_thead]:bg-muted/50",
    elegant:
      "[&_thead]:border-y [&_thead]:border-muted [&_td.rc-table-cell]:border-b [&_td.rc-table-cell]:border-muted",
  },
  striped: "[&_.rc-table-row:nth-child(2n)_.rc-table-cell]:bg-muted/40",
};

type RCTableProps = ExtractProps<typeof Table>;
export type RecordType = DefaultRecordType;
export interface TableProps
  extends Omit<RCTableProps, "className" | "emptyText"> {
  emptyText?: React.ReactElement;
  variant?: keyof typeof tableStyles.variants;
  striped?: boolean;
  className?: string;
}

export function RcTable({
  striped,
  variant = "classic",
  emptyText,
  className,
  ...props
}: TableProps) {
  return (
    <Table
      className={cn(
        tableStyles.table,
        tableStyles.thead,
        tableStyles.tCell,
        tableStyles.variants[variant],
        striped && tableStyles.striped,
        className
      )}
      emptyText={emptyText ?? <p>No results!</p>}
      {...props}
    />
  );
}

RcTable.displayName = "Table";
