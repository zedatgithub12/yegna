import { useModal } from "@yegna-systems/lib/hooks/use-modal";
import cn from "@yegna-systems/ui/cn";
import { ActionIcon } from "@yegna-systems/ui/action-icon";
import { Text, Title } from "@yegna-systems/ui/typography";
import React from "react";
import { PiXBold } from "react-icons/pi";

type Props = {
  icon?: React.JSX.Element;
  title: string;
  desc?: string;
  className?: string;
  align?: "center" | "left";
  titleClassName?: string;
  /** default variant is used on branch portal with icons and description
   *
   * banking variant is used on banking portal with title and close btns (mostly used in internet banking dashboard)
   */
  variant?: "default" | "banking";
  headerActionChildren?: React.ReactNode;
};
const SideModalHeader = ({
  icon,
  title,
  desc,
  className,
  align = "center",
  titleClassName,
  variant,
  headerActionChildren,
}: Props) => {
  const { closeModal } = useModal();
  if (variant === "banking") {
    return (
      <div
        className={cn(
          "flex items-center justify-between w-full  border-b border-[#fdfdfd] ",
          className
        )}
      >
        <Title as="h4" className={cn("text-center pl-1", titleClassName)}>
          {title}
        </Title>
        <div className="flex items-center gap-2">
          {headerActionChildren}
          <ActionIcon
            size="sm"
            variant="text"
            onClick={closeModal}
            className="bg-white shadow-md shadow-gray-100 rounded-full"
          >
            <PiXBold size={18} stroke="0.5px" />
          </ActionIcon>
        </div>
      </div>
    );
  }
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center w-full pb-5 ",
        className,
        align === "left" && "items-start justify-start"
      )}
    >
      {icon && (
        <div className="bg-[#EFEEFF] h-14 w-14 flex items-center justify-center   rounded-full ">
          {icon}
        </div>
      )}
      <div
        className={cn(
          "flex flex-col items-center justify-center pt-3",
          align === "left" && "items-start justify-start"
        )}
      >
        <Title as="h4" className="text-center">
          {title}
        </Title>
        <Text
          className={cn(
            "text-gray-400  text-sm ",
            align === "left" ? "text-left" : "text-center"
          )}
        >
          {desc}
        </Text>
      </div>
    </div>
  );
};

export default SideModalHeader;
