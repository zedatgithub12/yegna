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
