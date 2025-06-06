import DeleteIcon from "@/components/icons/delete";
import { queryKeys } from "@/lib/api/query-keys";
import { useFetchData } from "@/lib/api/use-fetch-data";
import DeleteRecord from "@/utils/components/DeleteRecord";
import { formatDate } from "@/utils/lib/format-date-time";
import { useModal } from "@yegna-systems/lib/hooks/use-modal";
import { Avatar } from "@yegna-systems/ui/avatar";
import { Text, Title } from "@yegna-systems/ui/typography";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

type MessageDetailPageProps = {
  message: MessageProps;
  id: string;
  goBack: () => void;
};

const MessageDetailPage = ({ message, id, goBack }: MessageDetailPageProps) => {
  const { openModal, closeModal } = useModal();
  const queryClient = useQueryClient();

  const messagePayload = useFetchData(
    [queryKeys.messages, id],
    `${queryKeys.messages}/${id}`
  );

  const messageDetail: MessageProps = messagePayload?.data?.data;

  const onDeleteInstitution = (id: string) => {
    openModal({
      view: (
        <DeleteRecord
          key="delete message"
          title="Delete Message"
          description="Are you sure you want to delete this message?"
          url={`${queryKeys.messages}/${id}`}
          onRefresh={() =>
            queryClient.invalidateQueries({
              queryKey: [queryKeys.messages],
            })
          }
          closeModal={closeModal}
        />
      ),
      customSize: "400px",
      position: "center",
      onClose: () => closeModal(),
    });
  };

  return (
    <div className="w-full h-full flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <button
          onClick={goBack}
          className="flex items-center gap-2 px-4 py-1.5 border border-gray-300 rounded-full hover:bg-gray-100 transition"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back</span>
        </button>

        <div className="flex items-center gap-3">
          <button className="p-2 rounded-full hover:bg-gray-100 transition border border-gray-300">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 transition border border-gray-300">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Message card */}
      <div className="bg-white p-4 rounded-xl shadow-sm">
        {messageDetail && (
          <div>
            <div className="flex flex-row justify-between items-center gap-3 mb-4">
              <div className="flex  items-center gap-3 mb-4">
                <Avatar
                  name="user"
                  color="primary"
                  src={message.category}
                  className="w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center text-sm font-semibold"
                />
                <div>
                  <Text className="font-semibold text-sm">
                    {message.category}
                  </Text>
                  <Text className="text-xs text-gray-500">
                    {formatDate(new Date(message.created_at))}
                  </Text>
                </div>
              </div>
              <button className="flex items-center gap-2 px-4 py-1.5 ">
                <DeleteIcon
                  onClick={() => {
                    onDeleteInstitution(message.id);
                  }}
                />
              </button>
            </div>

            <Title as="h4" className="font-bold mb-2">
              {message.title}
            </Title>

            <Text className="text-gray-700 whitespace-pre-line">
              {message.message}
            </Text>
            <div className="mt-10">
              <Title className="text-md">Attachments</Title>
              <Text className="text-xs text-gray-500 mt-4">
                {messageDetail?.attachments?.length > 0
                  ? `Attachments: ${messageDetail.attachments.length}`
                  : "No attachments"}
              </Text>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default MessageDetailPage;
