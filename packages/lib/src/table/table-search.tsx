import React from "react";
import { IoMdRefresh } from "react-icons/io";
import { useDebounce } from "../hooks/use-debounce";
import { Input } from "@yegna-systems/ui/input";
import cn from "@yegna-systems/ui/cn";
import { ActionIcon } from "@yegna-systems/ui/action-icon";
import { Text } from "@yegna-systems/ui/typography";

type SearchProps = {
  title?: string;
  titleClassName?: string;
  setDebouncedValue: (value: string) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  onRefresh?: () => void;
  children?: React.ReactNode;
  prefix?: React.ReactNode;
};

const TableSearch = ({
  title,
  titleClassName,
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
    [searchTerm]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onChange?.(e);
  };

  return (
    <div className="flex w-full items-center justify-between gap-3 rounded-xl bg-white p-3">
      <div className="flex items-center w-1/2 gap-4">
        {title ? (
          <Text className={cn("text-lg font-medium", titleClassName)}>
            {title}
          </Text>
        ) : null}
        <Input
          placeholder={placeholder}
          type="search"
          prefix={prefix}
          className={cn("max-w-sm", className)}
          variant="text"
          value={searchTerm}
          onChange={handleChange}
          clearable
          onClear={() => {
            setSearchTerm("");
            cancel();
          }}
        />
      </div>
      <div className="flex w-fit items-center justify-end gap-3">
        {onRefresh ? (
          <ActionIcon variant="flat" onClick={onRefresh} className="group">
            <IoMdRefresh
              size={20}
              className="text-primary group-hover:animate-spin duration-300"
            />
          </ActionIcon>
        ) : null}
        {children}
      </div>
    </div>
  );
};

export default TableSearch;
