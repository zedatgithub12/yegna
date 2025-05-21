"use client";

import { Avatar } from "@yegna-systems/ui/avatar";
import { Text } from "@yegna-systems/ui/typography";

type FolderCardProps = {
  title: string;
  users: number;
  labelColor?: "indigo" | "orange";
  avatars?: string[];
};

const FolderCard = ({
  title,
  users,
  labelColor = "indigo",
  avatars = [],
}: FolderCardProps) => {
  const badgeColor =
    labelColor === "orange"
      ? "bg-orange-50 text-orange-600"
      : "bg-indigo-50 text-indigo-600";

  return (
    <div className="w-44  h-24 bg-white rounded-xl rounded-tl-none shadow-sm p-4 relative hover:scale-105 transition-all ease-in-out duration-75 cursor-pointer ">
      <div className="absolute -top-7 left-0 bg-inherit p-3 py-2 rounded-xl rounded-bl-none my-div ">
        <div
          className={`px-2 py-1 text-xs font-medium rounded-md ${badgeColor}`}
        >
          Role Group
        </div>
        <div className="mt-1 text-lg font-medium text-gray-900">{title}</div>
      </div>

      <div className="absolute bottom-2 left-4 right-4 flex items-center justify-between">
        <div className="flex -space-x-3">
          {avatars.slice(0, 3).map((src, i) => (
            <Avatar
              key={i}
              src={src}
              name="avatar"
              size="sm"
              className="rounded-full border border-white"
            />
          ))}
        </div>
        <div className="text-xs text-gray-700 ml-2 flex gap-0.5">
          <Text>{users}</Text> <span className="text-gray-400">Users</span>
        </div>
      </div>
    </div>
  );
};

export default FolderCard;
