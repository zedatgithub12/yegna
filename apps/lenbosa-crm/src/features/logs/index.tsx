"use client";
import PageWrapper from "@/components/PagesWrapper";

import { queryKeys } from "@/lib/api/query-keys";
import { useFetchData } from "@/lib/api/use-fetch-data";

import { Button } from "@yegna-systems/ui/button";
import { ListFilter } from "lucide-react";

import React from "react";

const Logs = () => {
  const responsePayload = useFetchData(
    [queryKeys.get_logs],
    `${queryKeys.get_logs}?page=$&limit=&search=`
  );

  const logsData: getLogsProps[] = responsePayload?.data?.data?.data;

  return (
    <div>
      <PageWrapper
        isLoading={responsePayload.isFetching}
        title="Logs Management"
        back={false}
        search={true}
        breadcrumb={true}
        hasActionButton
        actionButtons={
          <Button
            className="flex items-center gap-2 w-full rounded-2xl text-black bg-gray-100 hover:bg-gray-200 border border-gray-200"
            // onClick={() =>
            //   openDrawer({
            //     view: <InstitutionFilter categories={categoriesData} />,
            //     placement: "right",
            //     customSize: 10,
            //   })
            // }
          >
            <ListFilter className="text-gray-600" size={18} />
            Filter
          </Button>
        }
      >
        {/* <LogsTable /> */}
        <div className="mt-4">
          {logsData?.length ? (
            <ul>
              {logsData.map((log) => (
                <li key={log.id}>{log.event}</li>
              ))}
            </ul>
          ) : (
            <p>No logs found</p>
          )}
        </div>
      </PageWrapper>
    </div>
  );
};

export default Logs;
