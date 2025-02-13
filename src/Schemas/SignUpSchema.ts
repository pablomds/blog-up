import * as yup from 'yup';

export const SignUpSchema = yup.object({
  name: yup
    .string()
    .matches(/^[a-zA-Z\s]+$/, "Name must contain only letters and spaces")
    .max(35, "Name must have less than 35 characters")
    .required("Your name is required"),
  email: yup
    .string()
    .required("Your email is required")
    .email("Your email must be valid"),
  password: yup
    .string()
    .matches(/[a-zA-Z]/, "Password must contain at least one letter")
    .matches(/[^a-zA-Z0-9]/, "Password must contain at least one special character")
    .min(8, "Password must have 8 characters at least")
    .required("Your password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Your confirm password is required"),
});

export type FormSignUpSchema = yup.InferType<typeof SignUpSchema>;