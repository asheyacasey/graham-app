"use client";
import AccountLayout from "@/layout/account";
import Tabs from "@/layout/payments/Tabs";
import Common from "@/templates/Common";
import Profile from "@/templates/Profile";
import React from "react";
import Button from "@/ui/form/Button";
import BankCard from "@/layout/payments/get-paid/BankCard";
import { useRouter } from "next/navigation";
import { URLS } from "@/utils/URLS";

const Payments = () => {
  const route = useRouter();
  const handlenavigate = () => {
    route.push(URLS.ADD_BILLING_BANK_CARD);
  };
  return (
    <Common>
      <Profile>
        <Tabs />
        <div>
          <h1 className="text-xl font-semibold my-7">Manage Billing Method</h1>
        </div>
        <AccountLayout>
          <div className="flex flex-col items-center gap-5">
            <BankCard />
              {/* <span className="text-xs font-semibold">Visa ending in 1234</span>
            </BankCard> */}
            <Button onClick={() => handlenavigate()} className="w-5/12 ">
              Link New Bank Account
            </Button>
          </div>
        </AccountLayout>
      </Profile>
    </Common>
  );
};

export default Payments;
