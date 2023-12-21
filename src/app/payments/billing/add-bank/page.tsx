"use client";
import AccountLayout from "@/layout/account";
import Tabs from "@/layout/payments/Tabs";
import Common from "@/templates/Common";
import Profile from "@/templates/Profile";
import React, { useState } from "react";
import Button from "@/ui/form/Button";
import BankCard from "@/layout/payments/get-paid/BankCard";
import Input from "@/ui/form/Input";
import CustomDateInput from "@/ui/form/CustomDateInput";

const Payments = () => {
  const [form, setForm] = useState({
    card_holder_name: "doejohn",
    card_number: "1234567890",
    expires: "1225",
    code: "629",
  });
  return (
    <Common>
      <Profile>
        <Tabs />
        <div>
          <h1 className="text-xl font-semibold my-7">Add Bank Account</h1>
        </div>
        <AccountLayout className="self-center">
          <div className="w-full flex flex-col items-center font-Montserrat ">
            <div className="w-10/12 space-y-5">
              <div className="flex flex-col lg:flex-row w-full gap-5">
                <div className="w-full">
                  <label className="text-brand_gray-200 text-sm font-medium">
                    Card Holder Name
                  </label>
                  <Input
                    placeholder="Enter Cardholder Name"
                    value={form.card_holder_name}
                    onChange={(e) =>
                      setForm({ ...form, card_holder_name: e.target.value })
                    }
                    className="border-[1.5px] text-black text-sm border-brand_blue-500  font-medium"
                  />
                </div>
                <div className="w-full">
                  <label className="text-brand_gray-200 text-sm font-medium">
                    Card Number
                  </label>
                  <Input
                    placeholder="Enter Card Number"
                    value={form.card_holder_name}
                    onChange={(e) =>
                      setForm({ ...form, card_number: e.target.value })
                    }
                    className="border-[1.5px] text-black text-sm border-brand_blue-500  font-medium"
                  />
                </div>
              </div>
              <div className="flex flex-col lg:flex-row w-full gap-5">
                <div className="w-full">
                  <label className="text-brand_gray-200 text-sm font-medium">
                    Account Number
                  </label>
                  <CustomDateInput
                    value={form.expires}
                    onChange={(e) =>
                      setForm({ ...form, expires: e.target.value })
                    }
                  />
                </div>
                <div className="w-full">
                  <label className="text-brand_gray-200 text-sm font-medium">
                    Security Code
                  </label>
                  <Input
                    placeholder="Enter Security Code"
                    value={form.code}
                    onChange={(e) => setForm({ ...form, code: e.target.value })}
                    className="border-[1.5px] text-black text-sm border-brand_blue-500  font-medium"
                  />
                </div>{" "}
              </div>

              <div className="flex flex-col lg:flex-row justify-evenly gap-5 w-full lg:gap-0 pt-5 lg:pt-10">
                <div className="w-full lg:w-min">
                  <Button className="w-full lg:w-48">Save</Button>
                </div>
                <div className="w-full lg:w-min">
                  <Button className="w-full lg:w-48 border-brand_blue-500 border-[1.5px] bg-white text-black">
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </AccountLayout>
      </Profile>
    </Common>
  );
};

export default Payments;
