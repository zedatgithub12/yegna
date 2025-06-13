"use client";

import HeaderCell from "@/components/DataTable/header-cell";
import EditPencil from "@/components/icons/edit-pencil";
import { Switch } from "@/components/ui/switch";
import { routes } from "@/lib/config/routes";
import { formatDate } from "@/utils/lib/format-date-time";
import { ActionIcon } from "@yegna-systems/ui/action-icon";
import { Avatar } from "@yegna-systems/ui/avatar";
import { Checkbox } from "@yegna-systems/ui/checkbox";

import { Text } from "@yegna-systems/ui/typography";
import { useRouter } from "nextjs-toploader/app";

import { RiEyeFill } from "react-icons/ri";

type RowSelectionProps = {
  selectedRowKeys: string[];
  onSelectRow: (id: string, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
  allRowKeys: string[];
  onDeleteInstitution: (id: string) => void;
};

export const GetColumns = ({
  selectedRowKeys = [],
  onSelectRow = () => {},
  onSelectAll = () => {},
  allRowKeys = [],
  onDeleteInstitution = () => {},
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

  return [
    {
      title: renderCheckbox(isAllSelected, onSelectAll, "Select all rows"),
      dataIndex: "select",
      key: "select",
      width: 40,
      render: (_: unknown, record: institutionProps) =>
        renderCheckbox(
          selectedRowKeys.includes(record.school_id),
          (v) => onSelectRow(record.school_id, v),
          "Select row"
        ),
    },
    {
      title: (
        <HeaderCell title="Institution Name" className="whitespace-nowrap" />
      ),
      dataIndex: "school_name",
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
          </div>
        </div>
      ),
    },
    {
      title: (
        <HeaderCell title="Education Level" className="whitespace-nowrap" />
      ),
      dataIndex: "education_level",
      key: "education_level",
      width: 100,
      render: (education_level: string[]) => (
        <div>
          {education_level.map((level, index) => (
            <Text
              key={index}
              className="font-medium text-primary block bg-gray-100 p-1 px-3 rounded-xl text-center w-fit"
            >
              {level}
            </Text>
          ))}
        </div>
      ),
    },
    {
      title: <HeaderCell title="Location" className="whitespace-nowrap" />,
      dataIndex: "location",
      key: "location",
      width: 150,
      render: (location: string) => (
        <Text className="font-medium text-gray-900">{location}</Text>
      ),
    },
    {
      title: (
        <HeaderCell title="Collection Account" className="whitespace-nowrap" />
      ),
      dataIndex: "collection_account",
      key: "collection_account",
      width: 120,
      render: (collection_account: string) => (
        <Text className="font-medium text-gray-900">{collection_account}</Text>
      ),
    },
    {
      title: <HeaderCell title="Bank" className="whitespace-nowrap" />,
      dataIndex: "bank",
      key: "bank",
      width: 150,
      render: (bank: string) => (
        <Text className="font-medium text-gray-900">{bank}</Text>
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
      dataIndex: "school_id",
      key: "actions",
      width: 80,
      render: (value: string) => (
        <div className="flex items-center">
          <ActionIcon
            variant="text"
            onClick={() => router.push(routes.institution.details(value))}
          >
            <RiEyeFill className="text-primary" size={16} />
          </ActionIcon>
          <ActionIcon
            variant="text"
            onClick={() => router.push(routes.institution.edit(value))}
          >
            <EditPencil className="w-4 h-4" />
          </ActionIcon>

          <ActionIcon variant="text" onClick={() => onDeleteInstitution(value)}>
            <Switch />
          </ActionIcon>
        </div>
      ),
    },
  ];
};
