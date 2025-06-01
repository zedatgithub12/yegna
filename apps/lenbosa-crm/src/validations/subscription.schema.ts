import * as yup from "yup";

export const createSubscriptionValidationSchema = yup.object().shape({
  name: yup.string().required("Subscription Plan Name is required"),
  description: yup.string().required("Description is required"),
  monthly_price: yup
    .number()
    .min(0, "Monthly price must be at least 0")
    .required("Monthly price is required"),
  yearly_price: yup
    .number()
    .min(0, "Yearly price must be at least 0")
    .required("Yearly price is required"),
  features: yup
    .array()
    .of(yup.string().required())
    .min(1, "At least one feature is required"),
  color: yup
    .array()
    .of(yup.string().required())
    .min(1, "At least one color is required"),
});
