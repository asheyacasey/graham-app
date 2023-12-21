import Tabs from "@/layout/buyer-account/Tabs";
import BreadCrumbs from "@/ui/BreadCrumbs";
import ProfileSidebar from "@/ui/components/ProfileSidebar";
import Button from "@/ui/form/Button";
import { cn } from "@/utils/styles";
import React, { useState } from "react";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi2";
interface ProfileProps {
  children?: React.ReactNode;
}
const Profile = ({ children }: ProfileProps) => {
  const [selected, setselected] = React.useState(0);
  const [show, setShow] = useState(false);
  return (
    <div>
      <div className="flex w-full flex-col md:flex-row gap-5 items-center">
        <Button className="md:w-5/12 lg:w-3/12">My Account</Button>
        <BreadCrumbs data={[{ title: "Home" }, { title: "Manage Profile" }]} />
      </div>
      <div className="flex md:flex-row flex-col gap-6 mt-8">
        <div className="w-full bg-brand_yellow-400 px-4 py-2 rounded-lg flex items-center md:hidden ">
          <span
            className="text-white w-full  justify-center self-end font-semibold  flex  items-center gap-4 "
            onClick={() => setShow(!show)}
          >
            Menu
          </span>
          {!show ? (
            <HiOutlineChevronDown className="text-white " color="#fff" />
          ) : (
            <HiOutlineChevronUp className="text-white " color="#fff" />
          )}
        </div>
        <div
          className={cn(
            "w-full md:w-5/12 lg:w-3/12 overflow-hidden mx-auto !transition-all !duration-500  ease-in-out ",
            {
              "h-[400px] md:h-full": show,
              "h-0 md:h-full": !show,
            }
          )}
        >
          <ProfileSidebar
            className={""}
            item={selected}
            handleItemClick={(item) => {
              setselected(item);
            }}
          />
        </div>
        <div className="flex-1 overflow-hidden">{children}</div>
      </div>
    </div>
  );
};

export default Profile;
