import * as Yup from "yup";

export const advertValidationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .max(100, "Title must be at most 100 characters"),

  start_date: Yup.string().required("Start date is required"),

  end_date: Yup.string().required("End date is required"),

  description: Yup.string()
    .required("Description is required")
    .max(1000, "Description must be at most 1000 characters"),

  ad_banner: Yup.mixed()
    .nullable()
    .test("fileSize", "File size is too large", (value) => {
      const file = value as File | null;
      return !file || (file && file.size <= 10 * 1024 * 1024);
    })
    .test("fileType", "Unsupported file format", (value) => {
      return (
        !value ||
        (value &&
          ["image/jpeg", "image/png", "image/gif", "image/webp"].includes(
            (value as File).type
          ))
      );
    }),
});
