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
      title: <HeaderCell title="User Name" className="whitespace-nowrap" />,
      dataIndex: "name",
      key: "name",
      width: 100,
      render: (val: {
        name: string;
        avatar: string;
        phone: string;
        email: string;
      }) => (
        <div className="flex items-center ">
          <Avatar
            src={val.avatar}
            className="w-8 h-8 rounded-full"
            name={val.name}
          />
          <div>
            <Text className="font-semibold text-[15px] text-gray-900 ">
              {val?.name}
            </Text>
            <Text className="font-medium text-gray-400 ">{val?.phone}</Text>
          </div>
        </div>
      ),
    },
    {
      title: <HeaderCell title="Phone Number" className="whitespace-nowrap" />,
      dataIndex: "phone",
      key: "phone",
      width: 100,
      render: (val: { name: string; phone: string; email: string }) => (
        <Text className="font-medium text-gray-900 ">{val?.phone}</Text>
      ),
    },

    {
      title: <HeaderCell title="Email" className="whitespace-nowrap" />,
      dataIndex: "email",
      key: "email",
      width: 100,
      render: (val: { name: string; phone: string; email: string }) => (
        <Text className="font-medium text-gray-900 ">{val?.email}</Text>
      ),
    },

    {
      title: <HeaderCell title="Role" className="whitespace-nowrap" />,
      dataIndex: "role",
      key: "role",
      width: 100,
      render: (val: {
        name: string;
        phone: string;
        email: string;
        role: string[];
      }) => <Text className="font-medium text-gray-900 ">{val?.role[0]}</Text>,
    },

    {
      title: <HeaderCell title="Gender" className="whitespace-nowrap" />,
      dataIndex: "gender",
      key: "gender",
      width: 100,
      render: (value: string) => (
        <Text className="font-medium text-gray-900 ms-3">{value}</Text>
      ),
    },

    {
      title: <HeaderCell title="Status" className="whitespace-nowrap" />,
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (value: string) => (
        <Text className="font-medium text-gray-900 ms-3">{value}</Text>
      ),
    },

    {
      title: <HeaderCell title="Registered at" className="whitespace-nowrap" />,
      dataIndex: "created_at",
      key: "created_at",
      width: 100,
      render: (value: string) => (
        <Text className="font-medium text-gray-900 ">
          {value && formatDate(new Date(value))}
        </Text>
      ),
    },

    {
      title: <HeaderCell title="Action" className="whitespace-nowrap" />,
      dataIndex: "id",
      key: "id",
      width: 60,
      render: (value: string) => (
        <Button
          variant="text"
          onClick={() => {
            console.log(value);
          }}
        >
          <Eye />
        </Button>
      ),
    },
  ];
};
