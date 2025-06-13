interface groupProp {
  length: number;
  id: string;
  name: string;
  count: number;
  description: string;
  three__user_profiles?: string[];
  created_at: string;
  users: {
    name: string;
    email: string;
    id: string;
    phone: string;
  }[];
}

interface groupPropCreateProps {
  name: string;
  description: string;
  users: string[];
}
