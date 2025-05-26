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
  id?: string;
  category_id: string;
  subscription_plan_id: string;
  subscription_cycle: SubscriptionCycle;
  name: string;
  email: string;
  phone: string;
  tin_number: string;
  number_of_agents: number;
  latitude: number;
  longitude: number;
  admin_name: string;
  admin_email: string;
  admin_phone: string;
  documents: Document[];
  agreements: Agreement[];
}

interface getInstitutionProps {
  id: string;
  name: string;
  type: string;
  email: string;
  phone: string;
  address: {
    latitude: string;
    longitude: string;
  };
  created_at: string;
}
