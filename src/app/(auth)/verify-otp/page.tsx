"use client";
import { verifyOTPApi } from "@/services/auth.services";
import Button from "@/ui/form/Button";
import Input from "@/ui/form/Input";
import { URLS } from "@/utils/URLS";
import { handleApiError } from "@/utils/hanldeApiError";
import { useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

const otpSchema = Yup.object({
  otp: Yup.string().required("OTP is required.")
});

type ForgetPasswordValues = Yup.InferType<typeof otpSchema>;
const VerifyOTP = () => {
  const searchParams = useSearchParams()
  const email = searchParams.get("email")
  const [loading, setloading] = useState(false)
  const router = useRouter();
  const { values, handleChange, handleBlur, touched, errors, handleSubmit } =
    useFormik({
      validationSchema: otpSchema,
      initialValues: { otp: "" } as ForgetPasswordValues,
      onSubmit: async ({ otp }) => {
        try {
          setloading(true)
          await verifyOTPApi({
            email:email,
            otp,
          })
          toast.success("Verified successfully")
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
          Verify Yourself
        </h1>
        <h1 className="font-Poppins text-center mt-6 text-xs">We have sent verification code to <span className="font-bold">{email}</span></h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-20px px-7 py-10 mt-10"
        >
          <Input
            value={values.otp}
            onChange={handleChange}
            name="otp"
            placeholder="Enter your verification code"
            error={errors.otp && touched.otp ? errors.otp : ""}
          />
          <Button
            disabled={loading}
            type="submit"
            className="mt-8"
          >
            Verify
          </Button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;
