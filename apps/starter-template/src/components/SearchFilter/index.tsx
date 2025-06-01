import React from "react";
import { RotateCcw } from "lucide-react";
import { useDebounce } from "@/lib/hooks/use-debounce";
import { Input } from "@/components/ui/input";
import cn from "@yegna-systems/ui/cn";
import { Button } from "rizzui/button";

type SearchProps = {
  setDebouncedValue: (value: string) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  onRefresh?: () => void;
  children?: React.ReactNode;
  prefix?: React.ReactNode;
  inputClassName?: string;
};

const SearchFilter = ({
  setDebouncedValue,
  onChange,
  placeholder,
  className,
  onRefresh,
  children,
  prefix,
  inputClassName,
}: SearchProps) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [, cancel] = useDebounce(
    () => {
      setDebouncedValue?.(searchTerm.trim());
    },
    1000,
    [searchTerm]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onChange?.(e);
  };

  return (
    <div className="flex w-full items-center justify-between gap-3 rounded-xl bg-white p-1.5">
      <Input
        placeholder={placeholder}
        type="search"
        inputClassName={inputClassName}
        prefix={prefix}
        className={cn("max-w-lg", className)}
        variant="text"
        value={searchTerm}
        onChange={handleChange}
        clearable
        onClear={() => {
          setSearchTerm("");
          cancel();
        }}
      />
      <div className="flex w-fit flex-wrap items-center justify-end gap-3">
        {onRefresh ? (
          <Button
            size="md"
            variant="flat"
            className="hover:bg-primary/30"
            onClick={onRefresh}
          >
            <RotateCcw size={20} className="" />
          </Button>
        ) : null}

        {children}
      </div>
    </div>
  );
};

export default SearchFilter;
