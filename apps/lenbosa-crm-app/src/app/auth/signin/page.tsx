import LoginPage from "@/features/auth/login";
import React from "react";
import { metaObject } from "@/lib/config/site-seo";
export const metadata = {
  ...metaObject("Sign In"),
};
const page = () => {
  return <LoginPage />;
};

export default page;
