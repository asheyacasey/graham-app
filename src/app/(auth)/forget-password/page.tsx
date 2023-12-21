"use client";
import { forgetPasswordApi } from "@/services/auth.services";
import Button from "@/ui/form/Button";
import Input from "@/ui/form/Input";
import { URLS } from "@/utils/URLS";
import { handleApiError } from "@/utils/hanldeApiError";
import { useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

const forgetPasswordSchema = Yup.object({
  email: Yup.string()
    .email("Invalid Mail ID.")
    .required("Mail ID is required."),
});

type ForgetPasswordValues = Yup.InferType<typeof forgetPasswordSchema>;
const ForgetPassword = () => {
  const [loading, setloading] = useState(false)
  const router = useRouter();
  const { values, handleChange, handleBlur, touched, errors, handleSubmit } =
    useFormik({
      validationSchema: forgetPasswordSchema,
      initialValues: { email: "" } as ForgetPasswordValues,
      onSubmit: async (submitValues) => {
        try {
          setloading(true)
          await forgetPasswordApi({
            email: submitValues.email
          })
          toast.success('Password reset link has been sent to you email address.')
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
          Forgot Password
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-20px px-7 py-10 mt-10"
        >
          <Input
            value={values.email}
            onChange={handleChange}
            name="email"
            placeholder="Enter Mail ID"
            error={errors.email && touched.email ? errors.email : ""}
          />
          <Button
            type="submit"
            className="mt-8"
            onClick={() => {
              router;
            }}
          >
            Forgot Password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
