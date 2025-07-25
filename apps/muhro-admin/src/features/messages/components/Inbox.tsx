import TablePagination from "@/components/DataTable/table-pagination";
import PageWrapper from "@/components/PagesWrapper";
import { queryKeys } from "@/lib/api/query-keys";
import { useFetchData } from "@/lib/api/use-fetch-data";
import { formatDate } from "@/utils/lib/format-date-time";
import { Avatar } from "@yegna-systems/ui/avatar";
import { Checkbox } from "@yegna-systems/ui/checkbox";
import { Input } from "@yegna-systems/ui/input";
import { Text, Title } from "@yegna-systems/ui/typography";
import { Plus } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { FiFilter } from "react-icons/fi";
import useDebounce from "react-use/lib/useDebounce";
import MessageDetailPage from "./DetailMessage";
import { useModal } from "@yegna-systems/lib/hooks/use-modal";
import CreateMessageForm from "./CreateMessage";

const Inbox = () => {
  const { openModal, closeModal } = useModal();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = React.useState("");
  const [selected, setSelected] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedMessage, setSelectedMessage] = useState<MessageProps | null>(
    null
  );

  const messagesPayload = useFetchData(
    [queryKeys.messages, debouncedSearchTerm, currentPage, pageSize],
    `${queryKeys.messages}?search=${debouncedSearchTerm}&page=${currentPage}&page_size=${pageSize}`
  );
  const messagesData: MessageProps[] = messagesPayload?.data?.data?.data;

  useDebounce(
    () => {
      setDebouncedSearchTerm(searchTerm);
    },
    300,
    [searchTerm]
  );

  const handleSelectAll = () => {
    if (selectAll) {
      setSelected([]);
    } else {
      setSelected(messagesData?.map((_, index) => index));
    }
    setSelectAll(!selectAll);
  };

  const handleSelect = (index: number) => {
    setSelected((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCreateMessage = () => {
    openModal({
      view: (
        <CreateMessageForm
          onClose={closeModal}
          onSubmit={() => {
            messagesPayload.refetch();
          }}
        />
      ),
      position: "right",
      rounded: "md",
      customSize: "400px",
    });
  };

  return (
    <PageWrapper
      hasHeader={false}
      isLoading={messagesPayload.isFetching}
      title="Message Broadcasting"
      back={false}
      search={true}
      isError={messagesPayload.isError}
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
              <Input
                placeholder="Search"
                inputClassName="bg-gray-100 rounded-lg"
                className="w-full max-w-sm py-2 rounded-md"
                variant="text"
                value={searchTerm}
                onChange={handleChange}
                clearable
                onClear={() => setSearchTerm("")}
              />
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
          <MessageDetailPage
            message={selectedMessage}
            id={selectedMessage.id}
            goBack={() => setSelectedMessage(null)}
          />
        </div>
      ) : (
        <div className="w-full space-y-3">
          {messagesData?.length === 0 ? (
            <div className="bg-gray-50 flex flex-col items-center justify-center p-4 rounded-xl">
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
              {messagesData?.map((notif, index) => (
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
                total={messagesPayload?.data?.data?.total}
                current={currentPage}
                onChange={(page: number) => setCurrentPage(page)}
              />
            </>
          )}
        </div>
      )}

      {!selectedMessage && (
        <button
          onClick={handleCreateMessage}
          className="absolute bottom-6 right-6 bg-primary hover:bg-primary-dark text-white p-4 rounded-full shadow-lg transition-all"
        >
          <Plus className="text-secondary" />
        </button>
      )}
    </PageWrapper>
  );
};

export default Inbox;
