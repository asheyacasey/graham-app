import Button from "@/ui/form/Button";
import CheckBox from "@/ui/form/CheckBox";
import Input from "@/ui/form/Input";
import PhoneInput from "@/ui/form/PhoneInput";
import Select, { OptionType } from "@/ui/form/Select";
import { useFormik } from "formik";
import React, { useState } from "react";
import { registerSchema, RegisterValues } from "./utils";
import { GoogleIcon } from "@/ui/Icon";
import { Facebook, RadioSelected, RadioUnselected } from "@/ui/Icon";
import PasswordInput from "@/ui/form/PasswordInput";
import MailInput from "@/ui/form/MailInput";
import { cn } from "@/utils/styles";
import { useRouter } from "next/navigation";
import { URLS } from "@/utils/URLS";
import { handleApiError } from "@/utils/hanldeApiError";
import { toast } from "react-toastify";
import { googleLoginApi, registerApi } from "@/services/auth.services";
import { LoginSocialFacebook, LoginSocialGoogle } from "reactjs-social-login";
import { toggleFullScreenLoadingAction } from "@/redux/slices/app";
import { loginUser } from "@/redux/slices/auth";
import { useAppDispatch } from "@/redux/hooks";

const RegisterForm = () => {
  const dispatch = useAppDispatch()
  const [loading, setloading] = useState(false)
  const router = useRouter();
  const {
    values,
    handleSubmit,
    errors,
    setValues,
    handleBlur,
    touched,
    handleChange,
  } = useFormik({
    initialValues: {
      city: "",
      country: "",
      email: "",
      fullName: "",
      password: "",
      phoneNumber: "",
      state: "",
      username: "",
      zip_code: "",
      country_code: "",
      confirmPassword: ""
    } as RegisterValues,
    validationSchema: registerSchema,
    onSubmit: async (formValues) => {
      try {
        setloading(true)
        await registerApi(formValues)
        router.replace(`${URLS.VERIFY_OTP}?email=${formValues.email}`)
      } catch (error: any) {
        const err = handleApiError(error)
        toast.error(err)
      } finally {
        setloading(false)
      }
    },
  });
  const navigateToSignIn = () => {
    router.push(URLS.LOGIN);
  };
  return (
    <div>
      <h1 className="md:text-6xl text-4xl font-bold tracking-[0.233px] font-Poppins text-center">
        Register
      </h1>
      <p className="text-black font-Roboto text-base tracking-[0.1px] w-full mt-5 text-center">
        Let’s Sign up first for enter into Square Website. Uh She Up!
      </p>
      {/* container */}
      <div className="bg-white py-10 px-8 rounded-20px mt-10">
        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-5">
            <Input
              placeholder="Username"
              value={values.username}
              onChange={handleChange}
              name="username"
              error={
                errors.username && touched.username ? errors.username : ""
              }
              onBlur={handleBlur}
            />
            <Input
              placeholder="Full name"
              value={values.fullName}
              onChange={handleChange}
              name="fullName"
              error={errors.fullName && touched.fullName ? errors.fullName : ""}
              onBlur={handleBlur}
            />
            <PhoneInput
              onChangeNumber={(number) => {
                setValues((prev) => ({ ...prev, phoneNumber: number }));
              }}
              onChangeCode={(code) => {
                setValues((prev) => ({ ...prev, country_code: code }));
              }}
              error={errors.country_code || errors.phoneNumber}
            />
            <Select
              onChange={(data: OptionType) => {
                setValues((prev) => ({ ...prev, country: String(data.value) }));
              }}
              options={[{ label: "Germany", value: "germany" }]}
              error={errors.country && touched.country ? errors.country : ""}
              name="country"
              onBlur={handleBlur}
              placeholder="Country"
            />
            <PasswordInput
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              name="password"
              error={errors.password && touched.password ? errors.password : ""}
              onBlur={handleBlur}
            />
            <PasswordInput
              placeholder="Confirm Password"
              value={values.confirmPassword}
              onChange={handleChange}
              name="confirmPassword"
              error={
                errors.confirmPassword && touched.confirmPassword
                  ? errors.confirmPassword
                  : ""
              }
              onBlur={handleBlur}
            />
          </div>
          <Input
            className="my-5"
            placeholder="Mail Address"
            value={values.email}
            onChange={handleChange}
            name="email"
            error={errors.email && touched.email ? errors.email : ""}
            onBlur={handleBlur}
          />

          <div className="grid md:grid-cols-3 gap-5">
            <Input
              placeholder="State"
              value={values.state}
              onChange={handleChange}
              name="state"
              error={errors.state && touched.state ? errors.state : ""}
              onBlur={handleBlur}
            />
            <Input
              placeholder="City"
              value={values.city}
              onChange={handleChange}
              name="city"
              error={errors.city && touched.city ? errors.city : ""}
              onBlur={handleBlur}
            />
            <Input
              placeholder="zip-code"
              value={values.zip_code}
              onChange={handleChange}
              name="zip_code"
              error={errors.zip_code && touched.zip_code ? errors.zip_code : ""}
              onBlur={handleBlur}
            />
          </div>
          <CheckBox
            className="lg:col-span-2 !mt-8"
            label={<span><span>{`I agree to Square’s`}</span> <span className="text-brand_blue-200 cursor-pointer">Cookie</span> and <span className="text-brand_blue-200 cursor-pointer">Privacy Policy.</span></span>}
          />
          <div className="flex items-center gap-2.5 mt-8 md:flex-row flex-col">
            <Button
              onClick={navigateToSignIn}
              type="button"
              className="md:flex-[0.3] bg-brand_gray-600 border-brand_gray-600 text-brand_gray-50"
            >
              Login
            </Button>
            <Button
              disabled={loading}
              type="submit"
              className="md:flex-[0.7]"
            >
              Get Started
            </Button>
          </div>
        </form>
        <div className="flex items-center mt-8">
          <div className="flex-1 border border-brand_gray-500 border-dashed "></div>
          <h1 className="text-brand_gray-100 font-Roboto  text-sm mx-3">
            Instant Signup
          </h1>
          <div className="flex-1 border border-brand_gray-500 border-dashed"></div>
        </div>
        <div className="flex items-center gap-2.5 mt-5 md:flex-nowrap flex-wrap">
          <LoginSocialGoogle
            className="w-full"
            client_id={
              process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ("" as string)
            }
            onReject={(reject: any) => {
              console.log({ reject });
            }}
            onResolve={async ({ data }) => {
              try {
                console.log({ data });
                dispatch(toggleFullScreenLoadingAction(true))
                const res = await googleLoginApi({
                  email: data?.email,
                  name: data?.name ?? "",
                });
                dispatch(
                  loginUser({
                    user: res.data.user,
                    token: res.data.token,
                  })
                );
                toast.success("Login successful");
                router.replace(URLS.HOME);
              } catch (error: any) {
                const err = handleApiError(error);
                toast.error(err);
              } finally {
                dispatch(toggleFullScreenLoadingAction(false))
              }
            }}
          >
            <Button className="bg-brand_red-600 border-brand_red-600 flex itecem justify-center gap-2 font-Poppins">
              <GoogleIcon className="fill-white" /> Continue with Google
            </Button>
          </LoginSocialGoogle>
          <LoginSocialFacebook
            className="w-full"
            appId={(process.env.NEXT_PUBLIC_FACEBOOK_APP_ID as string) || ""}
            onReject={(rject) => {
              toast.error("Something went wrong, try again later");
            }}
            onResolve={(data) => {
              console.log(data);
            }}
          >
            <Button className="bg-brand_blue-600 border-brand_blue-600 flex items-center justify-center gap-2 font-Poppins whitespace-nowrap">
              <Facebook className="fill-white" /> Continue with Facebook
            </Button>
          </LoginSocialFacebook>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;

interface RadioButtonProps {
  checked: boolean;
  onChange: () => void;
  title: string;
}
const RadioButton = ({ checked, onChange, title }: RadioButtonProps) => {
  return (
    <div
      onClick={onChange}
      className={cn(
        "bg-brand_green-200 px-3.5 py-3 rounded-10px flex items-center gap-x-3 cursor-pointer border",
        {
          "border-brand_green-200 ": checked,
          "border-brand_gray-500 bg-transparent": !checked,
        }
      )}
    >
      {checked ? (
        <RadioSelected className="fill-white" />
      ) : (
        <RadioUnselected className="fill-white" />
      )}
      <h1
        className={cn("font-Roboto text-sm text-black", {
          "text-white": checked,
        })}
      >
        {title}
      </h1>
    </div>
  );
};
