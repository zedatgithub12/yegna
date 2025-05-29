import { Button } from "@yegna-systems/ui/button";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-2">
      <h3>Page Not Found!</h3>
      <p>We {"can't"} find the page you are looking for</p>
      <Link href={"/"} className="">
        <Button color="primary">Back To Home</Button>
      </Link>
    </div>
  );
};

export default NotFound;
