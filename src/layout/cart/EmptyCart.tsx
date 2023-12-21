import Button from "@/ui/form/Button";
import { URLS } from "@/utils/URLS";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const EmptyCart = () => {
  return (
    <div>
      <div className="bg-white w-full py-14 ">
        <div className="relative lg:w-[422px] lg:h-[411px] w-[322px] h-[311px] mx-auto">
          <Image
            fill
            alt=""
            src={"/assets/svg/cart-illustration.svg"}
            className="object-contain"
          />
        </div>
        <h1 className="text-brand_yellow-500 lg:text-6xl text-2xl font-bold text-center mt-12 lg:w-full w-[80%] mx-auto">
          Your Cart is currently empty
        </h1>
        <Link href={URLS.HOME} className="flex items-center justify-center mt-3 lg:w-full w-[80%] mx-auto">
          <Button  className="w-[314px]  ">Book Your Tool</Button>
        </Link>
      </div>
    </div>
  );
};

export default EmptyCart;
