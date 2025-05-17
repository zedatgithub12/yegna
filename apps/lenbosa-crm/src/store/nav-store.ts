import { create } from "zustand";

interface navProps {
  expanded: string;
  active_menu: string;
  onExpand: (selected: string) => void;
  onSetActiveMenu: (selected: string) => void;
}
export const useNavStore = create<navProps>((set) => ({
  expanded: "",
  active_menu: "",
  onExpand: (selected: string) => set(() => ({ expanded: selected })),
  onSetActiveMenu: (selected: string) => set(() => ({ active_menu: selected })),
}));
