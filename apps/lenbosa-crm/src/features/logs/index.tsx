"use client";
import React, { useState } from "react";
import Image from "next/image";
import PageWrapper from "@/components/PagesWrapper";
import TablePagination from "@/components/DataTable/table-pagination";

import { queryKeys } from "@/lib/api/query-keys";
import { useFetchData } from "@/lib/api/use-fetch-data";
import { ChevronDown, LockKeyhole } from "lucide-react";
import { formatDateLabel, isSameDay } from "./utils/helpers";
import { Text, Title } from "@yegna-systems/ui/typography";
import { ActionIcon } from "@/components/ui/action-icon";
import { formatDate } from "@/utils/lib/format-date-time";

const Logs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const responsePayload = useFetchData(
    [queryKeys.get_logs],
    `${queryKeys.get_logs}?page=${currentPage}&limit=${pageSize}`
  );

  const logsData: LogItem[] = responsePayload?.data?.data?.data;

  const groupLogsByDate = (logs: LogItem[]) => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const groups: { [key: string]: LogItem[] } = {};

    logs?.forEach((log) => {
      const logDate = new Date(log.created_at);

      let key = formatDateLabel(log.created_at);
      if (isSameDay(logDate, today)) {
        key = "Today";
      } else if (isSameDay(logDate, yesterday)) {
        key = "Yesterday";
      }

      if (!groups[key]) {
        groups[key] = [];
      }

      groups[key]?.push(log);
    });

    return groups;
  };

  const groupedLogs = groupLogsByDate(logsData);

  const sortedDates = Object.keys(groupedLogs).sort((a, b) => {
    if (a === "Today") return -1;
    if (b === "Today") return 1;
    if (a === "Yesterday") return -1;
    if (b === "Yesterday") return 1;
    return new Date(b).getTime() - new Date(a).getTime();
  });

  return (
    <div>
      <PageWrapper
        isLoading={responsePayload.isFetching}
        title="System Logs"
        back={false}
        search={true}
        breadcrumb={true}
      >
        <div className="my-4">
          {logsData?.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {sortedDates.map((dateLabel) => (
                <div
                  key={dateLabel}
                  className="space-y-2 col-span-1 sm:col-span-2 lg:col-span-3"
                >
                  <div className="flex items-center justify-between">
                    <Title
                      as="h3"
                      className="text-xs font-medium text-gray-800 uppercase my-3"
                    >
                      {dateLabel}
                    </Title>

                    <ActionIcon
                      variant="text"
                      size="sm"
                      className="rounded-full"
                    >
                      <ChevronDown size={18} />
                    </ActionIcon>
                  </div>
                  <div className="">
                    {groupedLogs[dateLabel]?.map((log, index) => (
                      <div
                        key={log.id}
                        className="flex items-start justify-between px-1 rounded-lg border border-gray-100"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex flex-col items-center justify-start">
                            <div className="bg-[#FF0000] p-2 rounded-full">
                              <LockKeyhole className="h-4 w-4 text-white" />
                            </div>
                            {(groupedLogs[dateLabel]?.length ?? 0) - 1 !==
                            index ? (
                              <hr className="w-0 h-7  border-[1.3px] border-[#AAAAAA] border-dashed " />
                            ) : null}
                          </div>
                          <Text className="text-sm text-gray-700 font-medium pr-6 mt-1">
                            {log.event}
                          </Text>
                        </div>
                        <div className="text-xs text-gray-600 whitespace-nowrap">
                          {formatDate(new Date(log.created_at))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="col-span-1 sm:col-span-2 lg:col-span-2  rounded-xl p-2"></div>
            </div>
          ) : (
            <div className="bg-gray-50 flex flex-col items-center justify-center p-4 rounded-xl">
              <div className="w-56 h-56 relative">
                <Image
                  src="/images/no-logs.png"
                  alt="no logs"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-center text-lg font-semibold text-primary">
                No Action Log Yet!
              </p>
            </div>
          )}
        </div>

        <TablePagination
          pageSize={pageSize}
          setPageSize={setPageSize}
          total={responsePayload?.data?.data?.total}
          current={currentPage}
          onChange={(page: number) => setCurrentPage(page)}
        />
      </PageWrapper>
    </div>
  );
};

export default Logs;
