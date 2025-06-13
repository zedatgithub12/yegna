"use client";

import HeaderCell from "@/components/DataTable/header-cell";
import { EthiopianPhoneNumber } from "@/utils/lib/ethiopian-phone";
import { formatDate } from "@/utils/lib/format-date-time";
import { StatusColor } from "@/utils/lib/status-color";
import { Avatar } from "@yegna-systems/ui/avatar";
import { Text } from "@yegna-systems/ui/typography";
import { useRouter } from "nextjs-toploader/app";
import { routes } from "@/lib/config/routes";
import { RiEyeFill } from "react-icons/ri";
import { ActionIcon } from "@yegna-systems/ui/action-icon";

type RowSelectionProps = {
  selectedRowKeys: string[];
  onSelectRow: (id: string, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
  allRowKeys: string[];
  onDeleteUser: (id: string) => void;
};

export const GetColumns = ({}: Partial<RowSelectionProps> = {}) => {
  const router = useRouter();

  const renderUser = (user: UserDataProps) => (
    <div className="flex items-center gap-4">
      <Avatar
        src={user.profile_photo_url}
        className="w-8 h-8 rounded-full"
        name={user.name}
      />
      <div>
        <Text className="font-semibold text-[15px] text-gray-700 ">
          {user.name}
        </Text>
        <Text className="font-normal text-gray-500 text-xs">
          {EthiopianPhoneNumber(user.phone)}
        </Text>
      </div>
    </div>
  );

  return [
    {
      title: <HeaderCell title="Customer" className="whitespace-nowrap" />,
      key: "name",
      width: 140,
      render: renderUser,
    },
    {
      title: (
        <HeaderCell title="Transaction ID" className="whitespace-nowrap" />
      ),
      dataIndex: "transaction_id",
      key: "transaction_id",
      width: 100,
      render: (value: string) => (
        <Text className="font-medium text-gray-700">{value || "-"}</Text>
      ),
    },
    {
      title: <HeaderCell title="Month" className="whitespace-nowrap" />,
      dataIndex: "month",
      key: "month",
      width: 100,
      render: (value: string) => (
        <Text className="font-medium text-gray-700 ">{value || "-"}</Text>
      ),
    },

    {
      title: <HeaderCell title="Total Bill" className="whitespace-nowrap" />,
      dataIndex: "total_bill",
      key: "total_bill",
      width: 100,
      render: (value?: string) => (
        <Text className="font-medium text-gray-700 ms-3">{value || "-"}</Text>
      ),
    },
    {
      title: (
        <HeaderCell title="Payment Status" className="whitespace-nowrap" />
      ),
      dataIndex: "payment_status",
      key: "payment_status",
      width: 100,
      render: (value: string) => (
        <Text
          className="font-normal text-xs text-center px-2 py-1 rounded-full"
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
      title: (
        <HeaderCell title="Payment Channel" className="whitespace-nowrap" />
      ),
      dataIndex: "payment_channel",
      key: "payment_channel",
      width: 100,
      render: (value?: string) => (
        <Text className="font-medium text-gray-700 ms-3">{value || "-"}</Text>
      ),
    },
    {
      title: <HeaderCell title="Payment Date" className="whitespace-nowrap" />,
      dataIndex: "created_at",
      key: "created_at",
      width: 100,
      render: (value: string) => (
        <Text className="font-normal text-gray-700 text-xs ">
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
            onClick={() => router.push(routes.transactions.invoice(value))}
          >
            <RiEyeFill className="text-primary" size={16} />
          </ActionIcon>
        </div>
      ),
    },
  ];
};
