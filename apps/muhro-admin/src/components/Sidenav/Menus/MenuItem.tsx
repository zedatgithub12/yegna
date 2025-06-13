"use client";

import Image from "next/image";
import React from "react";
import chevronRight from "@public/icons/arrow-right-01.png";
import { useNavStore } from "@/store/nav-store";
import { useRouter } from "nextjs-toploader/app";

import SvgWrapper from "@/components/SvgWrapper";
import { Text } from "@/components/ui/typography";
import { Tooltip } from "@/components/ui/tooltip";

const CollapsableMenu = ({
  item,
  expanded,
  onPress,
  hovered,
  drawerOpen,
}: {
  item: menuItem;
  expanded: boolean;
  onPress: () => void;
  hovered: boolean;
  drawerOpen: boolean;
}) => (
  <div className="w-11/12">
    <div
      className={`group flex items-center justify-between gap-4 p-2 pl-3 cursor-pointer font-medium rounded-lg mx-1
        ${expanded || hovered ? "bg-primary text-secondary]" : ""}
      `}
      onClick={onPress}
    >
      <div className="flex items-center gap-4">
        {item.icon &&
          React.cloneElement(
            item.icon as React.ReactElement<React.SVGProps<SVGSVGElement>>,
            {
              color: expanded || hovered ? "#D7F400" : "#656565",
              className: "w-5 h-5",
            }
          )}

        {drawerOpen ? (
          <Text
            className="text-[15px] font-outfit text-inherit line-clamp-1"
            style={{ color: expanded || hovered ? "#D7F400" : "" }}
          >
            {item.title}
          </Text>
        ) : null}
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

    {expanded && (
      <div className="ml-2">
        {item.children?.map((child, index) => (
          <MenuItem key={index} item={child} />
        ))}
      </div>
    )}
  </div>
);

const UncollapsableMenu = ({
  item,
  active,
  onPress,
  hovered,
  drawerOpen,
}: {
  item: menuItem;
  active: boolean;
  onPress: () => void;
  hovered: boolean;
  drawerOpen: boolean;
}) => (
  <div
    onClick={onPress}
    className={`group w-11/12 flex items-center ${drawerOpen ? "pl-4" : "justify-center"} gap-4 p-2  cursor-pointer font-medium rounded-lg mx-1
      ${active || hovered ? "bg-primary text-secondary]" : ""}
    `}
  >
    {item.icon &&
      React.cloneElement(
        item.icon as React.ReactElement<React.SVGProps<SVGSVGElement>>,
        {
          color: active || hovered ? "#D7F400" : "#656565",
          className: "w-5 h-5",
        }
      )}

    {drawerOpen ? (
      <Text
        className="text-[15px] font-outfit text-inherit transition-colors duration-300 ease-in line-clamp-1"
        style={{ color: active || hovered ? "#D7F400" : "" }}
      >
        {item.title}
      </Text>
    ) : null}
  </div>
);

const MenuItem = ({ item }: { item: menuItem }) => {
  const { drawerOpen, expanded, active_menu, onExpand, onSetActiveMenu } =
    useNavStore();
  const router = useRouter();
  const [hoveredId, setHoveredId] = React.useState<string | null>(null);

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

  const isHovered = hoveredId === item.id;

  return (
    <>
      {item.collapsable ? (
        <Tooltip
          placement="right-start"
          animation="fadeIn"
          content={item.title}
          className={`${drawerOpen ? "hidden" : "flex"}`}
        >
          <div
            className="flex items-start justify-between w-fit pr-1 my-1"
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div
              className={`min-w-1.5 max-w-1/12 h-12 ${
                item.id === expanded ? "bg-primary" : "bg-white"
              } rounded-tr-md rounded-br-md`}
            />

            <CollapsableMenu
              item={item}
              expanded={item.id === expanded}
              onPress={() => handleCollapsableMenu(item.id)}
              hovered={isHovered}
              drawerOpen={drawerOpen}
            />
          </div>
        </Tooltip>
      ) : (
        <Tooltip
          placement="right-start"
          animation="fadeIn"
          content={item.title}
          className={`${drawerOpen ? "hidden" : "flex"}`}
        >
          <div
            className="flex items-start justify-between w-full pr-1 my-1"
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div
              className={`min-w-1.5 max-w-1/12 h-9 ${
                item.id === active_menu ? "bg-primary" : "bg-white"
              } rounded-tr-md rounded-br-md`}
            />
            <UncollapsableMenu
              item={item}
              active={item.id === active_menu}
              onPress={() => handleMenuClick(item.id, item?.path)}
              hovered={isHovered}
              drawerOpen={drawerOpen}
            />
          </div>
        </Tooltip>
      )}
    </>
  );
};

export default MenuItem;
