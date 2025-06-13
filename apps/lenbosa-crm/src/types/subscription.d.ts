interface SubscriptionFormValues {
  name: string;
  description: string;
  monthly_price: string;
  yearly_price: string;
  features: string[];
  color: string[];
}

interface Features {
  feature: {
    id: string;
    name: string;
    value: string | null;
    is_active: boolean;
  };
}

interface SubscriptionPlans {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  monthly_price: number;
  yearly_price: number;
  color: string[];
  features: Features[];
  created_at: string;
}

interface Feature {
  id: string;
  is_active: boolean;
  value: string | null;
  feature: {
    name: string;
  };
}
interface SubscriptionProps {
  iconPath: string;
  id: string;
  name: string;
  description: string;
  monthly_price: string;
  yearly_price: string;
  is_active: boolean;
  color: string;
  created_at: string;
  features: Features[];
}

interface SubscriptionPlanFeatures {
  id: string;
  name: string;
}

type FeatureReference = {
  id: string;
  feature_id: string;
};

type PlanDetail = {
  id: string;
  name: string;
  description: string;
  monthly_price: string;
  yearly_price: string;
  is_active: boolean;
  color: string[] | null;
  created_at: string;
  features: FeatureReference[];
};
