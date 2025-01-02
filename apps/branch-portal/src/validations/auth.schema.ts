import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  username: Yup.string().required("Username is required").trim(),
});
export const otpVerifySchema = Yup.object().shape({
  code: Yup.string().min(6).max(6).required("OTP code is required"),
});

export const passwordLoginSchema = Yup.object().shape({
  password: Yup.string().required("Password is required").trim(),
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
type OtpVerifyType = Yup.InferType<typeof otpVerifySchema>;
type PasswordLoginType = Yup.InferType<typeof passwordLoginSchema>;
export type { LoginType, OtpVerifyType, PasswordLoginType };
