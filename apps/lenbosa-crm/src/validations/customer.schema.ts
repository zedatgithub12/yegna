import * as Yup from "yup";

export const createCustomerFormValidationOne = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  middleName: Yup.string().required("Middle name is required"),
  lastName: Yup.string(), // optional
  phoneNumber: Yup.string().required("Phone number is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  customer_type: Yup.string().required("Customer type is required"),
});

export const createCustomerFormValidationTwo = Yup.object().shape({
  billing_cycle: Yup.string().required("Billing cycle is required"),
  selected_plan: Yup.string().required(
    "Please select a subscription plan first"
  ),
});
