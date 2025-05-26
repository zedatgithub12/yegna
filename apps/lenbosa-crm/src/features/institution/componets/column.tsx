"use client";

import HeaderCell from "@/components/DataTable/header-cell";
import { formatDate } from "@/utils/lib/format-date-time";
import { Avatar } from "@yegna-systems/ui/avatar";
import { Button } from "@yegna-systems/ui/button";
import { Text } from "@yegna-systems/ui/typography";
import { Eye } from "lucide-react";

export const GetColumns = () => {
  return [
    {
      title: (
        <HeaderCell title="Institution Name" className="whitespace-nowrap" />
      ),
      dataIndex: "name",
      key: "name",
      width: 150,
      render: (name: string, record: { avatar: string }) => (
        <div className="flex items-center">
          <Avatar
            src={record.avatar}
            className="w-8 h-8 rounded-full"
            name={name}
          />
          <div className="ml-2">
            <Text className="font-semibold text-[15px] text-gray-900">
              {name}
            </Text>
            {/* <Text className="font-medium text-gray-400 text-xs">
              {record.type}
            </Text> */}
          </div>
        </div>
      ),
    },
    {
      title: <HeaderCell title="Type" className="whitespace-nowrap" />,
      dataIndex: "type",
      key: "type",
      width: 100,
      render: (type: string) => (
        <Text className="font-medium text-gray-900">{type}</Text>
      ),
    },
    {
      title: <HeaderCell title="Email" className="whitespace-nowrap" />,
      dataIndex: "email",
      key: "email",
      width: 150,
      render: (email: string) => (
        <Text className="font-medium text-gray-900">{email}</Text>
      ),
    },
    {
      title: <HeaderCell title="Phone" className="whitespace-nowrap" />,
      dataIndex: "phone",
      key: "phone",
      width: 120,
      render: (phone: string) => (
        <Text className="font-medium text-gray-900">{phone}</Text>
      ),
    },
    {
      title: <HeaderCell title="Location" className="whitespace-nowrap" />,
      dataIndex: "address",
      key: "location",
      width: 150,
      render: (address: { latitude: string; longitude: string }) => (
        <div>
          <Text className="font-medium text-gray-900">
            Lat: {address?.latitude}
          </Text>
          <Text className="font-medium text-gray-900">
            Long: {address?.longitude}
          </Text>
        </div>
      ),
    },
    {
      title: <HeaderCell title="Created At" className="whitespace-nowrap" />,
      dataIndex: "created_at",
      key: "created_at",
      width: 120,
      render: (created_at: string) => (
        <Text className="font-medium text-gray-900">
          {formatDate(new Date(created_at))}
        </Text>
      ),
    },
    {
      title: <HeaderCell title="Actions" className="whitespace-nowrap" />,
      dataIndex: "id",
      key: "actions",
      width: 80,
      render: (id: string) => (
        <Button
          variant="text"
          onClick={() => {
            console.log(id);
          }}
        >
          <Eye className="w-4 h-4" />
        </Button>
      ),
    },
  ];
};
