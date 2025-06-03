import { Tooltip } from "@/components/ui/tooltip";
import { useNavStore } from "@/store/nav-store";
import { Text } from "@yegna-systems/ui/typography";
import { useRouter } from "nextjs-toploader/app";
import React from "react";

const SubMenu = ({
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
    className={`group w-11/12 flex items-center ${drawerOpen ? "" : "justify-center"} cursor-pointer font-medium rounded-lg mr-1 transition-all duration-300 ease-in-out`}
    style={{ height: drawerOpen ? "auto" : "50px" }}
  >
    {(hovered || active) && (
      <div className={`w-1 h-6 -ml-1 bg-primary rounded-full`} />
    )}
    {drawerOpen ? (
      <Text
        className={`text-[15px] ml-4 my-1 font-outfit text-inherit transition-colors duration-300 ease-in line-clamp-1 ${
          active || hovered ? "text-primary font-medium" : "text-primary"
        }`}
      >
        {item.title}
      </Text>
    ) : null}
  </div>
);

const SubMenuItem = ({ item }: { item: menuItem }) => {
  const { drawerOpen, expanded, active_menu, onExpand, onSetActiveMenu } =
    useNavStore();
  const router = useRouter();
  const [hoveredId, setHoveredId] = React.useState<string | null>(null);

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
          <SubMenu
            item={item}
            active={item.id === active_menu}
            onPress={() => handleMenuClick(item.id, item?.path)}
            hovered={isHovered}
            drawerOpen={drawerOpen}
          />
        </div>
      </Tooltip>
    </>
  );
};

export default SubMenuItem;
