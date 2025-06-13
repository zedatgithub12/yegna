import * as yup from "yup";

export const messageCreateSchema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title cannot exceed 100 characters")
    .trim(),

  category_id: yup
    .string()
    .required("Category is required")
    .test(
      "is-valid-category",
      "Invalid category ID format",
      (value) => value !== "" && value !== null && value !== undefined
    ),

  message: yup
    .string()
    .required("Message content is required")
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message cannot exceed 5000 characters")
    .trim(),

  recipients: yup
    .array()
    .of(yup.string().required("Recipient ID is required"))
    .min(1, "At least one recipient is required")
    .max(50, "Cannot send to more than 50 recipients at once"),

  attachments: yup
    .mixed<File[]>()
    .optional()
    .test(
      "fileSize",
      "File size too large",
      (files) =>
        !files ||
        Array.from(files).every((file) => file.size <= 5 * 1024 * 1024) // 5MB max
    )
    .test(
      "fileCount",
      "Too many files",
      (files) => !files || files.length <= 5 // max 5 files
    )
    .test(
      "fileType",
      "Unsupported file type",
      (files) =>
        !files ||
        Array.from(files).every((file) =>
          [
            "image/jpeg",
            "image/png",
            "application/pdf",
            "text/plain",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          ].includes(file.type)
        )
    ),
});
