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
  features: Feature[];
}
