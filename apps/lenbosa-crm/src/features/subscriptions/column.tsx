"use client";

import HeaderCell from "@/components/DataTable/header-cell";
import { EthiopianPhoneNumber } from "@/utils/lib/ethiopian-phone";
import { StatusColor } from "@/utils/lib/status-color";
import { Avatar } from "@yegna-systems/ui/avatar";
import { Text } from "@yegna-systems/ui/typography";
// import { useRouter } from "nextjs-toploader/app";
// import { routes } from "@/lib/config/routes";
// import { RiEyeFill } from "react-icons/ri";
// import { ActionIcon } from "@yegna-systems/ui/action-icon";
import PhoneIcon from "@/components/icons/phone";

type RowSelectionProps = {
  selectedRowKeys: string[];
  onSelectRow: (id: string, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
  allRowKeys: string[];
  onDeleteUser: (id: string) => void;
};

export const GetColumns = ({}: Partial<RowSelectionProps> = {}) => {


  const renderUser = (user: UserDataProps) => (
    <div className="flex items-center gap-4">
      <Avatar
        src={user.profile_image}
        className="w-8 h-8 rounded-full"
        name={user.name}
      />
      <div>
        <Text className="font-semibold text-[15px] text-gray-900 ">
          {user.name}
        </Text>
        <Text className="font-medium text-gray-400 ">
          {EthiopianPhoneNumber(user.phone)}
        </Text>
      </div>
    </div>
  );

  return [
    {
      title: <HeaderCell title="Customer Name" className="whitespace-nowrap" />,
      key: "name",
      width: 200,
      render: renderUser,
    },
    {
      title: <HeaderCell title="Phone Number" className="whitespace-nowrap" />,
      dataIndex: "phone",
      key: "phone",
      width: 160,
      render: (value: string) => (
        <div className="flex items-center gap-2">
          <PhoneIcon className="w-5 h-5" />
          <Text className="font-normal text-gray-600">
            {EthiopianPhoneNumber(value)}
          </Text>
        </div>
      ),
    },
    {
      title: <HeaderCell title="Email" className="whitespace-nowrap" />,
      dataIndex: "email",
      key: "email",
      width: 100,
      render: (value: string) => (
        <Text className="font-medium text-gray-900 ">{value}</Text>
      ),
    },
    {
      title: <HeaderCell title="Billing Cycle" className="whitespace-nowrap" />,
      dataIndex: "cycle",
      key: "cycle",
      width: 100,
      render: (value: string) => (
        <Text className="font-semibold text-primary block bg-gray-100 p-1 px-3 rounded-xl text-center w-fit capitalize">
          {value}
        </Text>
      ),
    },
    {
      title: (
        <HeaderCell title="Subscription Plan" className="whitespace-nowrap" />
      ),
      dataIndex: "plan",
      key: "plan",
      width: 100,
      render: (value: string) => (
        <Text className="font-semibold text-primary block bg-gray-100 p-1 px-3 rounded-xl text-center w-fit capitalize">
          {value}
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

    // {
    //   title: <HeaderCell title="Action" className="whitespace-nowrap" />,
    //   dataIndex: "id",
    //   key: "id",
    //   width: 60,
    //   render: (value: string) => (
    //     <div className="flex items-center">
    //       <ActionIcon
    //         variant="text"
    //         onClick={() => router.push(routes.user.details(value))}
    //       >
    //         <RiEyeFill className="text-primary" size={16} />
    //       </ActionIcon>
    //     </div>
    //   ),
    // },
  ];
};
