interface rolesProps {
  _id: string;
  uuid: string;
  name: string;
  role: string;
  description?: string;
  users_count: number;
  permissions_count: number;
  permissions: { uuid: string; name: string }[];
  created_at: string;
  three_users_profile_image?: string[];
}

interface CreateRoleProps {
  name: string;
  description: string;
  permissions: string[];
}

interface roleUser {
  id: string;
  name: string;
  email: string;
  profile_photo_url: string;
}
