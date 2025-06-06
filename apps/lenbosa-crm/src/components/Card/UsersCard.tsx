import { Avatar } from "@yegna-systems/ui/avatar";
import { IconButton } from "@yegna-systems/ui/button";
import cn from "@yegna-systems/ui/cn";
import { Popover } from "@yegna-systems/ui/popover";
import { Text, Title } from "@yegna-systems/ui/typography";
import { EllipsisVertical, Trash2 } from "lucide-react";
import React from "react";

type Props = {
  showIcon?: boolean;
  className?: string;
  avatar: string;
  name: string;
  email: string;
  onPress: () => void;
  onRemove: () => void;
};

const UsersCard = ({
  showIcon = true,
  className,
  avatar,
  name,
  email,
  onPress,
  onRemove,
}: Props) => {
  const OptionComponent = ({ onRemove }: { onRemove: () => void }) => (
    <Popover>
      <Popover.Trigger>
        <EllipsisVertical size={20} />
      </Popover.Trigger>
      <Popover.Content className="bg-transparent border-none">
        {() => (
          <div className="bg-white">
            <div
              className=" border-b flex items-center px-2 py-1 hover:bg-gray-50 cursor-pointer"
              onClick={() => onRemove()}
            >
              <Trash2 color="red" size={16} />
              <Text className="ml-2">Remove</Text>
            </div>
          </div>
        )}
      </Popover.Content>
    </Popover>
  );
  return (
    <div
      className={cn(
        "flex items-center justify-between w-full p-2 cursor-pointer group border-b hover:bg-gray-50",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <Avatar src={avatar} name={name} size="md" />
        <div>
          <Title as="h6" className="font-normal">
            {name}
          </Title>
          <Text className="text-sm text-black/40">{email}</Text>
        </div>
      </div>

      {showIcon && (
        <IconButton
          onClick={onPress}
          icon={<OptionComponent onRemove={onRemove} />}
        />
      )}
    </div>
  );
};

export default UsersCard;
