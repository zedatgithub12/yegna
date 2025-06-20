import * as Yup from "yup";

export const generalInfoValidationSchema = Yup.object().shape({
  name: Yup.string().required("Role name is required"),
  description: Yup.string(),
  permissions: Yup.array()
    .of(Yup.string())
    .min(1, "At least one permission must be added"),
});
