interface rolesProps {
  uuid: string;
  name: string;
  users_count: number;
  permissions_count: number;
  permissions: { uuid: string; name: string }[];
  created_at: string;
}

interface CreateRoleProps {
  name: string;
  description: string;
  permissions: string[];
}
