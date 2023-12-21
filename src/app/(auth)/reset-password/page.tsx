"use client";
import { resetPasswordApi } from "@/services/auth.services";
import Button from "@/ui/form/Button";
import Input from "@/ui/form/Input";
import { URLS } from "@/utils/URLS";
import { handleApiError } from "@/utils/hanldeApiError";
import { useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

const resetPasswordSchema = Yup.object({
  password: Yup.string().required("Password is required."),
  confirmPassword: Yup.string()
    .required('Confirm password is required.')
    .oneOf(
      [Yup.ref("password"), ""],
      "Confirm password must same as password."
    ),
});
type ResetPasswordValues = Yup.InferType<typeof resetPasswordSchema>;
const ResetPassword = () => {
  const router = useRouter()
  const [loading, setloading] = useState(false)
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const { values, handleChange, handleBlur, errors, handleSubmit, touched } =
    useFormik({
      initialValues: {
        password: "",
        confirmPassword: "",
      } as ResetPasswordValues,
      validationSchema: resetPasswordSchema,
      onSubmit: async (formValues) => {
        try {
          setloading(true)
          await resetPasswordApi({
            password: formValues.password,
            reset_token: token
          })
          toast.success("Password changed successfully")
          router.push(URLS.LOGIN)
        } catch (error: any) {
          const err = handleApiError(error)
          toast.error(err)
        } finally {
          setloading(false)
        }
      },
    });
  return (
    <div className="bg-brand_yellow-500 min-h-screen flex items-center justify-center">
      <div className="lg:w-[40%]  md:w-[75%] w-[90%]">
        <Link href={URLS.LOGIN}>
          <Image
            width={80}
            height={80}
            alt=""
            src={"/assets/images/logo.svg"}
            className="object-contain mx-auto rounded-lg"
          />
        </Link>
        <h1 className="font-Poppins md:text-6xl text-4xl mt-8 font-bold text-black tracking-[0.233px] text-center">
          Reset Password
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-20px px-7 py-10 mt-10"
        >
          <Input
            value={values.password}
            name="password"
            error={errors.password && touched.password ? errors.password : ""}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Password"
          />
          <Input
            value={values.confirmPassword}
            name="confirmPassword"
            error={
              errors.confirmPassword && touched.confirmPassword
                ? errors.confirmPassword
                : ""
            }
            onChange={handleChange}
            onBlur={handleBlur}
            className="mt-8"
            placeholder="Confirm password"
          />
          <Button disabled={loading} className="mt-8">Reset Password</Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
