import * as Yup from "yup";

export const validationSchema = Yup.object({
  your_name: Yup.string().required("Name is required"),
  father_name: Yup.string().required("Father name is required"),
});

export const createEmployeeValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .max(50, "First name must be at most 50 characters"),

  middleName: Yup.string()
    .required("Middle name is required")
    .max(50, "Middle name must be at most 50 characters"),

  lastName: Yup.string().max(50, "Last name must be at most 50 characters"),

  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(/^((\+251)|0)?9|7\d{8}$/, "Enter a valid Ethiopian phone number"),

  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  role: Yup.array()
    .of(Yup.string().required("Role id is required"))
    .min(1, "At least one role is required")
    .required("Role is required"),

  profileImage: Yup.mixed()
    .nullable()
    .test(
      "fileType",
      "Unsupported file format. Only image files are allowed.",
      (value) =>
        !value ||
        (value &&
          ["image/jpeg", "image/png", "image/jpg"].includes(
            (value as File).type
          ))
    )
    .test(
      "fileSize",
      "File too large. Max size is 5MB.",
      (value) => !value || (value && (value as File).size <= 5 * 1024 * 1024)
    ),

  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),

  confirm_password: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm password is required"),
});

export const editEmployeeValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .max(50, "First name must be at most 50 characters"),

  middleName: Yup.string()
    .required("Middle name is required")
    .max(50, "Middle name must be at most 50 characters"),

  lastName: Yup.string().max(50, "Last name must be at most 50 characters"),

  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(/^((\+251)|0)?9|7\d{8}$/, "Enter a valid Ethiopian phone number"),

  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  role: Yup.array()
    .of(Yup.string().required("Role id is required"))
    .min(1, "At least one role is required")
    .required("Role is required"),

  profileImage: Yup.mixed()
    .nullable()
    .test(
      "fileType",
      "Unsupported file format. Only image files are allowed.",
      (value) =>
        !value ||
        (value &&
          ["image/jpeg", "image/png", "image/jpg"].includes(
            (value as File).type
          ))
    )
    .test(
      "fileSize",
      "File too large. Max size is 5MB.",
      (value) => !value || (value && (value as File).size <= 5 * 1024 * 1024)
    ),
});
