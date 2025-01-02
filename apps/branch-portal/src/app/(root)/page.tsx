"use client";
import { Button } from "@coop-super-app/ui/button";
import React from "react";
import { toast } from "sonner";
const page = () => {
  return (
    <div className="p-10">
      <Button
        onClick={() =>
          toast.success("heelo", { className: "bg-red-dark text-white" })
        }
      >
        Login
      </Button>
    </div>
  );
};

export default page;
