"use client";

import cn from "@yegna-systems/ui/cn";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ChangePassword from "@/features/profile/change-password";
import { Text, Title } from "@yegna-systems/ui/typography";
import { Button } from "@yegna-systems/ui/button";
import { Popover } from "@yegna-systems/ui/popover";
import { Avatar } from "@yegna-systems/ui/avatar";
import { useModal } from "@yegna-systems/lib/hooks/use-modal";
import { useRouter } from "nextjs-toploader/app";

function DropdownMenu() {
  const { openModal } = useModal();
  const { data: session } = useSession();
  const router = useRouter();

  const menuItems = [
    {
      name: "Change Password",
      onClick: () =>
        openModal({
          view: <ChangePassword />,
          position: "center",
          rounded: "md",
          customSize: "440px",
        }),
    },
  ];

  return (
    <div className="w-[280px] text-left rtl:text-right  border-none rounded-xl  z-20">
      <div
        className="flex items-center gap-3 border-b border-gray-100 py-3.5 px-3 cursor-pointer"
        onClick={() => router.push("/account-setting")}
      >
        <Avatar
          name={session?.user?.name ?? ""}
          className={cn("text-secondary")}
          color="primary"
        />
        <div className="">
          <Title as="h6" className="font-semibold capitalize">
            {session?.user?.name}
          </Title>
          <Text className="!text-wrap text-gray-600">
            {session?.user?.email}
          </Text>
        </div>
      </div>

      <div className="grid py-3.5 px-3 font-medium text-gray-700 ">
        {menuItems.map((item) => (
          <span
            onClick={item.onClick}
            key={item.name}
            className="group my-0.5 flex cursor-pointer items-center rounded-md px-2.5 py-2 hover:bg-gray-300 focus:outline-none hover:dark:bg-gray-50/50"
          >
            {item.name}
          </span>
        ))}
      </div>
      <div className="border-t border-gray-100 px-2.5 pb-6 pt-5">
        <Button
          className="h-auto w-full justify-start p-0 px-3 font-medium text-gray-700 outline-none focus-within:text-gray-600 hover:text-gray-900 focus-visible:ring-0 cursor-pointer"
          variant="text"
          onClick={() =>
            signOut({
              callbackUrl: "/auth/signin",
            })
          }
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
}

export default function ProfileMenu({}: { buttonClassName?: string }) {
  const [, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);
  return (
    <Popover
      animation="zoomIn"
      placement="bottom-start"
      size="sm"
      showArrow={false}
    >
      <Popover.Trigger>
        <div className="flex cursor-pointer items-center gap-2">
          <div className="relative inline-flex ">
            <Avatar
              name={session?.user?.name ?? ""}
              className={cn("border-2 border-white text-secondary")}
              color="primary"
              size="md"
            />
          </div>
        </div>
      </Popover.Trigger>
      <Popover.Content className="z-40 border-none bg-white">
        <DropdownMenu />
      </Popover.Content>
    </Popover>
  );
}
