import React from "react";
import { Text, Title } from "@coop-super-app/ui/typography";
import Link from "next/link";
import { useModal } from "@coop-super-app/lib/hooks/use-modal";
import PasswordIcon from "@/components/icons/password";
import UnlinkDevice from "./unlink-device";
import DisableUser from "./disable-user";
import AttachPhoneNumber from "./attach-phone-number";
import EnableUser from "./enable-user";
import DetachPhoneNumber from "./detach-phone-number";
import AddNewAccount from "./add-new-account";
import UnlinkAccountNumber from "./unlink-account-number";
const CustomerActions = () => {
  const { openModal } = useModal();
  const menus = [
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
          view: <AddNewAccount />,
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
          view: <AttachPhoneNumber />,
        }),
    },
    {
      id: 18,
      name: "Detach Phone Number",
      icon: <PasswordIcon className="h-7 w-7" />,
      color: "#C5CAE9",
      desc: "Update the user's mobile app phone number.",
      onClick: () =>
        openModal({
          view: <DetachPhoneNumber />,
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
          view: <UnlinkDevice />,
        }),
    },
    {
      id: 9,
      name: "Unlink Account Number",
      icon: <PasswordIcon className="h-7 w-7" />,
      color: "#CFD8DC",
      desc: "Unlink the customers bank account.",
      onClick: () =>
        openModal({
          view: <UnlinkAccountNumber />,
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
      href: "/",
    },
    {
      id: 14,
      name: "Disable User",
      icon: <PasswordIcon className="h-7 w-7" />,
      color: "#FFCCF4",
      desc: "Manage which services customers can access.",
      onClick: () =>
        openModal({
          view: <DisableUser />,
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
          view: <EnableUser />,
        }),
    },
    {
      id: 17,
      name: "Set Transfer Limit",
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
    <div className="p-3 bg-white my-2">
      {" "}
      <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {menus?.map((menu) => {
          if (menu.href) {
            return (
              <Link
                key={menu.id}
                href={menu.href}
                className="h-full flex-grow hover:scale-[1.03] duration-300 "
              >
                <div
                  style={{ backgroundColor: menu.color }}
                  className="flex w-full flex-col items-start p-3 py-4 rounded-xl border border-white cursor-pointer"
                >
                  <div className="flex items-center flex-nowrap gap-2">
                    <div className="bg-white h-10 w-full max-w-10 text-nowrap flex-nowrap flex items-center justify-center rounded-full">
                      {menu.icon}
                    </div>
                    <div className="flex flex-col items-start">
                      <Title as="h6" className="text-black text-sm text-left">
                        {menu.name}
                      </Title>
                      <Text className="text-black/40 text-xs text-left">
                        {menu.desc}
                      </Text>
                    </div>
                  </div>
                </div>
              </Link>
            );
          } else {
            return (
              <div
                key={menu.id}
                onClick={menu.onClick}
                style={{ backgroundColor: menu.color }}
                className="flex w-full flex-col items-start p-3 py-4 rounded-xl border border-white cursor-pointer hover:scale-[1.03] duration-300 "
              >
                <div className="flex items-center flex-nowrap gap-2">
                  <div className="bg-white h-10 w-full max-w-10 text-nowrap flex-nowrap flex items-center justify-center rounded-full">
                    {menu.icon}
                  </div>
                  <div className="flex flex-col items-start">
                    <Title as="h6" className="text-black text-sm text-left">
                      {menu.name}
                    </Title>
                    <Text className="text-black/40 text-xs text-left">
                      {menu.desc}
                    </Text>
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default CustomerActions;
