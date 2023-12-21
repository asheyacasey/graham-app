import React from "react";
import { FiInstagram, FiTwitter, FiFacebook } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import { URLS } from "@/utils/URLS";

const ICONS = [FiInstagram, FiTwitter, FiFacebook];
const FOOTERARRAY = [
  {
    title: "Categories",
    link: [
      "Garden Tools",
      "KFZ tools",
      "machines",
      "Forestic tools",
      "Agriculture Machinery",
    ],
  },
  {
    title: "Legal",
    link: [
      "Terms of Service",
      "Privacy Policy",
      "Return Policy",
      "Shipping",
      "Data Protection",
    ],
  },
  {
    title: "Company",
    link: ["About", "Team", "Contact", "Careers", "Vision"],
  },
];

const Footer = () => {
  return (
    <footer className="px-5 gap-10 lg:px-20 bg-black  pt-5 pb-10 flex flex-col-reverse lg:flex-row items-center justify-between">
      <div className="text-white flex flex-col  lg:items-start gap-5 lg:w-3/12 w-full">
        <Link href={URLS.HOME}
          className="w-[81px] h-[81px] relative mx-auto"
        >
          <Image
            alt=""
            src={"/assets/images/logo.svg"}
            className=" cursor-pointer rounded-lg"
            fill
          />
        </Link>
        <span className="font-light text-sm text-center w-full">
          © 2021 - All rights reserved
        </span>
        <div className="flex justify-center items-center gap-5 w-full">
          {ICONS.map((Item, index) => (
            <p
              key={index}
              className="w-10 h-10 items-center justify-center flex rounded-full bg-white"
            >
              <Item color="#000" size={20} />
            </p>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-16 md:justify-items-center md:grid-cols-3 md:gap-0 lg:flex-row !w-full lg:justify-between">
        {FOOTERARRAY?.map((item, index) => (
          <ul key={index} className="text-white  flex flex-col gap-3">
            <li className=" font-bold text-xl">{item.title}</li>
            <ul className="space-y-2">
              {item?.link?.map((linkItem, linkIndex) => (
                <li key={linkIndex} className="overflow-hidden">
                  <h1 className="font-light cursor-pointer text-white text-sm break-words">
                    {linkItem}
                  </h1>
                </li>
              ))}
            </ul>
          </ul>
        ))}
      </div>
    </footer>
  );
};
export default Footer;
