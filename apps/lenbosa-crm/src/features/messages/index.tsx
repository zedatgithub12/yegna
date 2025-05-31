"use client";

import React from "react";
import PageWrapper from "@/components/PagesWrapper";
import MessageSideNav from "./components/MessageSideNav";

const Messages = () => {
  return (
    <PageWrapper
      isLoading={false}
      title="Message Broadcasting"
      back={false}
      search={true}
      isError={false}
      breadcrumb={true}
    >
      <MessageSideNav />
    </PageWrapper>
  );
};

export default Messages;
