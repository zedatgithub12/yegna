import { create } from "zustand";

export interface UserFilerProps {
  role: string | null;
  setRole: (arg: string) => void;
  gender: string;
  setGender: (arg: string) => void;
  status: string;
  setStatus: (arg: string) => void;
}

export const useUserFilterStore = create<UserFilerProps>((set) => ({
  status: "",
  role: "",
  gender: "",

  setRole: (arg: string) => set({ status: arg }),
  setStatus: (arg: string) => set({ status: arg }),
  setGender: (arg: string) => set({ gender: arg }),
}));

export default useUserFilterStore;
