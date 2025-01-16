import cn from "@coop-super-app/ui/cn";
import { Text, Title } from "@coop-super-app/ui/typography";
import React from "react";
type Props = {
  icon?: React.JSX.Element;
  title: string;
  desc: string;
  className?: string;
  align?: "center" | "left";
};
const ModalHeader = ({
  icon,
  title,
  desc,
  className,
  align = "center",
}: Props) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center w-full pb-5",
        className,
        align === "left" && "items-start justify-start"
      )}
    >
      {icon && (
        <div className="bg-[#EFEEFF] h-14 w-14 flex items-center justify-center rounded-full ">
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
        <Text className="text-gray-400 text-center text-sm px-5">{desc}</Text>
      </div>
    </div>
  );
};

export default ModalHeader;
