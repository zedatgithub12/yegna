import TablePagination from "@/components/DataTable/table-pagination";
import { queryKeys } from "@/lib/api/query-keys";
import { useFetchData } from "@/lib/api/use-fetch-data";
import { Avatar } from "@yegna-systems/ui/avatar";
import { Checkbox } from "@yegna-systems/ui/checkbox";
import { Input } from "@yegna-systems/ui/input";
import { Text } from "@yegna-systems/ui/typography";

import { ChevronLeft } from "lucide-react";
import React, { useState } from "react";
import useDebounce from "react-use/lib/useDebounce";

type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

type GroupProp = {
  id: string;
  name: string;
  description: string;
  created_at: string;
  is_active?: boolean;
  users?: User[];
};

type GroupDetailPageProps = {
  group: GroupProp;
  goBack: () => void;
  id: string;
};

const GroupDetail = ({ group, goBack, id }: GroupDetailPageProps) => {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data } = useFetchData(
    [queryKeys.get_groups, id, debouncedSearchTerm, currentPage, pageSize],
    `${queryKeys.get_groups}/${id}?search=${debouncedSearchTerm}&page=${currentPage}&page_size=${pageSize}`
  );

  const groupData = data?.data || group;
  const users = groupData.users || [];

  useDebounce(
    () => {
      setDebouncedSearchTerm(searchTerm);
    },
    300,
    [searchTerm]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="w-full bg-white p-3 rounded-xl">
        <div className="flex justify-between items-start mb-4 w-full">
          <button
            onClick={goBack}
            className="flex items-center gap-2 px-4 py-1.5 border border-gray-300 rounded-full hover:bg-gray-100 transition"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back</span>
          </button>
          <Input
            placeholder="Search"
            inputClassName="bg-gray-100 rounded-lg"
            className="w-full max-w-sm py-2 rounded-md"
            variant="text"
            value={searchTerm}
            onChange={handleChange}
            clearable
            onClear={() => setSearchTerm("")}
          />
        </div>
        <span className="text-sm font-semibold"> {groupData.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-slate-50 p-3 rounded-2xl">
        {users.length > 0 ? (
          users.map((user: User) => (
            <div
              key={user.id}
              className="flex items-center gap-4 bg-white rounded-3xl p-3 "
            >
              <hr className="my-2" />
              <Checkbox size="sm" className="mt-1 rounded-xl" />
              <Avatar
                name={user.name}
                color="primary"
                className="w-10 h-10 rounded-full bg-gray-800 text-white text-sm font-semibold"
              />
              <div className="flex flex-col">
                <Text className="font-semibold text-sm mt-1">{user.name}</Text>
                <Text className="text-sm mt-1">{user.phone}</Text>
              </div>
            </div>
          ))
        ) : (
          <Text>No users found in this group.</Text>
        )}
      </div>
      <TablePagination
        pageSize={pageSize}
        setPageSize={setPageSize}
        total={data?.data?.data?.total}
        current={currentPage}
        onChange={(page: number) => setCurrentPage(page)}
      />
    </div>
  );
};

export default GroupDetail;
