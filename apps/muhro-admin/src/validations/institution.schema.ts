import * as Yup from "yup";

export const institutionValidationSchema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  phone: Yup.string().required("Required"),
  tin_number: Yup.string().required("Required"),
  number_of_agents: Yup.number().min(1).required("Required"),
  latitude: Yup.number().required("Required"),
  longitude: Yup.number().required("Required"),
  admin_phone: Yup.string().required("Required"),
  subscription_plan_id: Yup.string().required("Subscription plan is required"),
  subscription_cycle: Yup.string()
    .oneOf(["monthly", "yearly"] as const)
    .required("Billing cycle is required"),
});
