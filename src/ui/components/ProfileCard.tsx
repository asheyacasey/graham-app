import Image from "next/image";
import React from "react";
import {
  HandSet,
  LocationBlack,
  Mail,
} from "../../../public/assets/assets/svg";
import Button from "../form/Button";

const PROFILEDETAILS = {
  email: "eravi@mail.com",
  phone: "+62 123 456 789",
  address: "Random Federation 115302, Berlin, Germany",
};
const ProfileCard = () => {
  return (
    <div className="bg-white rounded-xl flex flex-col gap-10 p-6 w-full">
      <div className="flex flex-col gap-3 items-center justify-center w-full">
        <Image
          src={"/assets/assets/images/photo.png"}
          width={75}
          height={75}
          alt="profile"
        />
        <span className="text-xl font-bold font-Montserrat">Lenora Fowler</span>
      </div>
      <div className=" flex flex-col gap-5 text-xs font-Montserrat font-medium">
        <div className="flex gap-4 items-start">
          <Mail />
          <span>{PROFILEDETAILS.email}</span>
        </div>
        <div className="flex gap-4 items-start">
          <HandSet />
          <span>{PROFILEDETAILS.phone}</span>
        </div>
        <div className="flex gap-4 items-start">
          <LocationBlack />
          <span>{PROFILEDETAILS.address}</span>
        </div>
      </div>
      <Button>Contact Me</Button>
    </div>
  );
};

export default ProfileCard;
