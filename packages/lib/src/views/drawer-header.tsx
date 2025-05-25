import React from "react";
import { FaTimes } from "react-icons/fa";
import { useDrawer } from "../hooks/use-drawer";
import cn from "@yegna-systems/ui/cn";
import { Title } from "@yegna-systems/ui/typography";
import { ActionIcon } from "@yegna-systems/ui/action-icon";
type Props = {
  title: string;
  className?: string;
};
const DrawerHeader = ({ title, className }: Props) => {
  const { closeDrawer } = useDrawer();
  return (
    <div
      className={cn(
        "flex  items-center justify-between w-full pb-5",
        className
      )}
    >
      <Title as="h6" className=" font-semibold text-center">
        {title}
      </Title>
      <ActionIcon size="sm" variant="text" onClick={closeDrawer}>
        <FaTimes size={18} />
      </ActionIcon>
    </div>
  );
};

export default DrawerHeader;
