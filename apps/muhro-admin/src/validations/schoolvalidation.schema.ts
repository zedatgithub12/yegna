import * as Yup from "yup";

export const schoolValidationSchema = Yup.object({
  admin_info: Yup.object({
    phone_number: Yup.string()
      .required("Phone number is required")
      .matches(
        /^\+251\d{9}$/,
        "Phone number must start with +251 and be 12 digits long"
      ),
    access_role: Yup.string().required("Access role is required"),
    position: Yup.string().required("Position is required"),
  }),
});
