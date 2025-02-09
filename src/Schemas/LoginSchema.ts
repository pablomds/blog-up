import * as yup from 'yup';

export const LoginSchema = yup.object({
  email: yup
    .string()
    .required("Your email is required")
    .email("Your email must be valid"),
  password: yup.string().required("Your password is required"),
});

export type FormLogin = yup.InferType<typeof LoginSchema>;


