"use client";
import protectAuthPages from "@/hooks/protectAuthPages";
import { URLS } from "@/utils/URLS";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import React from "react";
const RegisterForm = dynamic(() => import("@/layout/forms/Register/RegisterForm"))
const Register = () => {
  return (
    <div className="min-h-screen bg-brand_yellow-500 md:py-8 md:px-14 py-4 px-5">
      <Link href={URLS.HOME}>
        <Image
          alt=""
          src={"/assets/images/logo.svg"}
          className="object-contain rounded-lg"
          height={81}
          width={81}
        />
      </Link>
      <div className="flex items-center gap-x-16 mt-14">
        <div className="lg:inline-flex lg:flex-[0.5] hidden">
          <img
            alt=""
            src={"/assets/images/loginhero.svg"}
            className="object-contain w-full h-auto"
          />
        </div>
        <div className="lg:flex-[0.5] flex-1">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default protectAuthPages(Register);
