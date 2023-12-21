import * as Yup from "yup";

export const registerSchema = Yup.object({
  username: Yup.string().required("Username is required."),
  fullName: Yup.string().required("Username is required."),
  password: Yup.string().required("Password is required.").min(8, 'Password length should atleast 8 characters.'),
  email: Yup.string().required("Email is required.").email("Invalid email."),
  phoneNumber: Yup.string().required("Phone number is required."),
  country: Yup.string().required("Country is required"),
  city: Yup.string().required("City is required"),
  zip_code: Yup.string().required("Zip code is required"),
  state: Yup.string().required("State is required"),
  country_code: Yup.string().required("Country code is required."),
  confirmPassword: Yup.string().required("Confirm password is required.").oneOf([Yup.ref("password"), ""], 'Confirm password must be same as password.')
})


export type RegisterValues = Yup.InferType<typeof registerSchema>;
