"use client";
import AccountLayout from "@/layout/account";
import Tabs from "@/layout/payments/Tabs";
import Common from "@/templates/Common";
import Profile from "@/templates/Profile";
import React, { useState } from "react";
import Button from "@/ui/form/Button";
import BankCard from "@/layout/payments/get-paid/BankCard";
import Input from "@/ui/form/Input";

const Payments = () => {
  const [form, setForm] = useState({
    name: "John Doe",
    bank: "doejohn",
    acnumber: "doejohn@gmail.com",
    cacnumber: "+62 9876543210",
    ifsc: "Berlin",
    atype: "654321",
    city: "Berlin",
    zip: "Germany",
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
                    Account Holder Name
                  </label>
                  <Input
                    placeholder="Enter name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="border-[1.5px] text-black text-sm border-brand_blue-500  font-medium"
                  />
                </div>
                <div className="w-full">
                  <label className="text-brand_gray-200 text-sm font-medium">
                    Bank Name
                  </label>
                  <Input
                    placeholder="Enter Bank Name"
                    value={form.bank}
                    onChange={(e) => setForm({ ...form, bank: e.target.value })}
                    className="border-[1.5px] text-black text-sm border-brand_blue-500  font-medium"
                  />
                </div>{" "}
              </div>
              <div className="flex flex-col lg:flex-row w-full gap-5">
                <div className="w-full">
                  <label className="text-brand_gray-200 text-sm font-medium">
                    Account Number
                  </label>
                  <Input
                    placeholder="Enter Account Number"
                    value={form.acnumber}
                    onChange={(e) =>
                      setForm({ ...form, acnumber: e.target.value })
                    }
                    className="border-[1.5px] text-black text-sm border-brand_blue-500  font-medium"
                  />
                </div>
                <div className="w-full">
                  <label className="text-brand_gray-200 text-sm font-medium">
                    Confirm Account Number
                  </label>
                  <Input
                    placeholder="Enter Account Number"
                    value={form.cacnumber}
                    onChange={(e) =>
                      setForm({ ...form, cacnumber: e.target.value })
                    }
                    className="border-[1.5px] text-black text-sm border-brand_blue-500  font-medium"
                  />
                </div>{" "}
              </div>
              <div className="flex flex-col lg:flex-row w-full gap-5">
                <div className="w-full">
                  <label className="text-brand_gray-200 text-sm font-medium">
                    IFSC Code
                  </label>
                  <Input
                    placeholder="Enter IFSC Code"
                    value={form.ifsc}
                    onChange={(e) => setForm({ ...form, ifsc: e.target.value })}
                    className="border-[1.5px] text-black text-sm border-brand_blue-500  font-medium"
                  />
                </div>
                <div className="w-full">
                  <label className="text-brand_gray-200 text-sm font-medium">
                    Account Type
                  </label>
                  <Input
                    placeholder="Enter Account Type"
                    value={form.atype}
                    onChange={(e) =>
                      setForm({ ...form, atype: e.target.value })
                    }
                    className="border-[1.5px] text-black text-sm border-brand_blue-500  font-medium"
                  />
                </div>{" "}
              </div>
              <div className="flex flex-col lg:flex-row w-full gap-5">
                <div className="w-full">
                  <label className="text-brand_gray-200 text-sm font-medium">
                    City
                  </label>
                  <Input
                    placeholder="Enter City"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="border-[1.5px] border-brand_blue-500 text-black text-sm font-medium"
                  />
                </div>
                <div className="w-full">
                  <label className="text-brand_gray-200 text-sm font-medium">
                    Zip Code
                  </label>
                  <Input
                    placeholder="Enter Zip Code"
                    value={form.zip}
                    onChange={(e) => setForm({ ...form, zip: e.target.value })}
                    className="border-[1.5px] text-black text-sm border-brand_blue-500  font-medium"
                  />
                </div>{" "}
              </div>
              <div className="flex flex-col lg:flex-row justify-evenly gap-5 w-full lg:gap-0 pt-5 lg:pt-10">
                <div className="w-full lg:w-min">
                  <Button className="w-full lg:w-48">Save Changes</Button>
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
