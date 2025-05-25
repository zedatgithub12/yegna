import { create } from "zustand";

interface navProps {
  drawerOpen: boolean;
  expanded: string;
  active_menu: string;
  onExpand: (selected: string) => void;
  onSetActiveMenu: (selected: string) => void;
  onToggleDrawer: () => void;
}
export const useNavStore = create<navProps>((set) => ({
  drawerOpen: false,
  expanded: "",
  active_menu: "",
  onExpand: (selected: string) => set(() => ({ expanded: selected })),
  onSetActiveMenu: (selected: string) => set(() => ({ active_menu: selected })),
  onToggleDrawer: () => set((state) => ({ drawerOpen: !state.drawerOpen })),
}));
