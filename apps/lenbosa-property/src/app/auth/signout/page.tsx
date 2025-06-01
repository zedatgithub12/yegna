import { routes } from "@/lib/config/routes";
import { Button } from "@yegna-systems/ui/button";
import Link from "next/link";
import React from "react";

const SignOut = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-2">
      <h3>Session Expired!</h3>
      <p>Your session is expired, please login again to access the portal! </p>
      <Link href={routes.signIn} className="">
        <Button color="primary">Sign Out</Button>
      </Link>
    </div>
  );
};

export default SignOut;
