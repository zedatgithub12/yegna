"use client";

import React, { useState } from "react";
import PageWrapper from "@/components/PagesWrapper";
import { queryKeys } from "@/lib/api/query-keys";
import { useFetchData } from "@/lib/api/use-fetch-data";
import { GetColumns } from "./column";
import { Text } from "@yegna-systems/ui/typography";
import ControlledTable from "@/components/DataTable/table";

const billing_cycles = [
  { name: "all", color: "#eee" },
  { name: "monthly", color: "#ff00ff" },
  { name: "yearly", color: "#ff0000" },
];

const Subscribers = () => {
  const [cycle, setCycle] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const subscribersPayload = useFetchData(
    [queryKeys.subscribers, currentPage, pageSize, cycle],
    `${queryKeys.subscribers}?page=${currentPage}&limit=${pageSize}&cycle=${cycle}`
  );
  const subscriptionData: SubscriptionPlans[] =
    subscribersPayload?.data?.data?.data;

  return (
    <PageWrapper
      isLoading={subscribersPayload.isFetching}
      title="Subscription Management"
      back={false}
      search={true}
      isError={subscribersPayload.isError}
      breadcrumb={true}
    >
      <div>
        {billing_cycles.map((cycle, index) => (
          <div
            key={index}
            className="flex items-center border border-gray-500"
            onClick={() => setCycle(cycle.name)}
          >
            <div className={`w-4 h-4  rounded-full bg-[${cycle.color}]`} />
            <Text>{cycle.name}</Text>
          </div>
        ))}
      </div>
      <div className="table-wrapper flex-grow">
        <ControlledTable
          variant="modern"
          data={subscriptionData}
          isLoading={subscribersPayload.isFetching}
          rowKey={"id"}
          scroll={{ x: 1000 }}
          columns={GetColumns()}
          striped={false}
          paginatorOptions={{
            pageSize,
            setPageSize,
            total: subscribersPayload?.data?.total,
            current: currentPage,
            onChange: (page: number) => setCurrentPage(page),
          }}
        />
      </div>
    </PageWrapper>
  );
};

export default Subscribers;
