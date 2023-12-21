"use client";
import Tabs from "@/layout/seller-account/Tabs";
import Common from "@/templates/Common";
import Profile from "@/templates/Profile";
import React from "react";

const SellerAccount = () => {
  return (
    <Common>
      <Profile>
        <Tabs />
        <div>
          <h1 className="text-2xl font-semibold mt-7">My Messages</h1>
        </div>
      </Profile>
    </Common>
  );
};

export default SellerAccount;
