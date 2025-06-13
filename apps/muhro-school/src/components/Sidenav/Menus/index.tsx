"use client";

import React from "react";
import MenuItem from "./MenuItem";
import { SideNavMenus } from "@/components/menus/side-nav-menu";
// import { useSession } from "next-auth/react";

const Menus = () => {
  // const { data: session } = useSession();
  // console.log(session);
  // const permissions = session?.user.user.roles
  //   .flatMap((role) => role.permissions)
  //   .reduce<{ uuid: string; name: string }[]>((acc, permission) => {
  //     if (!acc.some((perm) => perm.uuid === permission.uuid)) {
  //       acc.push(permission);
  //     }
  //     return acc;
  //   }, []);

  return (
    <div>
      {/* {SideNavMenus.filter(
        (menu) =>
          permissions?.some(
            (permission) => permission.name === menu.permission
          ) || menu.permission === "read_dashboard"
      ).map((menu, index) => (
        <MenuItem key={index} item={menu} />
      ))} */}

      {SideNavMenus.map((menu, index) => (
        <MenuItem key={index} item={menu} />
      ))}
    </div>
  );
};

export default Menus;
