import { create } from "zustand";

export interface CustomerState {
  customerInfo: Customer | null;
  setCustomerInfo: (arg: Customer) => void;
}

export const useCustomerStore = create<CustomerState>((set) => ({
  customerInfo: null,
  setCustomerInfo: (customerInfo) => set({ customerInfo: customerInfo }),
}));

export default useCustomerStore;
