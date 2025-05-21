"use client";

import { routes } from "@/lib/config/routes";
import { Button } from "@yegna-systems/ui/button";
import React from "react";
import { useRouter } from "nextjs-toploader/app";
import SvgWrapper from "@/components/SvgWrapper";
import PageWrapper from "@/components/PagesWrapper";
import { queryKeys } from "@/lib/api/query-keys";
import { useFetchData } from "@/lib/api/use-fetch-data";
import Roles from "../users/roles";

const RolePermissions = () => {
  const router = useRouter();

  const responsePayload = useFetchData(
    [queryKeys.get_roles],
    `${queryKeys.get_roles}`
  );

  const rolesData: rolesProps[] = responsePayload?.data?.data;

  return (
    <div>
      <PageWrapper
        isLoading={responsePayload.isFetching}
        title="Role & Permissions"
        back={false}
        search={true}
        breadcrumb={true}
        hasActionButton
        actionButtons={
          <Button
            variant="solid"
            color="primary"
            className="hover:bg-primary-dark text-secondary font-medium cursor-pointer gap-1 rounded-lg py-5"
            onClick={() => router.push(routes.role_permission.create)}
          >
            <SvgWrapper
              src="/icons/add-01.svg"
              width="22px"
              height="22px"
              color="#bbf451"
            />
            Add Role
          </Button>
        }
      >
        {rolesData && (
          <div className="w-full flex flex-wrap justify-start gap-10 pt-10 pb-2 ">
            {" "}
            <Roles rolesData={rolesData} />
          </div>
        )}
      </PageWrapper>
    </div>
  );
};

export default RolePermissions;
