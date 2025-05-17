"use client";

import Header from "@/components/Header";
import { routes } from "@/lib/config/routes";
import { Button } from "@yegna-systems/ui/button";
import React from "react";
import { useRouter } from "nextjs-toploader/app";
import SvgWrapper from "@/components/SvgWrapper";

const Dashboard = () => {
  const router = useRouter();

  return (
    <div>
      <Header
        title="Dashboard"
        back={true}
        search={false}
        breadcrumb={true}
        hasActionButton
        actionButtons={
          <Button
            variant="solid"
            color="primary"
            className="hover:bg-primary-dark text-secondary font-medium cursor-pointer gap-1 rounded-lg py-5"
            onClick={() => router.push(routes.messages.create)}
          >
            <SvgWrapper
              src="/icons/add-01.svg"
              width="22px"
              height="22px"
              color="#bbf451"
            />
            Add New User
          </Button>
        }
      />
      Dashboard
    </div>
  );
};

export default Dashboard;
