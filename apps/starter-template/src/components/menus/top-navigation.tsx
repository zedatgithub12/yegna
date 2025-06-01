import { routes } from "@/lib/config/routes";
import React from "react";
import { IoIosArrowRoundUp } from "react-icons/io";
import DashboardIcon from "@public/icons/dashboard.png";
import Image from "next/image";
import { Text, Title } from "@yegna-systems/ui/typography";
import Link from "next/link";
const TopNavigationMenus = () => {
  const menus = [
    {
      id: 1,
      name: "Dashboard",
      icon: DashboardIcon,
      color: "#E1F5ED",
      mainColor: "#005FB2",
      desc: "Get a comprehensive overview of your account activities and key insights.",
      href: routes.dashboard,
    },

    {
      id: 2,
      name: "Customers",
      icon: DashboardIcon,
      mainColor: "#005FB2",
      color: "#E1F5ED",
      desc: "Monitor and manage all transaction activities conducted for different transactions",
      href: "",
    },
    {
      id: 3,
      name: "Merchants",
      icon: DashboardIcon,
      mainColor: "#005FB2",
      color: "#E1F5ED",
      desc: "View all the completed transaction lists of your customers.",
      href: "",
    },
    {
      id: 4,
      name: "Transactions",
      icon: DashboardIcon,
      mainColor: "#005FB2",
      color: "#E1F5ED",
      desc: "View all the completed transaction lists of your customers.",
      href: "",
    },
  ];
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 ">
      {menus.map((menu) => (
        <Link key={menu.id} href={menu.href} className="w-full h-full">
          <div className="group relative flex  items-center bg-white p-5 md:p-8 gap-5 rounded-xl border border-primary/10 h-full">
            <div className="flex items-end justify-end self-end absolute z-40 right-3 top-3">
              <button
                style={{ backgroundColor: menu.color }}
                className="p-1 rounded-full font-medium"
              >
                <IoIosArrowRoundUp
                  className=" rotate-45 text-primary group-hover:animate-bounce"
                  size={24}
                />
              </button>
            </div>
            <div
              style={{ backgroundColor: menu.color }}
              className="flex items-center gap-1 w-full max-w-16 h-16 self-center rounded-full justify-center flex-nowrap "
            >
              <Image
                src={menu.icon}
                alt={menu.name}
                className="h-10 lg:h-10 w-10 lg:w-12  object-contain"
              />
            </div>
            <div className="">
              <Title as="h4" className="text-left">
                {menu.name}
              </Title>
              <Text as="p" className="text-gray-400 text-left text-xs">
                {menu.desc}
              </Text>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default TopNavigationMenus;
