import * as Yup from "yup";

export const validationSchema = Yup.object({
  your_name: Yup.string().required("Name is required"),
  father_name: Yup.string().required("Father name is required"),
});
