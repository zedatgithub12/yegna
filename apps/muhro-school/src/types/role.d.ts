interface rolesProps {
  _id: string;
  role: string;
  platform: string;
  permissions: string[];
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
  users_count: number;
  three_users_profile_image: string[];
}

interface CreateRoleProps {
  name: string;
  description: string;
  permissions: string[];
}
