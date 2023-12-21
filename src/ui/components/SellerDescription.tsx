import React from "react";
import {
  Box,
  CalenderAlt,
  Diamond,
  Door,
} from "../../../public/assets/assets/svg";
import { IAdd } from "@/types";
import ImageWithFallback from "../ImageWithFallback";
import moment from "moment";
import StaticMap from "../StaticMap";

interface SellerDescriptionProps {
  add?: IAdd
  totalProducts?: number
}
const SellerDescription = ({ add, totalProducts }: SellerDescriptionProps) => {
  return (
    <div className="lg:flex-[0.68] w-full  flex-col gap-10 flex font-Roboto pt-20">
      <div className=" p-3 bg-white rounded-lg flex w-full flex-col gap-3">
        <h3 className="text-brand_gray-200 text-lg  font-medium">
          Seller Description
        </h3>
        <div className="flex items-center flex-wrap md:justify-start justify-center  gap-8">
          <ImageWithFallback
            className="rounded-full w-[70px] h-[70px]"
            alt="seller"
            src={add?.created_by?.profile_image}
          />
          <div>
            <h4 className="font-medium text-xl">{add?.created_by?.username}</h4>
            <span className="text-xs text-brand_gray-200 font-medium">
              Member since {moment(add?.created_by?.createdAt).format('MMM YYYY')}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <h5 className="text-brand_gray-200 text-xl ">Product</h5>
            <span className="text-lg font-medium">{totalProducts}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-5 w-full">
        <div className="flex w-full items-start gap-3">
          <div className="w-10 h-10">
            <Box />
          </div>
          <div className="flex flex-col w-full ">
            <span className="font-medium text-sm">Entire Product</span>
            <span className="text-xs  text-brand_gray-200">
              {`You’ll have the Product to yourself.`}
            </span>
          </div>
        </div>
        <div className="flex w-full items-start gap-3">
          <div className="w-10 h-10">
            <Diamond />
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-sm">Enhanced Clean</span>
            <span className="text-xs text-brand_gray-200">
              This host has committed to graham 5-step enhanced cleaning process
            </span>
          </div>
        </div>
        <div className="flex w-full items-start gap-3">
          <div className="w-10 h-10">
            <Door />
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-sm">Self check-in</span>
            <span className="text-xs text-brand_gray-200">
              You can check in with the doorperson.
            </span>
          </div>
        </div>
        <div className="flex w-full items-start gap-3">
          <div className="w-10 h-10">
            <CalenderAlt />
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-sm">
              Free cancellation before 25 Sep
            </span>
          </div>
        </div>
      </div>
      <div className="w-full h-[2px] bg-brand_gray-800" />
      <div className="flex flex-col gap-10">
        <div className="font-Roboto flex flex-col lg:flex-row gap-5">
          <div className="lg:w-5/12 w-full">
            <h4 className="text-xl font-medium">Product Details</h4>
            {add?.product_details}
          </div>

          <div className="w-full lg:w-7/12  ">
            <h4 className="text-xl font-medium">About this Product</h4>
            {add?.about_product}
          </div>
        </div>
        <div className="w-full font-Roboto flex flex-col md:flex-row gap-5">
          <div className="w-full lg:w-5/12">
            <h4 className="text-xl font-medium">Things to Know</h4>
            {add?.things_to_know}
          </div>
          <div className="lg:w-4/12 w-full flex flex-col gap-2">
            <h4 className="text-xl font-medium">Other Details</h4>
            <div className="flex gap-1 flex-col">
              {add?.customDetails.map((item, index) => {
                if (item.label) {
                  return <div
                    key={index}
                    className=" flex items-center justify-between w-full"
                  >
                    <span className="w-full text-sm font-medium">
                      {item.label}
                    </span>
                    <span className="flex justify-start text-xs w-full text-brand_gray-200">
                      {item.value}
                    </span>
                  </div>
                } else {
                  return null
                }

              })}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-5 rounded-lg font-Roboto flex flex-col gap-5">
        <h3 className="text-xl font-medium">Where you’ll be</h3>
        <div className="w-full h-80">
          <StaticMap center={{
            lat: add?.location.lat!,
            lng: add?.location.long!
          }} />
        </div>
        <h3 className="text-sm font-medium ">
          {add?.location.street_no_1}, {add?.location.city}, {add?.location.country}
        </h3>
      </div>
      <div className="w-full  ">
        <h4 className="text-xl font-medium">Cancellation Policy</h4>
        {add?.cancellation_policy}
      </div>
      <div className="w-full h-[2px] bg-brand_gray-200" />
    </div >
  );
};

export default SellerDescription;
