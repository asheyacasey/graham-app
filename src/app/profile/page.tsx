"use client";
import AccountLayout from "@/layout/account";
import Button from "@/ui/form/Button";
import Input from "@/ui/form/Input";
import Image from "next/image";
import React, { useState } from "react";
import { Edit } from "../../../public/assets/assets/svg";
import Common from "@/templates/Common";
import ProfileTemplate from "@/templates/Profile";
import withAuth from "@/hooks/withAuth";
import { useFormik } from "formik";
import * as Yup from 'yup'
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Select from "@/ui/form/Select";
import { handleApiError } from "@/utils/hanldeApiError";
import { toast } from "react-toastify";
import { updateProfileImageApi, updateUserProfileApi } from "@/services/user.services";
import { loginUser, updateUserAction } from "@/redux/slices/auth";
import { IconComponent } from "@/ui/Icon";
import { fileIntoBase64 } from "@/utils/fileIntoBase64";
import ImageWithFallback from "@/ui/ImageWithFallback";
const profileSchema = Yup.object({
  username: Yup.string().required("Username is required."),
  fullName: Yup.string().required("Username is required."),
  email: Yup.string().required("Email is required.").email("Invalid email."),
  phoneNumber: Yup.string().required("Phone number is required."),
  country: Yup.string().required("Country is required"),
  city: Yup.string().required("City is required"),
  zip_code: Yup.string().required("Zip code is required"),
  state: Yup.string().required("State is required"),
})
type ProfileValues = Yup.InferType<typeof profileSchema>
const Profile = () => {
  const [profileImage, setprofileImage] = useState<File | null>(null)
  const [imageUploading, setimageUploading] = useState(false)
  const [loading, setloading] = useState(false)
  const authState = useAppSelector((s) => s.auth)
  const dispatch = useAppDispatch()
  const { values, errors, touched, handleBlur, setValues, handleSubmit, dirty, handleChange, resetForm } = useFormik({
    validationSchema: profileSchema,
    initialValues: {
      city: authState.user?.city ?? "",
      country: authState.user?.country,
      email: authState.user?.email,
      fullName: authState.user?.fullName,
      phoneNumber: authState.user?.phoneNumber,
      state: authState.user?.state,
      username: authState.user?.username,
      zip_code: authState.user?.zip_code
    } as ProfileValues,
    enableReinitialize: true,
    onSubmit: async ({ city, country, email, fullName, phoneNumber, state, username, zip_code }) => {
      try {
        setloading(true)
        const res = await updateUserProfileApi({
          country,
          phoneNumber,
          city,
          fullName,
          state,
          zip_code,
        })
        dispatch(loginUser({
          user: res.data.user,
          token: authState.token as string
        }))
        toast.success("Profile updated")
      } catch (error: any) {
        const err = handleApiError(error)
        toast.error(err)
      } finally {
        setloading(false)
      }
    }
  })
  console.log({ errors })
  const handleUpdateProfileImage = async () => {
    try {
      setimageUploading(true)
      if (!profileImage) {
        toast.error("Select profile image.")
        setprofileImage(null)
        return
      }
      const base64Image = await fileIntoBase64(profileImage)
      const res = await updateProfileImageApi({
        image: base64Image
      })
      dispatch(updateUserAction({ profile_image: res.data }))
      toast.success("Profile image updated successfully")
      setprofileImage(null)
    } catch (error: any) {
      const err = handleApiError(error)
      toast.error(err)
    } finally {
      setimageUploading(false)
    }
  }
  return (
    <Common>
      <ProfileTemplate>
        <div>
          <AccountLayout className="h-max flex flex-col lg:flex-row">
            <div className="w-full lg:w-3/12 flex justify-center h-min ">
              <div className="relative">
                <div className="relative w-40 h-40">
                  {
                    <ImageWithFallback
                      className="w-full h-full rounded-full"
                      src={profileImage ? URL.createObjectURL(profileImage) : authState.user?.profile_image} alt=""
                    />
                  }
                  <div className="absolute right-0 bottom-3 rounded-full h-10 w-10 bg-brand_yellow-500 flex items-center justify-center">
                    <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
                      <input onChange={(e) => {
                        if (!e.target.files) {
                          return;
                        }
                        setprofileImage(e.target.files[0])
                      }}
                        type="file"
                        className="absolute w-full h-full opacity-0"
                      />
                      <Edit />
                    </div>
                  </div>
                </div>
                {
                  profileImage &&
                  <Button className="mt-1" onClick={handleUpdateProfileImage} disabled={!profileImage || imageUploading}>Upload</Button>
                }
              </div>
            </div>
            <form onSubmit={handleSubmit} className="w-full lg:w-9/12 font-Montserrat space-y-5">
              <div className="flex flex-col lg:flex-row w-full gap-5">
                <div className="w-full">
                  <label className="text-brand_gray-200 text-sm font-medium">
                    Username
                  </label>
                  <Input
                    disabled
                    placeholder="Enter Username"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.username && touched.username ? errors.username : ""}
                    className="border-[1.5px] text-black text-sm border-brand_blue-500  font-medium"
                  />
                </div>
                <div className="w-full">
                  <label className="text-brand_gray-200 text-sm font-medium">
                    Full Name
                  </label>
                  <Input
                    name="fullName"
                    placeholder="Enter Full name"
                    className="border-[1.5px] text-black text-sm border-brand_blue-500  font-medium"
                    value={values.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.username && touched.username ? errors.username : ""}
                  />
                </div>
              </div>
              <div className="flex flex-col lg:flex-row w-full gap-5">
                <div className="w-full">
                  <label className="text-brand_gray-200 text-sm font-medium">
                    Email
                  </label>
                  <Input
                    disabled
                    name="email"
                    placeholder="Enter Email"
                    className="border-[1.5px] text-black text-sm border-brand_blue-500  font-medium"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.email && touched.email ? errors.email : ""}
                  />
                </div>
                <div className="w-full">
                  <label className="text-brand_gray-200 text-sm font-medium">
                    Mobile No.
                  </label>
                  <Input
                    name="phoneNumber"
                    placeholder="Enter Mobile No"
                    className="border-[1.5px] text-black text-sm border-brand_blue-500  font-medium"
                    value={values.phoneNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.phoneNumber && touched.phoneNumber ? errors.phoneNumber : ""}
                  />
                </div>
              </div>
              <div className="flex flex-col lg:flex-row w-full gap-5">
                <div className="w-full">
                  <label className="text-brand_gray-200 text-sm font-medium">
                    City
                  </label>
                  <Input
                    placeholder="Enter City"
                    className="border-[1.5px] text-black text-sm border-brand_blue-500  font-medium"
                    name="city"
                    value={values.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.city && touched.city ? errors.city : ""}
                  />
                </div>
                <div className="w-full">
                  <label className="text-brand_gray-200 text-sm font-medium">
                    Zip Code
                  </label>
                  <Input
                    name="zip_code"
                    placeholder="Enter Zip Code"
                    className="border-[1.5px] text-black text-sm border-brand_blue-500  font-medium"
                    value={values.zip_code}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.zip_code && touched.zip_code ? errors.zip_code : ""}
                  />
                </div>
              </div>
              <div className="flex flex-col lg:flex-row w-full gap-5">
                <div className="w-full">
                  <label className="text-brand_gray-200 text-sm font-medium">
                    State
                  </label>
                  <Input
                    name="state"
                    placeholder="Enter State"
                    className="border-[1.5px] border-brand_blue-500 text-black text-sm font-medium"
                    value={values.state}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.state && touched.state ? errors.state : ""}
                  />
                </div>
                <div className="w-full">
                  <label className="text-brand_gray-200 text-sm font-medium">
                    Country
                  </label>
                  <Select
                    error={errors.country && touched.country ? errors.country : ""}
                    onBlur={handleBlur('country')}
                    placeholder="Select Country"
                    className="w-full react-notification-select text-black text-sm font-Poppins font-medium"
                    classNamePrefix="react-select-notification"
                    options={[{ label: "pakistan", value: 'pakistan' }]}
                    value={{ label: values.country, value: values.country }}
                    onChange={(value: any) => {
                      setValues((prev) => ({ ...prev, country: value.value }))
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col lg:flex-row justify-evenly gap-5 w-full lg:gap-0 pt-5 lg:pt-10">
                <div className="w-full lg:w-min">
                  <Button type="submit" disabled={!dirty || loading} className="w-full lg:w-48">Save Changes</Button>
                </div>
                <div className="w-full lg:w-min">
                  <Button onClick={() => { resetForm() }} type="button" className="w-full lg:w-48 border-brand_blue-500 border-[1.5px] bg-white text-black">
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

export default withAuth(Profile);
