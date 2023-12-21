import Button from "@/ui/form/Button";
import CheckBox from "@/ui/form/CheckBox";
import Input from "@/ui/form/Input";
import PhoneInput from "@/ui/form/PhoneInput";
import Select from "@/ui/form/Select";
import { useFormik } from "formik";
import React, { useState } from "react";
import { LoginValues, loginSchema } from "./utils";
import { GoogleIcon } from "@/ui/Icon";
import { Facebook } from "@/ui/Icon";
import { useRouter } from "next/navigation";
import { URLS } from "@/utils/URLS";
import { useAppDispatch } from "@/redux/hooks";
import { loginUser, toggleLoading } from "@/redux/slices/auth";
import httpCommon from "@/services/httpCommon";
import { handleApiError } from "@/utils/hanldeApiError";
import { toast } from "react-toastify";
import { googleLoginApi, loginApi } from "@/services/auth.services";
import {
  IResolveParams,
  LoginSocialFacebook,
  LoginSocialGoogle,
  objectType,
} from "reactjs-social-login";
import { toggleFullScreenLoadingAction } from "@/redux/slices/app";
const LoginForm = () => {
  const [loading, setloading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [rememberMe, setrememberMe] = useState(false);
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
      email: "",
      password: "",
    } as LoginValues,
    validationSchema: loginSchema,
    onSubmit: async (formValues) => {
      try {
        setloading(true);
        const res = await loginApi(formValues);
        if (res?.data?.requiredVerification) {
          toast.success("Verification code sent to your email.");
          router.push(`${URLS.VERIFY_OTP}?email=${formValues.email}`);
        } else {
          dispatch(
            loginUser({
              user: res.data.user,
              token: res.data.token,
            })
          );
          toast.success("Login successful");
          router.replace(URLS.HOME);
        }
      } catch (error: any) {
        const err = handleApiError(error);
        toast.error(err);
      } finally {
        setloading(false);
      }
    },
  });
  const navigateToSignUpPage = () => {
    router.push(URLS.REGISTER);
  };
  const navigateToForgetPasswordPage = () => {
    router.push(URLS.FORGET_PASSWORD);
  };
  return (
    <div>
      <h1 className="md:text-6xl text-4xl font-bold tracking-[0.233px] font-Poppins text-center">
        Sign In
      </h1>
      <p className="text-black font-Roboto text-base tracking-[0.1px] w-full mt-5 text-center">
        Just sign in if you have an account in here. Enjoy our Website
      </p>
      {/* container */}
      <div className="bg-white py-10 px-8 rounded-20px mt-10">
        <form onSubmit={handleSubmit}>
          <div className="space-y-5">
            <Input
              value={values.email}
              onBlur={handleBlur}
              error={errors.email && touched.email ? errors.email : ""}
              placeholder="Mail address"
              name="email"
              onChange={handleChange}
            />
            <Input
              value={values.password}
              onBlur={handleBlur}
              error={errors.password && touched.password ? errors.password : ""}
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <div className="flex items-center justify-between gap3">
              {/* TODO: Remember me  */}
              {/* <CheckBox
                checked={rememberMe}
                onChange={() => {
                  setrememberMe(!rememberMe);
                }}
                label="Remember me"
              /> */}
              <h1
                onClick={navigateToForgetPasswordPage}
                className="font-Roboto text-xs tracking-[0.1px] text-brand_blue-200 font-medium cursor-pointer
          "
              >
                Forgot Password
              </h1>
            </div>
          </div>
          <Button disabled={loading} type="submit" className="mt-8">
            Login
          </Button>
        </form>
        <div
          onClick={navigateToSignUpPage}
          className="cursor-pointer mt-8 bg-blue-50 h-12 flex items-center justify-center rounded-b-[30px] w-[80%] mx-auto"
        >
          <h1 className="text-blue-600 text-sm font-medium font-Roboto text-center">{`If you don’t have an account? Register here`}</h1>
        </div>
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
            onReject={(reject) => {
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

export default LoginForm;
