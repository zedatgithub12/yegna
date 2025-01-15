import { formatDate } from "@coop-super-app/lib/utils/format-date-time";
import HeaderCell from "@coop-super-app/lib/table/header-cell";
import { Text } from "@coop-super-app/ui/typography";

export const getColumns = () => [
  {
    title: <HeaderCell title="customer id" className="whitespace-nowrap" />,
    dataIndex: "userCode",
    key: "userCode",
    width: 150,
    render: (value: string) => (
      <Text className="font-medium text-gray-900">{value}</Text>
    ),
  },
  {
    title: <HeaderCell title="cif Number" className="whitespace-nowrap" />,
    dataIndex: "customerNumber",
    key: "customerNumber",
    width: 150,
    render: (value: string) => (
      <Text className="font-medium text-gray-900">{value}</Text>
    ),
  },

  {
    title: <HeaderCell title="customer Name" className="whitespace-nowrap" />,
    dataIndex: "fullName",
    key: "fullName",
    width: 150,
    render: (value: string) => (
      <Text className="font-medium text-gray-900 capitalize whitespace-nowrap">
        {value}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="email" className="whitespace-nowrap" />,
    dataIndex: "email",
    key: "email",
    width: 50,
    render: (value: string) => (
      <Text className="font-medium text-gray-900">{value}</Text>
    ),
  },
  {
    title: <HeaderCell title="phone" className="whitespace-nowrap" />,
    dataIndex: "phoneNumber",
    key: "phoneNumber",
    width: 50,
    render: (value: string) => (
      <Text className="font-medium text-gray-900">{value}</Text>
    ),
  },
  {
    title: <HeaderCell title="main Account" className="whitespace-nowrap" />,
    dataIndex: "mainAccount",
    key: "mainAccount",
    width: 50,
    render: (value: string) => (
      <Text className="font-medium text-gray-900">{value || "-"}</Text>
    ),
  },
  {
    title: <HeaderCell title="gender" className="whitespace-nowrap" />,
    dataIndex: "gender",
    key: "gender",
    width: 50,
    render: (value: string) => (
      <Text className="font-medium text-gray-900">{value}</Text>
    ),
  },
  // {
  //   title: <HeaderCell title="Branch Status" className="whitespace-nowrap" />,
  //   dataIndex: "LDAPStatus",
  //   key: "LDAPStatus",
  //   width: 50,
  //   render: (value: string) => getStatusBadge(value),
  // },
  // {
  //   title: <HeaderCell title="KYC Status" className="whitespace-nowrap" />,
  //   dataIndex: "KYCStatus",
  //   key: "KYCStatus",
  //   width: 50,
  //   render: (value: string) => getStatusBadge(value),
  // },
  {
    title: <HeaderCell title="account Type" className="whitespace-nowrap" />,
    dataIndex: "accountType",
    key: "accountType",
    width: 50,
    render: (value: string) => (
      <Text className="font-medium text-gray-900">{value ?? "-"}</Text>
    ),
  },
  {
    title: <HeaderCell title="date joined" className="whitespace-nowrap" />,
    dataIndex: "dateJoined",
    key: "dateJoined",
    width: 100,
    render: (value: Date) => (
      <Text className="font-medium text-gray-900 whitespace-nowrap">
        {formatDate(value)}
      </Text>
    ),
  },
];
