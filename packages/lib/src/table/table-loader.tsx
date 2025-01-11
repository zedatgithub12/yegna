import cn from "@coop-super-app/ui/cn";
import React from "react";
import { ImSpinner9 } from "react-icons/im";

const TableLoader = ({ className }: {className?:string}) => {
  return (
    <div className="flex items-center justify-center w-full">
      <ImSpinner9 className={cn("animate-spin text-primary",className)} size={45} />
    </div>
  );
};

export default TableLoader;
