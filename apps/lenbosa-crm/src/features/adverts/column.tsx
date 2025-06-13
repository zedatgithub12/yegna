"use client";

import HeaderCell from "@/components/DataTable/header-cell";
import { formatDate } from "@/utils/lib/format-date-time";
import { StatusColor } from "@/utils/lib/status-color";
import { Text } from "@yegna-systems/ui/typography";
import { useRouter } from "nextjs-toploader/app";
import { routes } from "@/lib/config/routes";
import { RiEyeFill } from "react-icons/ri";
import { ActionIcon } from "@yegna-systems/ui/action-icon";
import EditPencil from "@/components/icons/edit-pencil";
import TrashIcon from "@/components/icons/trash";

type advertsProps = {
  onDeleteUser: (id: string) => void;
  onViewDetail: (ad: AdvertProps) => void;
};

export const GetColumns = ({ onDeleteUser, onViewDetail }: advertsProps) => {
  const router = useRouter();

  return [
    {
      title: <HeaderCell title="Title" className="whitespace-nowrap" />,
      dataIndex: "name",
      key: "name",
      width: 80,
      render: (value: string) => (
        <Text className="font-medium text-[15px] text-gray-900 ">{value}</Text>
      ),
    },
    {
      title: <HeaderCell title="Description" className="whitespace-nowrap" />,
      dataIndex: "body",
      key: "body",
      width: 100,
      render: (value: string) => (
        <div
          className="text-sm text-gray-400 my-1"
          dangerouslySetInnerHTML={{ __html: value ?? "" }}
        />
      ),
    },
    {
      title: <HeaderCell title="Start Date" className="whitespace-nowrap" />,
      dataIndex: "start_date",
      key: "start_date",
      width: 100,
      render: (value: string) => (
        <Text className="font-normal text-gray-500 text-sm">
          {value ? formatDate(new Date(value)) : "-"}
        </Text>
      ),
    },

    {
      title: <HeaderCell title="End Date" className="whitespace-nowrap" />,
      dataIndex: "end_date",
      key: "end_date",
      width: 100,
      render: (value: string) => (
        <Text className="font-normal text-gray-500 text-sm">
          {value ? formatDate(new Date(value)) : "-"}
        </Text>
      ),
    },

    {
      title: <HeaderCell title="Status" className="whitespace-nowrap" />,
      dataIndex: "is_active",
      key: "is_active",
      width: 100,
      render: (value: string) => (
        <Text
          className="font-normal text-center px-2 py-1 rounded-full capitalize"
          style={{
            color: StatusColor(value ? "active" : "inactive")?.color,
            backgroundColor: StatusColor(value ? "active" : "inactive")
              ?.background,
          }}
        >
          {value ? "active" : "inactive"}
        </Text>
      ),
    },

    {
      title: <HeaderCell title="Action" className="whitespace-nowrap" />,

      key: "id",
      width: 40,
      render: (row: {
        id: string;
        name: string;
        body: string;
        image: { url: string };
        start_date: string;
        end_date: string;
        is_active: boolean;
      }) => (
        <div className="flex items-center">
          <ActionIcon variant="text" onClick={() => onViewDetail(row)}>
            <RiEyeFill className="text-primary" size={16} />
          </ActionIcon>

          <ActionIcon
            variant="text"
            onClick={() => router.push(routes.adverts.edit(row.id))}
          >
            <EditPencil className="w-4 h-4 text-primary" color="#0B4650" />
          </ActionIcon>

          <ActionIcon variant="text" onClick={() => onDeleteUser(row.id)}>
            <TrashIcon className="w-4 h-4 text-primary" color="#0B4650" />
          </ActionIcon>
        </div>
      ),
    },
  ];
};
