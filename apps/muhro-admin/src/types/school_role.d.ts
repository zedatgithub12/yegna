interface SchoolRole {
  _id: string;
  role: string;
  platform: string;
  permissions: string[]; // assuming permissions are strings; adjust if it's a different type
  isDeleted: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
  id: string;
}
