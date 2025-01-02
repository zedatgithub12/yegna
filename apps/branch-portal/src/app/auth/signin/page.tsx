import LoginPage from "@/features/auth/login";
import { metaObject } from "@/lib/config/site-seo";
import React from "react";
export const metadata = {
  ...metaObject("Sign In"),
};
const page = () => {
  return <LoginPage />;
};

export default page;
