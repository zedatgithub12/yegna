import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  username: Yup.string().required("Username is required").trim(),
  password: Yup.string().required("Password is required").trim(),
});

export const otpVerifySchema = Yup.object().shape({
  code: Yup.string()
    .min(6, "OTP code must be 6 digits")
    .max(6, "OTP code must be 6 digits")
    .required("OTP code is required"),
});

export const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required").trim(),
});

export const passwordLoginSchema = Yup.object().shape({
  password: Yup.string().required("Password is required").trim(),
});

export const createPasswordSchema = Yup.object().shape({
  password: Yup.string().required("New password is required").trim(),
  confirm_password: Yup.string()
    .required("Confirm new password is required")
    .trim()
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

export const generatePasswordValidationSchema = (rules: PasswordData) => {
  if (!rules) return Yup.string().required("Password is required");
  const {
    minLength,
    maxLength,
    numbers,
    capitalLetters,
    smallLetters,
    characters,
  } = rules;

  // we will add based on the response of the api
  let passwordValidation = Yup.string()
    .required("Password is required")
    .min(minLength, `Password must be at least ${minLength} characters`)
    .max(maxLength, `Password must not exceed ${maxLength} characters`);

  if (numbers) {
    passwordValidation = passwordValidation.matches(
      /(?=.*\d)/,
      "Password must contain at least one number"
    );
  }

  if (capitalLetters) {
    passwordValidation = passwordValidation.matches(
      /(?=.*[A-Z])/,
      "Password must contain at least one uppercase letter"
    );
  }

  if (smallLetters) {
    passwordValidation = passwordValidation.matches(
      /(?=.*[a-z])/,
      "Password must contain at least one lowercase letter"
    );
  }

  if (characters) {
    passwordValidation = passwordValidation.matches(
      /(?=.*\W)/,
      "Password must contain at least one special character"
    );
  }

  passwordValidation = passwordValidation.transform((value) => value.trim());

  return passwordValidation;
};

type LoginType = Yup.InferType<typeof loginSchema>;
type ForgotType = Yup.InferType<typeof forgotPasswordSchema>;
type OtpVerifyType = Yup.InferType<typeof otpVerifySchema>;
type PasswordLoginType = Yup.InferType<typeof passwordLoginSchema>;
type createPasswordType = Yup.InferType<typeof createPasswordSchema>;
export type {
  LoginType,
  ForgotType,
  OtpVerifyType,
  PasswordLoginType,
  createPasswordType,
};
