import React from "react";
import LogoSection from "./LogoSection";
import Menus from "./Menus";
import { useNavStore } from "@/store/nav-store";
import Logo from "../logo";
import { ActionIcon } from "@yegna-systems/ui/action-icon";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SideNav = () => {
  const { drawerOpen, onToggleDrawer } = useNavStore();

  return (
    <div
      className={`${drawerOpen ? "min-w-64  w-1/5" : "min-w-28"} h-screen p-2 scrollbar-hide`}
    >
      <div className=" w-fit h-full overflow-y-scroll scrollbar-hide rounded-2xl bg-white shadow-sm shadow-gray-100 py-2 pb-8 ">
        <div className="flex items-center justify-between gap-1 pl-2">
          {drawerOpen ? <LogoSection /> : <Logo />}
          <ActionIcon
            onClick={onToggleDrawer}
            className="mr-2 w-6 h-6"
            rounded="full"
            variant="flat"
          >
            {" "}
            {drawerOpen ? (
              <ChevronLeft size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </ActionIcon>
        </div>

        <hr className="my-3 text-gray-200" />
        <Menus />
      </div>
    </div>
  );
};

export default SideNav;
