interface Staff {
  first_name: string;
  middle_name?: string;
  last_name: string;
  user_name: string;
  phone_number: string;
  gender: string;
  email: string;
  access_role: string[];
  department:
    | "admin"
    | "driver"
    | "assistance"
    | "call center"
    | "tutors"
    | "finance";
  collection_account?: number;
  bank?: string;
  net_salary?: number;
}
