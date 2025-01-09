import React from "react";
import { IoMdRefresh } from "react-icons/io";
import { useDebounce } from "../hooks/use-debounce";
import { Input } from "@coop-super-app/ui/input";
import cn from "@coop-super-app/ui/cn";
import { ActionIcon } from "@coop-super-app/ui/action-icon";

type SearchProps = {
  setDebouncedValue: (value: string) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  onRefresh?: () => void;
  children?: React.ReactNode;
  prefix?: React.ReactNode;
};

const TableSearch = ({
  setDebouncedValue,
  onChange,
  placeholder,
  className,
  onRefresh,
  children,
  prefix,
}: SearchProps) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [, cancel] = useDebounce(
    () => {
      setDebouncedValue?.(searchTerm);
    },
    1500,
    [searchTerm],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onChange?.(e);
  };

  return (
    <div className="flex w-full items-center justify-between gap-3 rounded-md bg-white p-1.5">
      <Input
        placeholder={placeholder}
        type="search"
        prefix={prefix}
        className={cn("max-w-xl", className)}
        variant="flat"
        value={searchTerm}
        onChange={handleChange}
        clearable
        onClear={() => {
          setSearchTerm("");
          cancel();
        }}
      />
      <div className="flex w-fit flex-wrap items-center justify-end gap-3">
        <ActionIcon variant="flat" onClick={onRefresh}>
          <IoMdRefresh size={20} className="text-primary" />
        </ActionIcon>
        {children}
      </div>
    </div>
  );
};

export default TableSearch;
