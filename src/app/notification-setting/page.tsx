"use client";
import React, { useState } from "react";
import Common from "@/templates/Common";
import ProfileTemplate from "@/templates/Profile";
import AccountLayout from "@/layout/account";
import Select from "react-select";
import { TIMESPAN } from "@/mock/options";
import CheckBox from "@/ui/form/CheckBox";
import Button from "@/ui/form/Button";

const ACTIVITIES = [
  { label: "All  Activity", value: "All" },
  { label: "Payment", value: "payment" },
  { label: "Sold Products", value: "sold" },
  { label: "Messages", value: "messages" },
];
const NotificationSetting = () => {
  const [checked, setChecked] = useState(true);
  return (
    <Common>
      <ProfileTemplate>
        <div className="">
          <div>
            <h1 className="text-xl font-semibold mb-7">Notification</h1>
          </div>
          <div className="rounded-10px p-5 bg-white min-h-[500px]">
            <div className="flex flex-col gap-5 items-center">
              <div className="flex w-full flex-col items-start gap-5">
                <h1 className="text-lg font-semibold font-Montserrat">Email</h1>
                <p className="text-brand_gray-50 font-Roboto text-sm">{`(sending to Abc******123@gmail.com)`}</p>
                <p className="text-brand_gray-50 font-Roboto text-sm">
                  Send an email with unread activity for:
                </p>
              </div>
              <div className="flex flex-col lg:flex-row gap-5  w-full lg:gap-20 ">
                <Select
                  className=" w-full react-notification-select"
                  classNamePrefix="react-select-notification"
                  styles={{
                    singleValue: (newstyles) => ({
                      ...newstyles,
                      fontWeight: "600",
                    }),
                  }}
                  placeholder="Select Activities"
                  options={ACTIVITIES}
                  components={{
                    IndicatorSeparator: () => null,
                    DownChevron: () => <div></div>,
                  }}
                />
                <Select
                  className=" w-full react-notification-select"
                  classNamePrefix="react-select-notification"
                  styles={{
                    singleValue: (newstyles) => ({
                      ...newstyles,
                      fontWeight: "600",
                    }),
                  }}
                  options={TIMESPAN}
                  placeholder="Select Time Span"
                  components={{
                    IndicatorSeparator: () => null,
                    DownChevron: () => <div></div>,
                  }}
                />
              </div>
              <div className="flex justify-start items-start w-full">
                <CheckBox
                  checked={checked}
                  label="Only send when offline or idle"
                  onChange={() => setChecked(!checked)}
                />
              </div>
              <Button className="w-full md:w-1/2">Save</Button>
            </div>
          </div>
        </div>
      </ProfileTemplate>
    </Common>
  );
};

export default NotificationSetting;
