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
            key={role._id}
            className="w-1/6"
            onClick={() =>
              openModal({
                view: (
                  <RoleDetail
                    id={role._id}
                    roleName={role.role}
                    created_at={role.createdAt}
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
              title={role?.role}
              users={role?.users_count}
              labelColor={index % 2 ? "orange" : "indigo"}
              avatars={role.three_users_profile_image}
            />
          </div>
        ))}
    </div>
  );
};

export default Roles;
