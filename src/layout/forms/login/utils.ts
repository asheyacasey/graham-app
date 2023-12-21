import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid mail address.")
    .required("Mail address is required."),
  password: Yup.string().required("Password is required."),
});

export type LoginValues = Yup.InferType<typeof loginSchema>;
