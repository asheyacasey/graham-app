"use client";
import withAuth from "@/hooks/withAuth";
import Navbar from "@/layout/Navbar";
import Sidebar from "@/layout/Sidebar";
import AccountLayout from "@/layout/account";
import { changePasswordApi } from "@/services/auth.services";
import Common from "@/templates/Common";
import ProfileTemplate from "@/templates/Profile";
import Button from "@/ui/form/Button";
import Input from "@/ui/form/Input";
import { handleApiError } from "@/utils/hanldeApiError";
import { useFormik } from "formik";
import React, { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from 'yup'

const changePasswordValidator = Yup.object({
  oldPassword: Yup.string().required("Old password is required."),
  newPassword: Yup.string().min(8, "Password must be 8 digit long.").required("New password is required."),
  confirmPassword: Yup.string().required("Confirm password is required.").oneOf([Yup.ref("newPassword"), ""], "Confirm password must be same as new password.")
})
type ChangePasswordValues = Yup.InferType<typeof changePasswordValidator>
const ChangePassword = () => {
  const [loading, setloading] = useState(false)
  const [form, setForm] = useState({
    OldPassword: "Berlin",
    NewPassword: "Germany",
    ConfirmNewPassword: "Germany",
  });
  const { values, dirty, errors, handleChange, handleBlur, handleSubmit, handleReset, touched, resetForm } = useFormik({
    validationSchema: changePasswordValidator,
    initialValues: {
      confirmPassword: "",
      newPassword: "",
      oldPassword: ""
    } as ChangePasswordValues,
    onSubmit: async ({ confirmPassword, newPassword, oldPassword }) => {
      setloading(true)
      try {
        await changePasswordApi({
          oldPassword,
          newPassword,
        })
        toast.success("Password changed successfully")
        resetForm()
      } catch (error) {
        const err = handleApiError(error)
        toast.error(err)
      } finally {
        setloading(false)
      }
    }
  })
  return (
    <Common>
      <ProfileTemplate>
        <div className="">
          <AccountLayout >
            <form onSubmit={handleSubmit} className="h-max flex flex-col justify-center items-center">
              <div className="w-full md:w-7/12 lg:w-5/12 flex flex-col gap-5">
                <div className="w-full">
                  <label className="text-brand_gray-200 text-sm font-medium">
                    Old Password
                  </label>
                  <Input
                    placeholder="Enter Old Password"
                    className="border-[1.5px] border-brand_blue-500 text-black text-sm font-medium"
                    value={values.oldPassword}
                    onChange={handleChange}
                    name="oldPassword"
                    onBlur={handleBlur}
                    error={errors.oldPassword && touched.oldPassword ? errors.oldPassword : ""}
                  />
                </div>
                <div className="w-full">
                  <label className="text-brand_gray-200 text-sm font-medium">
                    New Password
                  </label>
                  <Input
                    placeholder="Enter New Password"
                    className="border-[1.5px] text-black text-sm border-brand_blue-500 font-medium"
                    value={values.newPassword}
                    onChange={handleChange}
                    name="newPassword"
                    onBlur={handleBlur}
                    error={errors.newPassword && touched.newPassword ? errors.newPassword : ""}
                  />
                </div>
                <div className="w-full">
                  <label className="text-brand_gray-200 text-sm font-medium">
                    Confirm New Password
                  </label>
                  <Input
                    placeholder="Enter New Password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    name="confirmPassword"
                    onBlur={handleBlur}
                    error={errors.confirmPassword && touched.confirmPassword ? errors.confirmPassword : ""}
                    className="border-[1.5px] text-black text-sm border-brand_blue-500 font-medium"
                  />
                </div>
              </div>
              <div className="flex flex-col items-center pt-5 gap-5 w-full lg:gap-0 md:w-7/12 lg:flex-row lg:justify-evenly lg:w-full lg:pt-10">
                <div className="w-full lg:w-min">
                  <Button disabled={!dirty || loading} type="submit" className="w-full lg:w-48">Save Password</Button>
                </div>
                <div className="w-full lg:w-min">
                  <Button onClick={handleReset} type="button" className="w-full lg:w-48 border-brand_blue-500 border-[1.5px] bg-white text-black">
                    Cancel
                  </Button>
                </div>
              </div>
            </form>
          </AccountLayout>
        </div>
      </ProfileTemplate>
    </Common>
  );
};

export default withAuth(ChangePassword);
