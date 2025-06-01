import cn from "@yegna-systems/ui/cn";
import React from "react";
import { ImSpinner2 } from "react-icons/im";

const Loader = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn("flex items-center justify-center w-full py-6", className)}
    >
      <ImSpinner2 className={cn("animate-spin text-primary")} size={45} />
    </div>
  );
};

export default Loader;
