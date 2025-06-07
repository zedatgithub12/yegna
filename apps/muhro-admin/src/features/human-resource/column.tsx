"use client";

import HeaderCell from "@/components/DataTable/header-cell";
import { EthiopianPhoneNumber } from "@/utils/lib/ethiopian-phone";
import { formatDate } from "@/utils/lib/format-date-time";
import { StatusColor } from "@/utils/lib/status-color";
import { Avatar } from "@yegna-systems/ui/avatar";
import { Text } from "@yegna-systems/ui/typography";
import { Checkbox } from "@yegna-systems/ui/checkbox";
import { useRouter } from "nextjs-toploader/app";
import { routes } from "@/lib/config/routes";
import { RiEyeFill } from "react-icons/ri";
import EditPencil from "@/components/icons/edit-pencil";
import { ActionIcon } from "@yegna-systems/ui/action-icon";
import TrashIcon from "@/components/icons/trash";

type RowSelectionProps = {
  selectedRowKeys: string[];
  onSelectRow: (id: string, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
  allRowKeys: string[];
  onDeleteUser: (id: string) => void;
};

export const GetColumns = ({
  selectedRowKeys = [],
  onSelectRow = () => {},
  onSelectAll = () => {},
  allRowKeys = [],
  onDeleteUser = () => {},
}: Partial<RowSelectionProps> = {}) => {
  const router = useRouter();

  const isAllSelected =
    allRowKeys.length > 0 && selectedRowKeys.length === allRowKeys.length;

  const renderCheckbox = (
    checked: boolean,
    onChange: (checked: boolean) => void,
    label: string
  ) => (
    <Checkbox
      checked={checked}
      onChange={(v) => onChange(!!v)}
      aria-label={label}
      size="sm"
      rounded="lg"
      inputClassName="p-0 border border-black"
    />
  );

  const renderUser = (user: EmployeeProps) => (
    <div className="flex items-center gap-4">
      <Avatar
        src={user.profile_picture}
        className="w-8 h-8 rounded-full"
        name={user.user_name}
      />
      <div>
        <Text className="font-semibold text-[15px] text-gray-900 ">
          {user.first_name} {user.middle_name} {user.last_name}
        </Text>
        <Text className="font-medium text-gray-400 ">
          {EthiopianPhoneNumber(user.phone_number)}
        </Text>
      </div>
    </div>
  );

  return [
    {
      title: renderCheckbox(isAllSelected, onSelectAll, "Select all rows"),
      dataIndex: "select",
      key: "select",
      width: 40,
      render: (_: unknown, record: EmployeeProps) =>
        renderCheckbox(
          selectedRowKeys.includes(record.user_id),
          (v) => onSelectRow(record.user_id, v),
          "Select row"
        ),
    },
    {
      title: <HeaderCell title="Employee Name" className="whitespace-nowrap" />,
      key: "name",
      width: 100,
      render: renderUser,
    },
    {
      title: <HeaderCell title="Phone Number" className="whitespace-nowrap" />,
      dataIndex: "phone_number",
      key: "phone_number",
      width: 100,
      render: (value: string) => (
        <Text className="font-medium text-gray-900">
          {EthiopianPhoneNumber(value)}
        </Text>
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
      title: <HeaderCell title="Department" className="whitespace-nowrap" />,
      dataIndex: "access_role",
      key: "access_role",
      width: 100,
      render: (value: string) => (
        <Text className="font-medium text-primary block bg-gray-100 p-1 px-3 rounded-xl text-center w-fit capitalize">
          {value}
        </Text>
      ),
    },
    {
      title: <HeaderCell title="Gender" className="whitespace-nowrap" />,
      dataIndex: "gender",
      key: "gender",
      width: 100,
      render: (value?: string) => (
        <Text className="font-medium text-gray-900 ms-3">{value || "-"}</Text>
      ),
    },
    {
      title: <HeaderCell title="Status" className="whitespace-nowrap" />,
      dataIndex: "status",
      key: "status",
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
      title: <HeaderCell title="Registered at" className="whitespace-nowrap" />,
      dataIndex: "created_at",
      key: "created_at",
      width: 100,
      render: (value: string) => (
        <Text className="font-medium text-gray-600 text-xs">
          {value ? formatDate(new Date(value)) : "-"}
        </Text>
      ),
    },
    {
      title: <HeaderCell title="Action" className="whitespace-nowrap" />,
      dataIndex: "user_id",
      key: "user_id",
      width: 60,
      render: (value: string) => (
        <div className="flex items-center">
          <ActionIcon
            variant="text"
            onClick={() => router.push(routes.human_resource.details(value))}
          >
            <RiEyeFill className="text-primary" size={16} />
          </ActionIcon>

          <ActionIcon
            variant="text"
            onClick={() => router.push(routes.human_resource.edit(value))}
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
