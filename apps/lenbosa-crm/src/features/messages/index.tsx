"use client";

import React from "react";
import PageWrapper from "@/components/PagesWrapper";
import { queryKeys } from "@/lib/api/query-keys";
import { useFetchData } from "@/lib/api/use-fetch-data";
import MessageSideNav from "./components/MessageSideNav";

const Messages = () => {
  const messagesPayload = useFetchData(
    [queryKeys.messages],
    `${queryKeys.messages}`
  );
  const messagesData = messagesPayload?.data?.data?.data;
  console.log(messagesData);
  return (
    <PageWrapper
      isLoading={messagesPayload.isFetching}
      title="Message Broadcasting"
      back={false}
      search={true}
      isError={messagesPayload.isError}
      breadcrumb={true}
    >
      <MessageSideNav />
    </PageWrapper>
  );
};

export default Messages;
