"use client";

import React, { useState } from "react";
import PageWrapper from "@/components/PagesWrapper";
import { queryKeys } from "@/lib/api/query-keys";
import { useFetchData } from "@/lib/api/use-fetch-data";
import { GetColumns } from "./column";
import { Text } from "@yegna-systems/ui/typography";
import ControlledTable from "@/components/DataTable/table";

const billing_cycles = [
  { name: "all", value: "", color: "#eee" },
  { name: "monthly", value: "monthly", color: "#02B516" },
  { name: "yearly", value: "yearly", color: "#ff0000" },
];

const Subscribers = () => {
  const [cycle, setCycle] = useState("");
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
      staticComponent={
        <div className="flex items-center gap-2 my-2">
          {billing_cycles.map((billing_cycle, index) => (
            <div
              key={index}
              className={`${cycle === billing_cycle.value ? "bg-primary" : "bg-white"} flex items-center gap-2 py-1.5 px-4  border-[1.5px] border-white rounded-full cursor-pointer`}
              onClick={() => setCycle(billing_cycle.value)}
            >
              <div
                className={`w-2.5 h-2.5 rounded-full `}
                style={{ backgroundColor: billing_cycle.color }}
              />
              <Text
                className={`${cycle === billing_cycle.value ? "text-white" : ""} capitalize `}
              >
                {billing_cycle.name}
              </Text>
            </div>
          ))}
        </div>
      }
    >
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
