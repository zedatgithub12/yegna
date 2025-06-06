import * as Yup from "yup";

export const groupCreateSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters"),

  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must not exceed 500 characters"),

  users: Yup.array()
    .of(Yup.string().required("user id is required"))
    .min(1, "At least one user is required")
    .required("user is required"),
});
