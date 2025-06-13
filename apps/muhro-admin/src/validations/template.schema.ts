import * as yup from "yup";

export const templateCreateSchema = yup.object().shape({
  name: yup.string().required("Template name is required"),
  body: yup.string().required("Template body is required"),
});
