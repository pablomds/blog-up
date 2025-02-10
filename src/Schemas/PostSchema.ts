import * as yup from 'yup';

export const PostSchema = yup.object({
  title: yup.string().max(50, "Your title must have less than 50 characters").required("Your title is required"),
  text: yup
    .string()
    .max(500, "Your text must have less than 500 characters")
    .required("Your text is required")
});

export type FormPostSchema = yup.InferType<typeof PostSchema>;