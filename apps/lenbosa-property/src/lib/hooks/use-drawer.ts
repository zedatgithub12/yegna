import { atom, useAtomValue, useSetAtom } from "jotai";

export type DrawerPlacements = "left" | "right" | "top" | "bottom";

type DrawerTypes = {
  view: React.ReactNode;
  isOpen: boolean;
  placement?: DrawerPlacements;
  customSize?: number;
};

const drawerAtom = atom<DrawerTypes>({
  isOpen: false,
  view: null,
  placement: "right",
  customSize: 320,
});

export function useDrawer() {
  const state = useAtomValue(drawerAtom);
  const setState = useSetAtom(drawerAtom);

  const openDrawer = ({
    view,
    placement,
    customSize,
  }: {
    view: React.ReactNode;
    placement: DrawerPlacements;
    customSize?: number;
  }) => {
    setState({
      ...state,
      isOpen: true,
      view,
      placement,
      customSize,
    });
  };

  const closeDrawer = () => {
    setState({
      ...state,
      isOpen: false,
    });
  };

  return {
    ...state,
    openDrawer,
    closeDrawer,
  };
}
