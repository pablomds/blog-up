import * as yup from 'yup';

export const PostSchema = yup.object({
  id: yup.string().notRequired().default(""),
  title: yup.string().min(5, "Your title must have more at least 5 characters").max(60, "Your title must have less than 60 characters").required("Your title is required"),
  text: yup
    .string()
    .min(200, "Your test must have at least 200 characters")
    .max(1000, "Your text must have less than 1000 characters")
    .required("Your text is required")
});

export type FormPostSchema = yup.InferType<typeof PostSchema>;