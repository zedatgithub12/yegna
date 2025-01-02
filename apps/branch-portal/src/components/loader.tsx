import React from "react";
import "@/css/loader.css";
import cn from "@coop-super-app/ui/cn";
const Loader = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn("flex items-center justify-center w-full p-8", className)}
    >
      <div className="loader-container"></div>
    </div>
  );
};

export default Loader;
