import * as Yup from "yup";
export const phoneNumberSchema = Yup.object().shape({
  phone: Yup.string()
    .min(1)
    .required("Phone number is required")
    .matches(
      /^[97]\d{8}$/,
      "Phone number must start with 9 or 7 and be 9 digits long"
    ),
});

export const reasonSchema = Yup.object().shape({
  reason: Yup.string().required("Phone number is required"),
});

export const accountNumberSchema = Yup.object().shape({
  accountNumber: Yup.string().required("Account number is required"),
});
type PhoneNumberType = Yup.InferType<typeof phoneNumberSchema>;
type ReasonType = Yup.InferType<typeof reasonSchema>;
type AccountNumberType = Yup.InferType<typeof accountNumberSchema>;
export type { PhoneNumberType, ReasonType, AccountNumberType };
