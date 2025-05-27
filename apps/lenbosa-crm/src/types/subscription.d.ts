interface SubscriptionFormValues {
  name: string;
  description: string;
  monthly_price: string;
  yearly_price: string;
  features: string[];
  color: string[];
}

interface Features {
  id: string;
  name: string;
  value: string | null;
  is_active: boolean;
}

interface SubscriptionPlans {
  id: string;
  name: string;
  description: string | null;
  monthly_price: string;
  yearly_price: string;
  is_active: boolean;
  color: string;
  created_at: string;
  features: Features[];
}

