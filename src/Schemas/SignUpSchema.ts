import * as yup from 'yup';

export const SignUpSchema = yup.object({
  name: yup.string().required("Your name is required"),
  email: yup
    .string()
    .required("Your email is required")
    .email("Your email must be valid"),
  password: yup
    .string()
    .min(8, "Your password must have 8 characters at least")
    .required("Your password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Your confirm password is required"),
});

export type FormSignUpSchema = yup.InferType<typeof SignUpSchema>;