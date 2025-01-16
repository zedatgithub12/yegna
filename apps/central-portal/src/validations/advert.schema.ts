import * as Yup from "yup";

export const createAdvertSchema = Yup.object().shape({
  isEditMode: Yup.boolean().default(false),
  name: Yup.string().required("Advert name is required").trim(),
  logo: Yup.mixed().when("isEditMode", {
    is: () => false,
    then: (schema) => schema.required("Advert logo is required"),
    otherwise: (schema) => schema.optional(),
  }),
  adFor: Yup.string().required("Advert for is required").trim(),
});

type CreateAdvertType = Yup.InferType<typeof createAdvertSchema>;

export type { CreateAdvertType };
