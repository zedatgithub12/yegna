"use client";

import React from "react";
import MenuItem from "./MenuItem";
import { SideNavMenus } from "@/components/menus/side-nav-menu";

const Menus = () => {
  return (
    <div>
      {SideNavMenus.map((menu, index) => (
        <MenuItem key={index} item={menu} />
      ))}
    </div>
  );
};

export default Menus;
