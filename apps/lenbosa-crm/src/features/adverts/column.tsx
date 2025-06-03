"use client";

import HeaderCell from "@/components/DataTable/header-cell";
import { EthiopianPhoneNumber } from "@/utils/lib/ethiopian-phone";
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
};

export const GetColumns = ({ onDeleteUser }: advertsProps) => {
  const router = useRouter();

  return [
    {
      title: <HeaderCell title="User Name" className="whitespace-nowrap" />,
      key: "name",
      width: 200,
      render: (value: string) => {
        <Text className="font-semibold text-[15px] text-gray-900 ">
          {value}
        </Text>;
      },
    },
    {
      title: <HeaderCell title="Description" className="whitespace-nowrap" />,
      dataIndex: "description",
      key: "description",
      width: 160,
      render: (value: string) => (
        <Text className="font-medium text-gray-900">
          {EthiopianPhoneNumber(value)}
        </Text>
      ),
    },
    {
      title: <HeaderCell title="Start Date" className="whitespace-nowrap" />,
      dataIndex: "start_date",
      key: "start_date",
      width: 100,
      render: (value: string) => (
        <Text className="font-medium text-gray-900 ">
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
        <Text className="font-medium text-gray-900 ">
          {value ? formatDate(new Date(value)) : "-"}
        </Text>
      ),
    },

    {
      title: <HeaderCell title="Status" className="whitespace-nowrap" />,
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (value: string) => (
        <Text
          className="font-normal text-center px-2 py-1 rounded-full"
          style={{
            color: StatusColor(value)?.color,
            backgroundColor: StatusColor(value)?.background,
          }}
        >
          {value}
        </Text>
      ),
    },
    {
      title: <HeaderCell title="Registered at" className="whitespace-nowrap" />,
      dataIndex: "created_at",
      key: "created_at",
      width: 100,
      render: (value: string) => (
        <Text className="font-medium text-gray-900 ">
          {value ? formatDate(new Date(value)) : "-"}
        </Text>
      ),
    },
    {
      title: <HeaderCell title="Action" className="whitespace-nowrap" />,
      dataIndex: "id",
      key: "id",
      width: 60,
      render: (value: string) => (
        <div className="flex items-center">
          <ActionIcon
            variant="text"
            onClick={() => router.push(routes.user.details(value))}
          >
            <RiEyeFill className="text-primary" size={16} />
          </ActionIcon>

          <ActionIcon
            variant="text"
            onClick={() => router.push(routes.user.edit(value))}
          >
            <EditPencil className="w-4 h-4" />
          </ActionIcon>

          <ActionIcon variant="text" onClick={() => onDeleteUser(value)}>
            <TrashIcon className="w-4 h-4 text-primary" color="#0B4650" />
          </ActionIcon>
        </div>
      ),
    },
  ];
};
