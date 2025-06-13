import React from "react";
import SideNav from "@/components/Sidenav";

type Props = {
  children: React.ReactNode;
};
const MainLayout = ({ children }: Props) => {
  return (
    <div className="flex bg-gray-100 ">
      <SideNav />
      <div className="w-full h-screen ml-3 pr-4 py-2 overflow-y-scroll scrollbar-hide">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
