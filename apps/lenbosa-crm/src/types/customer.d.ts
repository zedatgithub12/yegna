interface Customer {
  userCode: string;
  fullName: string;
  phoneNumber: string;
}

interface CustomerFormValues {
  firstName: string;
  middleName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  customer_type: string;
  billing_cycle: string;
  selected_plan: string;
}

interface CustomerSubscriptionPlan {
  id: string;
  name: string;
  description: string;
  monthly_price: string;
  yearly_price: string;
  is_active: boolean;
  color: string | null;
  created_at: string; // ISO date string
}

interface CustomerSubscription {
  id: string;
  subscription_plan_id: string;
  cycle: "monthly" | "yearly"; // assuming only these two
  created_at: string; // ISO date string
  plan: SubscriptionPlan;
}

interface customerDataProps {
  id: string;
  name: string;
  email: string;
  phone: string;
  username: string;
  gender: string;
  customer_type: string;
  status: "Active" | "Inactive" | string;
  created_at: string;
  profile_photo_url: string;
  profile_image: string;
  subscriptions: CustomerSubscription[];
}
