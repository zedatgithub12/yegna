import { create } from "zustand";

export interface UserFilerProps {
  role: string | null;
  setRole: (arg: string) => void;
  gender: string;
  setGender: (arg: string) => void;
  status: string;
  setStatus: (arg: string) => void;
  resetFilter: () => void;
}

export const useUserFilterStore = create<UserFilerProps>((set) => ({
  status: "",
  role: "",
  gender: "",

  setRole: (arg: string) => set({ role: arg }),
  setStatus: (arg: string) => set({ status: arg }),
  setGender: (arg: string) => set({ gender: arg }),
  resetFilter: () => set({ status: "", role: "", gender: "" }),
}));

export default useUserFilterStore;
