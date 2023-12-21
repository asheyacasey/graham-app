"use client";
import Footer from "@/layout/Footer";
import Navbar from "@/layout/Navbar";
import Sidebar from "@/layout/Sidebar";
import { productsDAta } from "@/mock";
import BreadCrumbs from "@/ui/BreadCrumbs";
import ProductCard from "@/ui/components/ProductCard";
import ProfileCard from "@/ui/components/ProfileCard";
import React, { useState } from "react";

const BusinessProfile = () => {
  const [isOpen, setisOpen] = useState(false);
  const toggleSideBar = () => {
    setisOpen(!isOpen);
  };
  return (
    <div>
      <Sidebar
        close={() => {
          setisOpen(false);
        }}
        open={isOpen}
      />
      <Navbar toggleSideBard={toggleSideBar} />
      <div className="px-30 py-5 bg-brand_white-500">
        <BreadCrumbs className="font-Montserrat font-bold" fontSize={24} data={[{ title: "Business Profile" }, { title: "Lenora Fowler" }]} />
        <div className="flex flex-col lg:flex-row py-5 gap-5">
          <div className="w-full self-center lg:self-start lg:w-3/12">
            <ProfileCard />
          </div>
          <div className="w-full self-center lg:self-start lg:w-9/12">
            <div className="grid md:grid-cols-2  lg:grid-cols-3 gap-3 ">
              {productsDAta.map((el, index) => (
                <ProductCard
                  key={index}
                  liked={el.liked}
                  className={""}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BusinessProfile;
