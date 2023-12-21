"use client";
import Footer from "@/layout/Footer";
import Navbar from "@/layout/Navbar";
import Sidebar from "@/layout/Sidebar";
import DarkDropdown from "@/ui/components/DarkDropdown";
// import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { Calender, Location, Share } from "../../../public/assets/assets/svg";
import HeartBadge from "@/ui/components/HeartBadge";
import DateSelectCard from "@/ui/components/DateSelectCard";
import SellerDescription from "@/ui/components/SellerDescription";
import { SUGGESTED } from "@/mock";
import ProductCard from "@/ui/components/ProductCard";
import ProductImages from "@/ui/components/ProductImages";
import BreadCrumbs from "@/ui/BreadCrumbs";
const Product = () => {
  const [isOpen, setisOpen] = useState(false);

  // const param = useSearchParams();
  // const path = param.get("product");
  const p =
    "JetFire German Style Pruner Set of 6 & Scissor, Gloves Garden Tool Kit  (7 Tools)";
  const toggleSideBar = () => {
    setisOpen(!isOpen);
  };

  return (
    <div className={`bg-[#F6F7FB] relative`}>
      <Sidebar
        close={() => {
          setisOpen(false);
        }}
        open={isOpen}
      />
      <Navbar toggleSideBard={toggleSideBar} />
      <div className="lg:w-8/12 flex flex-col gap-y-2 lg:gap-y-0 px-2 lg:flex-row md:px-[30px] md:pt-4 gap-x-6 items-center">
        <div className="w-full lg:w-4/12">
          <DarkDropdown placeholder="All Categories" />
        </div>
        <BreadCrumbs data={[{ title: "Home" }, { title: "Garden Tools" }, { title: "JetFire German Style Pruner Set of 6 & Scissor" }]} />
      </div>
      <div className=" flex flex-col lg:flex-row p-3 md:px-[30px] md:py-[15px] gap-x-6">
        <div className="lg:flex-[0.7] ">
          <div>
            <h2 className="pb-3 font-Roboto font-medium text-lg">{p}</h2>
            <div className="flex items-center gap-5">
              <div className="flex gap-3 items-center">
                <Calender />
                <span className="text-brand_gray-200 text-xs font-normal">
                  15 Sep 2019
                </span>
              </div>
              <div className="flex gap-3 items-center">
                <Location />
                <span className="text-brand_gray-200 text-xs font-normal">
                  George Colony, California
                </span>
              </div>
            </div>
          </div>
          <ProductImages />
        </div>
        <div className="flex-1 lg:flex-[0.3] overflow-hidden">
          <div className="flex justify-end items-center gap-5">
            <Share />
            <HeartBadge liked />
          </div>
          <DateSelectCard add={{} as any} />
        </div>
      </div>
      <div className="flex px-4 md:px-[30px]">
        <SellerDescription />
      </div>
      <div className="flex flex-col px-[30px] py-10 ">
        <h3 className="font-medium text-xl font-Roboto">Related Products</h3>
        <div className="grid md:grid-cols-4 gap-[10px] mt-[32px]">
          {SUGGESTED.slice(0, 4).map((el, index) => (
            <ProductCard
              key={index}
              liked={el.liked}
              // image={el.img}
              className={""}
              // sale={el.sale}
              // ShowLike={true}
              // isStars={false}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Product;
