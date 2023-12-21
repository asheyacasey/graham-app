"use client";
import Button from "@/ui/form/Button";
import { URLS } from "@/utils/URLS";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const NotFound = () => {
  const router = useRouter();
  return (
    <div className="bg-brand_yellow-500 h-screen flex flex-col justify-center gap-5 items-center">
      <div className="h-96 w-96 md:h-80 md:w-80 lg:h-96 lg:w-96">
        <Image
          alt="not-found"
          height={400}
          width={400}
          src={"/assets/assets/images/404.png"}
        />
      </div>
      <h1 className="text-3xl font-semibold text-white font-Roboto">
        Go to Home Page
      </h1>
      <Button
        onClick={() => {
          router.push(URLS.HOME);
        }}
        className="w-max px-20 py-3 "
      >
        Home Page
      </Button>
    </div>
  );
};

export default NotFound;
