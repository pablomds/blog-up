import * as yup from 'yup';

export const PostSchema = yup.object({
  title: yup.string().max(60, "Your title must have less than 60 characters").required("Your title is required"),
  text: yup
    .string()
    .max(1000, "Your text must have less than 1000 characters")
    .required("Your text is required")
});

export type FormPostSchema = yup.InferType<typeof PostSchema>;