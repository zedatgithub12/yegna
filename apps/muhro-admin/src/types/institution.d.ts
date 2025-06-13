interface Document {
  id: string;
  name: string;
  url: string;
  uploadedAt: string;
}

interface Agreement {
  id: string;
  title: string;
  acceptedAt: string;
  validUntil?: string;
}

type SubscriptionCycle = "monthly" | "yearly";

interface institutionProps {
  school_id: string;
  id: string;
  profilePhoto: string;
  profileImage: File | null;
  category_id: string;
  subscription_plan_id: string;
  subscriptions: {
    plan_id: string;
    cycle: SubscriptionCycle;
    start_date: string;
    end_date: string;
  }[];
  admin_info: {
    id: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    gender: string;
    user_name: string;
    email: string;
    phone_number: string;
    access_role: string;
    position: string;
    profile_photo_url: string;
  };
  address: {
    latitude: number;
    longitude: number;
  };

  subscription_cycle: SubscriptionCycle;
  name: string;

  type?: string;
  address?: string;
  email: string;
  phone: string;
  tin_number: string;
  number_of_agents: number;
  latitude: number;
  longitude: number;
  admin_email: string;
  admin_phone: string;
  documents: Document[];
  agreements: Agreement[];
}

interface getInstitutionProps {
  school_id: string;
  school_name: string;
  // email: string;
  // phone: string;
  school_type: string;
  education_level: Array<"primary" | "secondary" | "preparatory">;
  number_of_agents: number;
  latitude: string;
  longitude: string;
  category_id: string;
  logo: File | null;
  location: string;
  collection_account: string;
  bank: string;
}
interface Address {
  latitude: string;
  longitude: string;
}

interface Admin {
  name: string;
  email: string;
  phone?: string;
  profile_photo_url: string;
  id: string;
  username?: string;
}
interface InstitutionDetailsPanelProps {
  profilePhoto: string;
  name: string;
  email: string;
  phone: string;
  admin: Admin;
  address: Address;
}

interface InstitutionResponse {
  success: boolean;
  message: string;
  status: number;
  data: InstitutionData;
}

interface InstitutionShowData {
  school_info: {
    school_name: string;
    // email: string;
    // phone: string;
    school_type: string;
    education_level: Array<"primary" | "secondary" | "preparatory">;
    number_of_agents: number;
    latitude: string;
    longitude: string;
    category_id: string;
    logo: File | null;
    location: string;
    collection_account: string;
    bank: string;
  };
  school_id: string;
  user_id: string;
  category_id: string;
  profile_photo_url: string;
  name: string;
  email: string;
  phone: string;
  tin_number: string;
  number_of_agents: string;

  created_at: string;
  documents: Document[];
  agreements: Agreement[];
  category: {
    id: string;
    name: string;
    type: string;
    created_at: string;
  };
  admin: {
    id: string;
    name: string;
    email: string;
    phone: string;
    username: string;
    gender: string | null;
    status: string;
    created_at: string;
    profile_photo_url: string;
  };
  subscriptions?: Subscription[];
}

interface Subscription {
  id: string;
  subscription_plan_id: string;
  cycle: string;
  created_at: string;
  plan: {
    id: string;
    name: string;
    description: string;
    monthly_price: string;
    yearly_price: string;
    is_active: boolean;
    color: string | null;
    created_at: string;
  };
}
