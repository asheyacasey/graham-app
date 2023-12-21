import React, { useState } from "react";
import AccountLayout from "../account";
import Select from "@/ui/form/Select";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
const TimeRange = () => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const onHadleRange = (data: any) => {
    const startDate: Date = data?.startDate
    const endDate: Date = data?.endDate
    setState([{
      startDate,
      endDate,
      key: state[0]?.key
    }])
  }

  return (
    <AccountLayout>
      <h1 className="text-brand_gray-200 text-sm font-semibold">
        *Click to select the period you wish to mark as booked for visitors.
      </h1>
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-6">
        <div className="flex items-center justify-between md:justify-start gap-3">
          <h1 className="text-sm font-semibold">Selected as</h1>
          <div className="w-52 md:w-64">
            <Select
              options={[{ label: "Hourly", value: "Hourly" }]}
              className="react-notification-select"
              classNamePrefix="react-select-notification"
            />
          </div>
        </div>
        <div className="flex gap-6">
          <div className="flex items-center gap-1">
            <div className="w-5 h-5 bg-black" />
            <h1 className="text-brand_gray-200 text-sm font-semibold">Today</h1>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-5 h-5 bg-brand_blue-300" />
            <h1 className="text-brand_gray-200 text-sm font-semibold">
              Booked
            </h1>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center mt-6">
        <DateRange
          className=""
          editableDateInputs={true}
          onChange={(item: any) => onHadleRange(item?.selection)}
          moveRangeOnFirstSelection={false}
          ranges={state}
        />
      </div>
    </AccountLayout>
  );
};

export default TimeRange;
