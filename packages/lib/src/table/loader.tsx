import cn from "@yegna-systems/ui/cn";
import React from "react";
import { ImSpinner9 } from "react-icons/im";

const Loader = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center justify-center w-full", className)}>
      <ImSpinner9 className={cn("animate-spin text-primary")} size={45} />
    </div>
  );
};

export default Loader;
