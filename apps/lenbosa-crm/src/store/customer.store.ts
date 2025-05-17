import { create } from "zustand";

/*
*
* Store for customer
* tempAccountInfo is used for when there is account search and the used to temporary store the account information
* customerInfo is null when the maker action is start from home card since there is no customer information and we will store the customer information like on search customer component

*/
export interface CustomerState {
  customerInfo: Customer | null;
  setCustomerInfo: (arg: Customer) => void;
  tempAccountInfo: Partial<Customer> | null;
  setTempAccountInfo: (arg: Partial<Customer>) => void;
}

export const useCustomerStore = create<CustomerState>((set) => ({
  customerInfo: null,
  tempAccountInfo: null,
  setCustomerInfo: (customerInfo) => set({ customerInfo: customerInfo }),
  setTempAccountInfo: (customerInfo) => set({ tempAccountInfo: customerInfo }),
}));

export default useCustomerStore;
