"use client";

import cn from "@coop-super-app/ui/cn";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ChangePassword from "@/features/profile/change-password";
import { Text, Title } from "@coop-super-app/ui/typography";
import { Button } from "@coop-super-app/ui/button";
import { Popover } from "@coop-super-app/ui/popover";
import { Avatar } from "@coop-super-app/ui/avatar";
import { useModal } from "@coop-super-app/lib/hooks/use-modal";

function DropdownMenu() {
  const { openModal } = useModal();
  const { data: session } = useSession();
  const menuItems = [
    {
      name: "Change Password",
      onClick: () =>
        openModal({
          view: <ChangePassword />,
        }),
    },
  ];

  return (
    <div className="w-[280px] text-left rtl:text-right">
      <div className="flex items-center gap-1 border-b border-gray-300 pb-5 pt-6">
        <Avatar name={session?.user?.name ?? "User"} className={cn("")} />
        <div className="overflow-hidden text-wrap">
          <Title as="h6" className="font-semibold capitalize">
            {/* {session?.user?.user?.firstName +
              " " +
              session?.user?.user?.lastName} */}
          </Title>
          <Text className="!text-wrap text-gray-600">
            {/* {session?.user?.user?.email} */}
          </Text>
        </div>
      </div>
      <div className="grid py-3.5 font-medium text-gray-700">
        {menuItems.map((item) => (
          <span
            onClick={item.onClick}
            key={item.name}
            className="group my-0.5 flex cursor-pointer items-center rounded-md px-2.5 py-2 hover:bg-gray-100 focus:outline-none hover:dark:bg-gray-50/50"
          >
            {item.name}
          </span>
        ))}
      </div>
      <div className="border-t border-gray-300 px-2.5 pb-6 pt-5">
        <Button
          className="h-auto w-full justify-start p-0 font-medium text-gray-700 outline-none focus-within:text-gray-600 hover:text-gray-900 focus-visible:ring-0"
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
  const [isOpen, setIsOpen] = useState(false);
  console.log(isOpen);
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
        <div className="flex cursor-default items-start gap-1">
          <Avatar name={session?.user?.name ?? "User"} className={cn("")} />
          <div className="hidden flex-col items-start lg:flex">
            <Title
              as="h6"
              className={cn(
                "font-semibold capitalize",
                pathname === "/" ? "text-white" : "text-black"
              )}
            >
              {/* {session?.user?.user?.firstName +
                " " +
                session?.user?.user?.lastName} */}
            </Title>
            <Text
              className={cn(
                "hidden text-sm lg:flex",
                pathname === "/" ? "text-white" : "text-black"
              )}
            >
              {/* {session?.user?.user?.email} */}
            </Text>
          </div>
        </div>
      </Popover.Trigger>
      <Popover.Content>
        <DropdownMenu />
      </Popover.Content>
    </Popover>
  );
}
