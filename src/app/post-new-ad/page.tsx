"use client";
import Common from "@/templates/Common";
import Button from "@/ui/form/Button";
import React, { useState, useCallback, useEffect } from "react";
import ListingLocation from "../../layout/post-new-add/Form/ListingLocation";
import PublishYourAddWithBenefits from "@/layout/post-new-add/PublishYourAddWithBenefits";
import PublishAdActions from "@/layout/post-new-add/Form/PublishAdActions";
import useCreateAddForm from "@/hooks/useCreateAddForm";
import DetailSection from "@/layout/post-new-add/Form/DetailSection";
import PriceSection from "@/layout/post-new-add/Form/PriceSection";
import CategorySection from "@/layout/post-new-add/Form/CategorySection";
import VendorDetails from "@/layout/post-new-add/Form/VendorDetails";
import PaymentPolicty from "@/layout/post-new-add/Form/PaymentPolicty";
import ProductDetails from "@/layout/post-new-add/Form/ProductDetails";
import CustomDetails from "@/layout/post-new-add/Form/CustomDetails";
import { useSearchParams } from "next/navigation";
// import { toast } from "react-toastify";
import withAuth from "@/hooks/withAuth";
import { getSingleAddApi } from "@/services/add.services";
import { useAppDispatch } from "@/redux/hooks";
import { toggleFullScreenLoadingAction } from "@/redux/slices/app";
import { IAdd } from "@/types";
const PostNewAd = () => {
  const [singleAddForUpdation, setsingleAddForUpdation] = useState<null | IAdd>(null)
  const dispatch = useAppDispatch()
  const searchParams = useSearchParams()
  const formHandler = useCreateAddForm(singleAddForUpdation)
  console.log('errors', formHandler.errors)
  // SCROLL TO THE ERROR FIELD
  useEffect(() => {
    if (Object.values(formHandler.errors) && formHandler.isSubmitting) {
      let firstErrorKey = Object.keys(formHandler.errors)[0]
      // @ts-ignore
      if (typeof formHandler.errors[`${firstErrorKey}`] === 'object') {
        // @ts-ignore
        firstErrorKey = `${firstErrorKey}_${Object.keys(formHandler.errors[firstErrorKey])[0]}`
      }
      const errorElement = document.querySelector(`#${firstErrorKey}`);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: "smooth", block: 'center', inline: "center" })
      }
    }
  }, [formHandler.errors, formHandler.isSubmitting])
  // SCROLL TO THE ERROR FIELD
  const addID = searchParams.get("add_id")
  const GetSingleAddForUpdate = useCallback(async () => {
    if (!addID) {
      return;
    }
    try {
      dispatch(toggleFullScreenLoadingAction(true))
      const { data } = await getSingleAddApi(addID as string)
      setsingleAddForUpdation(data)
    } catch (error) {

    } finally {
      dispatch(toggleFullScreenLoadingAction(false))
    }
  }, [addID, dispatch])
  useEffect(() => {
    GetSingleAddForUpdate()
  }, [GetSingleAddForUpdate])
  return (
    <Common>
      <div>
        <div className="flex flex-col items-center gap-3 md:gap-10 md:flex-row ">
          <Button type="button" className="md:w-5/12 lg:w-3/12">My Account</Button>
          <p className="font-Roboto text-sm ">{`Home / Post add`}</p>
        </div>
        <DetailSection  {...formHandler} />
        <PriceSection {...formHandler} />
        <CategorySection {...formHandler} />
        <VendorDetails  {...formHandler} />
        <PaymentPolicty {...formHandler} />
        <ProductDetails {...formHandler} />
        <CustomDetails {...formHandler} />
        <div className="my-5 h-full space-y-7">
          <label className="font-semibold font-Montserrat ">
            Listing Location
          </label>
          <ListingLocation {...formHandler} />
        </div>
        <div className="my-5 space-y-7">
          <label className="font-semibold font-Montserrat ">
            Publish your Ad with Benefit{" "}
            <span className="text-brand_red-600">(Recommended)</span>
          </label>
          <PublishYourAddWithBenefits editing={addID ? true : false} {...formHandler} />
        </div>
        <div className="my-5 space-y-7">
          <label className="font-semibold font-Montserrat ">
            Publish your ad
          </label>
          <PublishAdActions {...formHandler} />
        </div>
      </div>
    </Common>
  );
};

export default withAuth(PostNewAd);