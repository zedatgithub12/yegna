import cn from "@yegna-systems/ui/cn";
import React from "react";
import { ImSpinner9 } from "react-icons/im";

const IconLoader = ({ iconClassName }: { iconClassName?: string }) => {
  return (
    <ImSpinner9
      className={cn("text-primary h-3 w-3 animate-spin", iconClassName)}
    />
  );
};

export default IconLoader;
