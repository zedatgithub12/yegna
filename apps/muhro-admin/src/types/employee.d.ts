interface EmployeeFormValues {
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

interface EmployeeDataProps {
  id: string;
  name: string;
  email: string;
  phone: string;
  employeeName: string;
  gender: string;
  status: "Active" | "Inactive" | string;
  created_at: string;
  profile_photo_url: string;
  roles: RoleProp[];
}

interface EmployeeProps {
  user_id: string;
  user_code: string;
  user_name: string;
  profile_picture: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  gender: string;
  access_role: "admin" | "user" | "manager" | string;
  phone_number: string;
  created_at: string;
}
