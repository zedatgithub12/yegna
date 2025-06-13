import { routes } from "@/lib/config/routes";
import { Button } from "@yegna-systems/ui/button";
import Link from "next/link";
import React from "react";

const SignOut = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-2">
      <h3>Something went wrong!</h3>
      <p>
        sorry we are experiencing some issue while we process your request,
        please try again!{" "}
      </p>
      <Link href={routes.signIn} className="">
        <Button color="primary">Back To SignIn</Button>
      </Link>
    </div>
  );
};

export default SignOut;
