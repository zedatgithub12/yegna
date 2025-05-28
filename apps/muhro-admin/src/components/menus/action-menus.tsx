"use client";
import React from "react";
import PasswordIcon from "../icons/password";
import { Text, Title } from "@yegna-systems/ui/typography";
import Link from "next/link";
import { useModal } from "@yegna-systems/lib/hooks/use-modal";

const ActionMenus = () => {
  const { openModal } = useModal();
  const menus = [
    {
      id: 1,
      name: "Create Customer",
      icon: <PasswordIcon className="h-7 w-7" />,
      color: "#BBDEFB",
      desc: "Create a new customer's bank and mobile banking account.",
      href: "",
    },
    {
      id: 2,
      name: "Create Merchant",
      icon: <PasswordIcon className="h-7 w-7" />,
      color: "#FFE0B2",
      desc: "Register a new merchant account seamlessly.",
      href: "",
    },
    {
      id: 3,
      name: "Link Account",
      icon: <PasswordIcon className="h-7 w-7" />,
      color: "#BBDEFB",
      desc: "Link customers' bank accounts to the mobile app.",
      onClick: () =>
        openModal({
          view: <p>gg</p>,
        }),
    },
    {
      id: 4,
      name: "Add Other Accounts",
      icon: <PasswordIcon className="h-7 w-7" />,
      color: "#F0F4C3",
      desc: "Link an additional account for the user to the mobile app.",
      onClick: () =>
        openModal({
          view: <p>gg</p>,
        }),
    },
    {
      id: 5,
      name: "Link And/Or Account",
      icon: <PasswordIcon className="h-7 w-7" />,
      color: "#F1E2FF",
      desc: "Link an And/Or account for the user to the mobile app.",
      onClick: () =>
        openModal({
          view: <p>gg</p>,
        }),
    },
    {
      id: 6,
      name: "Reset PIN",
      icon: <PasswordIcon className="h-7 w-7" />,
      color: "#C8E6C9",
      desc: "Change the user's PIN for the mobile banking app.",
      onClick: () =>
        openModal({
          view: <p>gg</p>,
        }),
    },
    {
      id: 12,
      name: "Activate Account",
      icon: <PasswordIcon className="h-7 w-7" />,
      color: "#C8E6C9",
      desc: "Change the user's PIN for the mobile banking app.",
      onClick: () =>
        openModal({
          view: <p>gg</p>,
        }),
    },
    {
        id: 16,
        name: "Attach Phone Number",
        icon: <PasswordIcon className="h-7 w-7" />,
        color: "#C5CAE9",
        desc: "Update the user's mobile app phone number.",
        onClick: () =>
          openModal({
            view: <p>gg</p>,
          }),
      },
    {
      id: 7,
      name: "Change Phone Number",
      icon: <PasswordIcon className="h-7 w-7" />,
      color: "#C5CAE9",
      desc: "Update the user's mobile app phone number.",
      onClick: () =>
        openModal({
          view: <p>gg</p>,
        }),
    },
    {
      id: 13,
      name: "Change Email",
      icon: <PasswordIcon className="h-7 w-7" />,
      color: "#C5CAE9",
      desc: "Update the user's mobile app email.",
      onClick: () =>
        openModal({
          view: <p>gg</p>,
        }),
    },
    {
      id: 8,
      name: "Unlink Device",
      icon: <PasswordIcon className="h-7 w-7" />,
      color: "#FFCCBC",
      desc: "Unlink the customers device from the mobile app.",
      onClick: () =>
        openModal({
          view: <p>gg</p>,
        }),
    },
    {
      id: 9,
      name: "Unlink Accounts",
      icon: <PasswordIcon className="h-7 w-7" />,
      color: "#CFD8DC",
      desc: "Unlink the customers bank account.",
      onClick: () =>
        openModal({
          view: <p>gg</p>,
        }),
    },
    {
      id: 10,
      name: "Set Transfer Limit",
      icon: <PasswordIcon className="h-7 w-7" />,
      color: "#FFD5D5",
      desc: "Manage customer transfer limits of different services.",
      onClick: () =>
        openModal({
          view: <p>gg</p>,
        }),
    },
    {
      id: 11,
      name: "Access Control",
      icon: <PasswordIcon className="h-7 w-7" />,
      color: "#FFCCF4",
      desc: "Manage which services customers can access.",
      onClick: () =>
        openModal({
          view: <p>gg</p>,
        }),
    },
    {
      id: 14,
      name: "Disable User",
      icon: <PasswordIcon className="h-7 w-7" />,
      color: "#FFCCF4",
      desc: "Manage which services customers can access.",
      onClick: () =>
        openModal({
          view: <p>gg</p>,
        }),
    },
    {
        id: 15,
        name: "Enable User",
        icon: <PasswordIcon className="h-7 w-7" />,
        color: "#FFCCF4",
        desc: "Manage which services customers can access.",
        onClick: () =>
          openModal({
            view: <p>gg</p>,
          }),
      },
  ];
  return (
    <div className="flex w-full flex-col items-start space-y-2 p-3 px-5 pt-5 md:px-6">
      <div className="pb-2">
        <Title as="h6">Action Menus</Title>
        <Text className="text-sm text-black/60">
          Select action from the listed action menus based on the action you
          want to do.
        </Text>
      </div>
      <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
        {menus?.map((menu) => {
          if (menu.href) {
            return (
              <Link
                key={menu.id}
                href={menu.href}
                className="h-full flex-grow rounded-2xl bg-white p-2"
              >
                <div
                  style={{ backgroundColor: menu.color }}
                  className="flex h-full flex-grow flex-col items-center justify-center space-y-2 rounded-xl p-5 py-5"
                >
                  <div className="flex items-center justify-center rounded-full bg-white p-3">
                    {menu.icon}
                  </div>
                  <div>
                    <Title as="h5" className="text-center text-black">
                      {menu.name}
                    </Title>
                    <Text
                      as="p"
                      className="max-w-[290px] text-center text-xs text-black/70"
                    >
                      {menu.desc}
                    </Text>
                  </div>
                </div>
              </Link>
            );
          } else {
            return (
              <button
                key={menu.id}
                onClick={menu.onClick!}
                className="h-full flex-grow rounded-2xl bg-white p-2"
              >
                <div
                  style={{ backgroundColor: menu.color }}
                  className="flex flex-col items-center justify-center space-y-2 rounded-xl p-5 py-5 h-full"
                >
                  <div className="flex items-center justify-center rounded-full bg-white p-3">
                    {menu.icon}
                  </div>
                  <div>
                    <Title as="h5" className="text-center text-black">
                      {menu.name}
                    </Title>
                    <Text
                      as="p"
                      className="max-w-[290px] text-center text-xs text-black/70"
                    >
                      {menu.desc}
                    </Text>
                  </div>
                </div>
              </button>
            );
          }
        })}
      </div>
    </div>
  );
};

export default ActionMenus;
