import PageWrapper from "@/components/PagesWrapper";
import { Text } from "@yegna-systems/ui/typography";
import React from "react";

const Permissions = () => {
  return (
    <PageWrapper
      isLoading={false}
      title="Role Permissions"
      back={true}
      search={false}
      breadcrumb={true}
    >
      <Text>Role Permissions</Text>
    </PageWrapper>
  );
};

export default Permissions;
