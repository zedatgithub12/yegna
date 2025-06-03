interface UserFormValues {
  firstName: string;
  middleName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  role: string[];
  password?: string;
  confirm_password?: string;
  profileImage: File | null;
}

interface RoleProp {
  uuid: string;
  name: string;
}

interface UserDataProps {
  id: string;
  name: string;
  email: string;
  phone: string;
  username: string;
  gender: string;
  status: "Active" | "Inactive" | string;
  created_at: string;
  profile_photo_url: string;
  profile_image: string;
  roles: RoleProp[];
}
