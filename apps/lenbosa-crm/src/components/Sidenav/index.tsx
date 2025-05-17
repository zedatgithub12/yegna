import React from "react";
import LogoSection from "./LogoSection";
import Menus from "./Menus";

const SideNav = () => {
  return (
    <div className="min-w-64 w-1/5 h-screen p-2 scrollbar-hide">
      <div className=" w-full h-full overflow-y-scroll scrollbar-hide rounded-2xl bg-white shadow-sm shadow-gray-100 py-2 pb-8">
        <LogoSection />
        <hr className="my-3 text-gray-200" />
        <Menus />
      </div>
    </div>
  );
};

export default SideNav;
