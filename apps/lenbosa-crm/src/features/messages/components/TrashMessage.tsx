import PageWrapper from "@/components/PagesWrapper";
import { queryKeys } from "@/lib/api/query-keys";
import { useFetchData } from "@/lib/api/use-fetch-data";
import { Checkbox } from "@yegna-systems/ui/checkbox";

import React from "react";
import { FiFilter } from "react-icons/fi";
import Image from "next/image";

import { Text, Title } from "@yegna-systems/ui/typography";
import { Avatar } from "@yegna-systems/ui/avatar";
import TablePagination from "@/components/DataTable/table-pagination";
import { formatDate } from "@/utils/lib/format-date-time";
import TrashDetailMessage from "./TrashDetailMessage";

const TrashMessage = () => {
  const [selectedMessage, setSelectedMessage] =
    React.useState<MessageProps | null>(null);
  const [selectAll, setSelectAll] = React.useState(false);
  const [selected, setSelected] = React.useState<number[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelected(Array.from({ length: TrashMessageData.length }, (_, i) => i));
    } else {
      setSelected([]);
    }
  };

  const handleSelect = (index: number) => {
    if (selected.includes(index)) {
      setSelected(selected.filter((item) => item !== index));
    } else {
      setSelected([...selected, index]);
    }
  };

  const TrashMessagePayload = useFetchData(
    [queryKeys.get_all_trash_message_broadcasts],
    `${queryKeys.get_all_trash_message_broadcasts}`
  );
  const TrashMessageData: MessageProps[] =
    TrashMessagePayload?.data?.data?.data || [];

  return (
    <PageWrapper
      hasHeader={false}
      isLoading={TrashMessagePayload.isFetching}
      title="Message Broadcasting"
      back={false}
      search={true}
      isError={TrashMessagePayload.isError}
      breadcrumb={true}
      notfound={false}
      fallback={{
        status_code: "500",
        title: "Server Error getting messages",
        message: "Opps! There's Error getting messages",
      }}
      staticComponent={
        !selectedMessage && (
          <div className="w-full bg-gray-50 p-3 rounded-xl mb-3 ">
            <div className="flex justify-between items-start mb-4 w-full">
              <Title className="text-lg font-semibold">Trash Messages</Title>
              <button className="ml-4 flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-100 text-gray-700">
                <FiFilter />
                Filter
              </button>
            </div>

            <div className="flex items-center mb-2">
              <Checkbox
                size="sm"
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
                className="mr-2"
              />
              <label>Select All</label>
            </div>
          </div>
        )
      }
      childrenClassnames="w-full"
    >
      {selectedMessage ? (
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <TrashDetailMessage
            message={selectedMessage}
            goBack={() => setSelectedMessage(null)}
          />
        </div>
      ) : (
        <div className="w-full space-y-3">
          {TrashMessageData?.length === 0 ? (
            <div className="bg-gray-50 flex flex-col items-center justify-center">
              <div className="w-56 h-56 relative mb-4">
                <Image
                  src="/images/no-message.gif"
                  alt="Mailbox"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-center text-lg font-semibold text-primary">
                Opps! There&apos;s No Message Yet
              </p>
            </div>
          ) : (
            <>
              {TrashMessageData?.map((notif, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedMessage(notif)}
                  className="flex items-start justify-between p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        size="sm"
                        type="checkbox"
                        checked={selected.includes(index)}
                        onChange={() => handleSelect(index)}
                        className="mt-1 rounded-xl"
                      />
                      <Avatar
                        name="user"
                        color="primary"
                        src={notif.category}
                        className="w-10 h-10 rounded-full bg-gray-800 text-white text-sm font-semibold"
                      />
                      <Text className="font-semibold text-sm mt-1">
                        {notif.category}
                      </Text>
                    </div>

                    <div>
                      <Title as="h6" className="font-medium">
                        {notif.title}
                      </Title>
                      <Text className="text-sm text-gray-400 mt-1 font-normal line-clamp-2">
                        {notif.message}
                      </Text>
                    </div>
                  </div>

                  <div className="text-xs whitespace-nowrap">
                    <Text className="text-gray-500">
                      {formatDate(new Date(notif.created_at))}
                    </Text>
                  </div>
                </div>
              ))}

              <TablePagination
                pageSize={pageSize}
                setPageSize={setPageSize}
                total={TrashMessagePayload?.data?.data?.total}
                current={currentPage}
                onChange={(page: number) => setCurrentPage(page)}
              />
            </>
          )}
        </div>
      )}
    </PageWrapper>
  );
};

export default TrashMessage;
