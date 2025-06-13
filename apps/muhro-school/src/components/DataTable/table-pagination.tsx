import { PiCaretDownBold } from "react-icons/pi";
import Pagination, { type PaginationProps } from "./pagination";
import cn from "@yegna-systems/ui/cn";
import { Select } from "@/components/ui/select";

const paginationLimitOptions = [5, 10, 25, 50, 100].map((v, idx) => ({
  id: idx,
  label: String(v),
  value: v,
}));

export type TablePaginationProps = {
  pageSize: number;
  setPageSize?: React.Dispatch<React.SetStateAction<number>>;
  paginatorClassName?: string;
} & PaginationProps;

export default function TablePagination({
  pageSize,
  setPageSize,
  total,
  paginatorClassName = "mt-5 xs:mt-6 sm:mt-7",
  ...props
}: TablePaginationProps) {
  if (total && total < pageSize) {
    return null;
  }

  return (
    <div
      className={cn(
        "table-pagination flex items-center justify-center sm:justify-between m-2",
        paginatorClassName
      )}
    >
      {!setPageSize ? (
        total && (
          <div className="hidden text-gray-500 sm:inline-flex">
            {props.current} of {Math.ceil(total / pageSize)} pages
          </div>
        )
      ) : (
        <div className="hidden items-center sm:flex whitespace-nowrap m-2">
          Rows per page:
          <Select
            options={paginationLimitOptions}
            onChange={setPageSize}
            size="sm"
            variant="text"
            value={pageSize}
            getOptionValue={({ value }: { value: number }) => value}
            suffix={<PiCaretDownBold />}
            dropdownClassName="p-1 border-none bg-white w-12  shadow-lg"
            className="ms-1 [&_button]:font-medium bg-white rounded-lg font-bold"
          />
        </div>
      )}
      <Pagination
        total={total}
        pageSize={pageSize}
        defaultCurrent={1}
        showLessItems={true}
        prevIconClassName="py-0 text-gray-500 !leading-[26px]"
        nextIconClassName="py-0 text-gray-500 !leading-[26px]"
        {...props}
        color="primary"
        className="rounded-2xl"
      />
    </div>
  );
}
