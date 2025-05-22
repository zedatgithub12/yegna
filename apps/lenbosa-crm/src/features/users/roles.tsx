import React from "react";
import FolderCard from "@/components/FolderCard";
import { useModal } from "@yegna-systems/lib/hooks/use-modal";
import RoleDetail from "../rolePermissions/role-detail";
import cn from "@yegna-systems/ui/cn";

const Roles = ({
  rolesData,
  className,
}: {
  rolesData: rolesProps[];
  className?: string;
}) => {
  const { openModal } = useModal();
  return (
    <div className={cn(className)}>
      {rolesData.length > 0 &&
        rolesData.map((role, index) => (
          <div
            key={role.uuid}
            className="w-1/6"
            onClick={() =>
              openModal({
                view: (
                  <RoleDetail
                    roleName={role.name}
                    created_at={role.created_at}
                    user_count={role.users_count}
                    description=""
                  />
                ),
                position: "right",
                rounded: "md",
                customSize: "550px",
              })
            }
          >
            <FolderCard
              title={role?.name}
              users={role?.users_count}
              labelColor={index % 2 ? "orange" : "indigo"}
              // avatars={[
              //   "/avatars/user1.jpg",
              //   "/avatars/user2.jpg",
              //   "/avatars/user3.jpg",
              // ]}
            />
          </div>
        ))}
    </div>
  );
};

export default Roles;
