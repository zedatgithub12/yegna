import TempIcon from "@/components/icons/templet";
import PageWrapper from "@/components/PagesWrapper";
import SvgWrapper from "@/components/SvgWrapper";
import { queryKeys } from "@/lib/api/query-keys";
import { useFetchData } from "@/lib/api/use-fetch-data";
import { formatDate } from "@/utils/lib/format-date-time";
import { Button } from "@yegna-systems/ui/button";
import { Title, Text } from "@yegna-systems/ui/typography";
import CreateMessageTemplate from "./CreateMessageTemplate";
import { useModal } from "@yegna-systems/lib/hooks/use-modal";

const Templates = () => {
  const { openModal, closeModal } = useModal();

  const templatesPayload = useFetchData(
    [queryKeys.get_all_message_templates],
    `${queryKeys.get_all_message_templates}`
  );
  const templatesData: MessageTemplates[] = templatesPayload?.data?.data || [];

  const handleCreateMessage = () => {
    openModal({
      view: (
        <CreateMessageTemplate
          onClose={closeModal}
          onSubmit={() => {
            templatesPayload.refetch();
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
      isLoading={templatesPayload.isFetching}
      title="Message Broadcasting"
      back={false}
      search={false}
      isError={templatesPayload.isError}
      breadcrumb={true}
      notfound={false}
      fallback={{
        status_code: "500",
        title: "Server Error getting templates",
        message: "Opps! There's Error getting templates",
      }}
      staticComponent={
        <div className="bg-white p-3 rounded-xl flex items-center justify-between w-full mb-4">
          <Title className="text-lg font-semibold">Message Templates</Title>
          <Button
            variant="solid"
            color="primary"
            className="hover:bg-primary-dark text-secondary font-medium cursor-pointer gap-1 rounded-lg py-5"
            onClick={handleCreateMessage}
          >
            <SvgWrapper
              src="/icons/add-01.svg"
              width="22px"
              height="22px"
              color="#bbf451"
            />
            Add Template
          </Button>
        </div>
      }
      childrenClassnames="w-full"
    >
      <div className="space-y-4">
        {templatesData.map((template) => (
          <div
            key={template.id}
            className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 w-full"
          >
            <div className="flex justify-between items-start gap-5">
              <div className="p-2 bg-primary rounded-lg">
                <TempIcon color="#D7F400" />
              </div>
              <div className="flex-1">
                <div className="flex flex-col space-y-2">
                  <Title as="h3" className="text-lg font-medium">
                    {template.name}
                  </Title>
                  <Text className="text-gray-500 text-sm">
                    {formatDate(new Date(template.created_at))}
                  </Text>
                </div>
                <Text className="text-gray-700 mt-4">{template.body}</Text>
              </div>
              <div className="ml-6">
                <SvgWrapper
                  src="/icons/template-icon.svg"
                  width="24px"
                  height="24px"
                  color="#4b5563"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageWrapper>
  );
};

export default Templates;
