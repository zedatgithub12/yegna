import MerchantsList from "@/features/merchants/merchants-list";
import React from "react";
import { metaObject } from "@/lib/config/site-seo";
export const metadata = {
  ...metaObject("Merchants"),
};
const page = () => {
  return <MerchantsList />;
};

export default page;
