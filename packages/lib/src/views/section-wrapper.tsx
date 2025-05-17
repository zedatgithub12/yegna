import cn from "@yegna-systems/ui/cn";
import React from "react";

const SectionWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="p-1.5 py-1 w-full">
      <div
        className={cn("h-full w-full    rounded-md bg-white p-2", className)}
      >
        {children}
      </div>
    </div>
  );
};

export default SectionWrapper;
