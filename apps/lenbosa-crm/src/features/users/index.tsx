"use client";

import { routes } from "@/lib/config/routes";
import { Button } from "@yegna-systems/ui/button";
import React from "react";
import { useRouter } from "nextjs-toploader/app";
import SvgWrapper from "@/components/SvgWrapper";
import PageWrapper from "@/components/PagesWrapper";
import Roles from "./roles";
import { queryKeys } from "@/lib/api/query-keys";
import { useFetchData } from "@/lib/api/use-fetch-data";

const Users = () => {
  const router = useRouter();

  const responsePayload = useFetchData(
    [queryKeys.get_roles],
    `${queryKeys.get_roles}`
  );

  const rolesData: rolesProps[] = responsePayload?.data?.data;

  return (
    <div>
      <PageWrapper
        isLoading={false}
        title="User Management"
        back={false}
        search={true}
        breadcrumb={true}
        hasActionButton
        actionButtons={
          <Button
            variant="solid"
            color="primary"
            className="hover:bg-primary-dark text-secondary font-medium cursor-pointer gap-1 rounded-lg py-5"
            onClick={() => router.push(routes.user.create)}
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
      >
        {rolesData && (
          <Roles
            rolesData={rolesData}
            className="w-full flex justify-start gap-6 pt-10 pb-2 overflow-x-scroll scrollbar-hide"
          />
        )}
      </PageWrapper>
    </div>
  );
};

export default Users;
