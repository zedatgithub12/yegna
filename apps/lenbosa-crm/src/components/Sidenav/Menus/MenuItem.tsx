"use client";

import Image from "next/image";
import React from "react";
import chevronRight from "@public/icons/arrow-right-01.png";
import { useNavStore } from "@/store/nav-store";
import { useRouter } from "nextjs-toploader/app";

import SvgWrapper from "@/components/SvgWrapper";
import { Text } from "@/components/ui/typography";

const CollapsableMenu = ({
  item,
  expanded,
  onPress,
}: {
  item: menuItem;
  expanded: boolean;
  onPress: () => void;
}) => (
  <div className="w-11/12">
    <div
      className={`flex items-center justify-between gap-4 p-2 pl-3 cursor-pointer font-medium hover:bg-primary rounded-lg mx-1 hover:text-[#D7F400] ${
        expanded ? "bg-primary text-[#D7F400]" : ""
      }`}
      onClick={onPress}
    >
      <div className="flex items-center gap-4">
        {item?.icon && expanded ? (
          <SvgWrapper
            src={item.icon}
            width="16px"
            height="16px"
            className="text-lime-300 text-inherit"
            color="#D7F400"
          />
        ) : item.icon ? (
          <SvgWrapper
            src={item?.icon}
            width="20px"
            height="20px"
            className="text-inherit"
          />
        ) : null}
        <Text
          className="text-[15px] font-outfit text-inherit"
          style={{ color: expanded ? "#D7F400" : "" }}
        >
          {item?.title}
        </Text>
      </div>

      {expanded ? (
        <SvgWrapper
          src="/assets/icons/arrow-down-01.svg"
          width="20px"
          height="20px"
          className="text-lime-300"
          color="#bbf451"
        />
      ) : (
        <Image src={chevronRight} alt="icon" width={16} height={16} />
      )}
    </div>

    {expanded ? (
      <div className="ml-2">
        {item.children?.map((item, index) => (
          <MenuItem key={index} item={item} />
        ))}
      </div>
    ) : null}
  </div>
);

const UncollapsableMenu = ({
  item,
  active,
  onPress,
}: {
  item: menuItem;
  active: boolean;
  onPress: () => void;
}) => (
  <div
    onClick={onPress}
    className={`w-11/12 flex items-center gap-4 p-2 pl-5  cursor-pointer font-medium hover:bg-primary hover:text-[#D7F400]  rounded-lg mx-1 ${
      active ? "bg-primary text-secondary" : ""
    }`}
  >
    {item?.icon && active ? (
      <SvgWrapper
        src={item.icon}
        width="20px"
        height="20px"
        className="text-lime-300 hover:text-inherit"
        color="#bbf451"
      />
    ) : item.icon ? (
      <SvgWrapper
        src={item?.icon}
        width="20px"
        height="20px"
        className="text-inherit"
      />
    ) : null}
    <Text
      className="text-[15px] font-outfit text-inherit"
      style={{ color: active ? "#D7F400" : "" }}
    >
      {item?.title}
    </Text>
  </div>
);

const MenuItem = ({ item }: { item: menuItem }) => {
  const { expanded, active_menu, onExpand, onSetActiveMenu } = useNavStore();
  const router = useRouter();

  const handleCollapsableMenu = (menuID: string) => {
    if (menuID === expanded) {
      onExpand("");
    } else {
      onExpand(menuID);
      onSetActiveMenu(menuID);
    }
  };

  const handleMenuClick = async (itemID: string, path: string) => {
    const firstTask = async () => {
      onSetActiveMenu(itemID);
      const isChildren = itemID?.split("-")[0];
      if (isChildren !== expanded) {
        onExpand("");
      }
    };

    const secondTask = async () => {
      router.push(path);
    };

    await firstTask();
    await secondTask();
  };

  return (
    <>
      {item.collapsable ? (
        <div className="flex items-start justify-between  w-full pr-1 my-1">
          {item.id === expanded ? (
            <div className="min-w-1.5 max-w-1/12 h-9 bg-primary  rounded-tr-md rounded-br-md" />
          ) : (
            <div className="min-w-1.5 max-w-1/12 h-9 bg-white  rounded-tr-md rounded-br-md" />
          )}
          <CollapsableMenu
            item={item}
            expanded={item.id === expanded}
            onPress={() => handleCollapsableMenu(item.id)}
          />
        </div>
      ) : (
        <div className="flex items-start justify-between w-full pr-1 my-1">
          {item.id === active_menu ? (
            <div className="min-w-1.5 max-w-1/12 h-9 bg-primary  rounded-tr-md rounded-br-md" />
          ) : (
            <div className="min-w-1.5 max-w-1/12 h-9 bg-white  rounded-tr-md rounded-br-md" />
          )}
          <UncollapsableMenu
            item={item}
            active={item.id === active_menu}
            onPress={() => handleMenuClick(item.id, item?.path)}
          />
        </div>
      )}
    </>
  );
};

export default MenuItem;
