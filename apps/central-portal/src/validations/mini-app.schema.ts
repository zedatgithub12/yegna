import * as Yup from "yup";

export const createMiniSchema = Yup.object().shape({
  name: Yup.string().required("Mini App name is required").trim(),
});

type CreateMiniAppType = Yup.InferType<typeof createMiniSchema>;

export type { CreateMiniAppType };
