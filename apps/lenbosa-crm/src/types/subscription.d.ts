interface Feature {
  id: string;
  name: string;
  value: string | null;
  is_active: boolean;
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
