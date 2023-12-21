"use client";
import React, { useState } from "react";
import { Box, Calender, CalenderAlt, Diamond, Door, Location, Share } from "../../../../public/assets/assets/svg";
import ProductImages from "@/ui/components/ProductImages";
import Common from "@/templates/Common";
import { CreateAddValues } from "@/layout/post-new-add/utils";
import { URLS } from "@/utils/URLS";
import BreadCrumbs from "@/ui/BreadCrumbs";
import DarkDropdown from "@/ui/components/DarkDropdown";
import SellerDescription from "@/ui/components/SellerDescription";
import ImageWithFallback from "@/ui/ImageWithFallback";
import { useAppSelector } from "@/redux/hooks";
import moment from "moment";
import StaticMap from "@/ui/StaticMap";
import { formatCurrency } from "@/utils/formatCurrency";
import HeartBadge from "@/ui/components/HeartBadge";
import DateSelectCard from "@/ui/components/DateSelectCard";
import Select from "@/ui/form/Select";
import Button from "@/ui/form/Button";
const Product = () => {
    const authState = useAppSelector((s) => s.auth)
    const [add, setadd] = useState<CreateAddValues | null>(null)
    React.useEffect(() => {
        const item = localStorage.getItem('preview_add')
        if (item) {
            setadd(JSON.parse(item))
        }
    }, [])
    if (!add) {
        return <div>No preview available</div>
    }
    return (
        <Common>
            <div className={`bg-[#F6F7FB] relative`}>
                <div className="lg:w-8/12 flex flex-col gap-y-2 lg:gap-y-0 px-2 lg:flex-row md:px-[30px] md:pt-4 gap-x-6 items-center">
                    <div className="w-full lg:w-4/12">
                        <DarkDropdown placeholder="All Categories" />
                    </div>
                    <BreadCrumbs data={[{ title: "Home", route: URLS.HOME }, { title: add?.category ?? '', route: `${URLS.CATEGORY}?cat=${add?.category}` }, { title: add?.add_title ?? '' }]} />
                </div>
                <div className=" flex flex-col lg:flex-row p-3 md:px-[30px] md:py-[15px] gap-x-6">
                    <div className="lg:flex-[0.7]">
                        <div>
                            <h2 className="pb-3 font-Roboto font-medium text-lg">{add?.add_title}</h2>
                            <div className="flex items-center gap-5">
                                <div className="flex gap-3 items-center">
                                    <Calender />
                                    {/* <span className="text-brand_gray-200 text-xs font-normal">
                                        {moment(add?.createdAt).format('DD MMM YYYY')}
                                    </span> */}
                                </div>
                                <div className="flex gap-3 items-center">
                                    <Location />
                                    <span className="text-brand_gray-200 text-xs font-normal">
                                        {add?.location.street_no_1}, {add?.location.city}
                                    </span>
                                </div>
                            </div>
                        </div>
                        {
                            add?.images && add.images.length > 0 && (
                                // @ts-ignore
                                <ProductImages images={add.images} />
                            )
                        }
                    </div>
                    <div className="flex-1 lg:flex-[0.3] lg:mt-0 mt-5  rounded-lg h-max">
                        <div className="flex justify-end items-center gap-5">
                            <Share className='cursor-pointer' />
                            <HeartBadge onClick={() => { }} liked={false} />
                        </div>
                        <div className="flex-1 lg:flex-[0.3] lg:mt-0 mt-5">

                            {/* *********************************** */}
                            <div className="p-3 mt-10 bg-white rounded-md">
                                <h2 className="font-Roboto font-medium text-lg lowercase">{formatCurrency(add.prices.rent_price)} / {add.prices.rented_as}</h2>
                                <div className="flex flex-col w-full rounded-md border-2 border-black ">
                                    <div className="border-b-2 flex  border-black">
                                        <div className="border-black border-r-2 w-full">
                                            <div className="flex w-full flex-col py-2 px-2">
                                                <label className="text-xs text-brand_gray-200 uppercase font-Roboto">
                                                    Date From
                                                </label>
                                                <input
                                                    className="outline-none font-medium h-5 text-sm"
                                                    type={'date'}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex w-full flex-col py-2 px-2">
                                            <label className="text-xs text-brand_gray-200 uppercase font-Roboto">
                                                Date To
                                            </label>
                                            <input
                                                className="outline-none font-medium h-5 text-sm"
                                                type={'date'}
                                            />
                                        </div>
                                    </div>
                                    <div className=" flex border-black">
                                        <div className="border-black border-r-2 w-full">
                                            <div className="flex w-full flex-col py-2 px-2">
                                                <label className="text-xs text-brand_gray-200 uppercase font-Roboto">
                                                    Time From
                                                </label>
                                                <input
                                                    className="outline-none font-medium h-5 text-sm"
                                                    type={'time'}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex w-full flex-col py-2 px-2">
                                            <label className="text-xs text-brand_gray-200 uppercase font-Roboto">
                                                Time To
                                            </label>
                                            <input
                                                className="outline-none font-medium h-5 text-sm"
                                                type={'time'}
                                            />
                                        </div>
                                    </div>
                                    <div className="border-t-2  border-black">
                                        <span className="pt-2 ml-2 text-sm font-Roboto font-medium text-brand_gray-200">
                                            Stock
                                        </span>
                                        <Select
                                            className=" w-full react-stock-select"
                                            classNamePrefix="react-select-stock"
                                            styles={{
                                                singleValue: (newstyles:any) => ({
                                                    ...newstyles,
                                                    fontWeight: "600",
                                                }),
                                            }}
                                            options={[]}
                                            components={{
                                                IndicatorSeparator: () => null,
                                                DownChevron: () => <div></div>,
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-5 my-4">
                                    <Button type="button" className="bg-brand_yellow-500 h-10 border-none p-0 text-sm font-Montserrat font-medium">
                                        Book
                                    </Button>
                                    <Button
                                        type="button" className="bg-white border-2 border-brand_gray-200 h-10 p-0 font-medium font-Montserrat text-brand_gray-200 ">
                                        Add to Cart
                                    </Button>
                                </div>
                                <p className="text-sm font-medium text-center text-brand_gray-200">
                                    {`You won't be charged yet`}
                                </p>
                                <div className="flex flex-col gap-3 my-3">
                                    <div className="flex justify-between text-sm font-Montserrat font-semibold">
                                        <span>1 kit x 1 x 1</span>
                                        <span>1</span>
                                    </div>
                                    <div className="flex justify-between text-sm font-Montserrat font-semibold">
                                        <span>Service Fees</span>
                                        <span>{formatCurrency(add.prices.service_fee!)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm font-Montserrat font-semibold">
                                        <span>Occupancy Taxes & Fees</span>
                                        <span>{formatCurrency(add.prices.taxes!)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm font-Montserrat font-semibold">
                                        <span>Security Fees</span>
                                        <span>{formatCurrency(add.payment_policy.amount)}</span>
                                    </div>
                                </div>
                                <div className="bg-brand_gray-200 w-full h-[1px] " />
                                <div className="flex justify-between text-sm font-Montserrat font-semibold my-2">
                                    <span>Total</span>
                                    <span>{formatCurrency(12)}</span>
                                </div>
                            </div>
                            {/* *********************************** */}
                        </div>
                    </div>
                </div>
                <div className="flex px-4 md:px-[30px]">
                    <div className="lg:flex-[0.68] w-full  flex-col gap-10 flex font-Roboto pt-20">
                        <div className=" p-3 bg-white rounded-lg flex w-full flex-col gap-3">
                            <h3 className="text-brand_gray-200 text-lg  font-medium">
                                Seller Description
                            </h3>
                            <div className="flex items-center flex-wrap md:justify-start justify-center  gap-8">
                                <ImageWithFallback
                                    className="rounded-full w-[70px] h-[70px]"
                                    alt="seller"
                                    src={authState.user?.profile_image}
                                />
                                <div>
                                    <h4 className="font-medium text-xl">{authState.user?.username}</h4>
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
                                    {add.product_details}
                                </div>

                                <div className="w-full lg:w-7/12  ">
                                    <h4 className="text-xl font-medium">About this Product</h4>
                                    {add.about_product}
                                </div>
                            </div>
                            <div className="w-full font-Roboto flex flex-col md:flex-row gap-5">
                                <div className="w-full lg:w-5/12">
                                    <h4 className="text-xl font-medium">Things to Know</h4>
                                    {add.things_to_know}
                                </div>
                                <div className="lg:w-4/12 w-full flex flex-col gap-2">
                                    <h4 className="text-xl font-medium">Other Details</h4>
                                    <div className="flex gap-1 flex-col">
                                        {add && add.customDetails && add.customDetails.map((item, index) => {
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
                                    lat: add.location.lat,
                                    lng: add.location.long
                                }} />
                            </div>
                            <h3 className="text-sm font-medium ">
                                {add.location.street_no_1}, {add.location.city}, {add.location.country}
                            </h3>
                        </div>
                        <div className="w-full  ">
                            <h4 className="text-xl font-medium">Cancellation Policy</h4>
                            {add.cancellation_policy}
                        </div>
                        <div className="w-full h-[2px] bg-brand_gray-200" />
                    </div >
                </div>
                <div className="flex flex-col px-[30px] py-10 ">

                </div>
            </div>
        </Common>
    );
};

export default Product;
