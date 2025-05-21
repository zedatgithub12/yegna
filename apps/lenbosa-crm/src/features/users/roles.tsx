import React from "react";
import FolderCard from "@/components/FolderCard";
import { useModal } from "@yegna-systems/lib/hooks/use-modal";
import RoleDetail from "../rolePermissions/role-detail";

const Roles = ({ rolesData }: { rolesData: rolesProps[] }) => {
  const { openModal } = useModal();
  return (
    <>
      {rolesData.length > 0 &&
        rolesData.map((role, index) => (
          <div
            key={role.uuid}
            className="w-1/5"
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
    </>
  );
};

export default Roles;
