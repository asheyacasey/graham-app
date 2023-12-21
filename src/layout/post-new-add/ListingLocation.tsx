import React from "react";
import AccountLayout from "../account";
import Input from "@/ui/form/Input";
import Select from "@/ui/form/Select";
import MapWithLocationOnly from "@/layout/post-new-add/Map";
const ListingLocation = (props: any) => {
  return (
    <AccountLayout>
      <div className="flex flex-col w-full h-full lg:flex-row gap-6">
        <div className="w-full flex flex-col  space-y-6">
          <div className="flex flex-col space-y-6">
            <Input
              labelClassName="font-semibold text-sm text-brand_gray-200"
              placeholder="Text here"
              className="border-brand_blue-500 border-[1.5px]"
              label="Street, No.*"
            />
            <Input
              labelClassName="font-semibold text-sm text-brand_gray-200"
              placeholder="Text here"
              label="Street, No.*"
              className="border-brand_blue-500 border-[1.5px]"
            />
          </div>
          <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <Input
              labelClassName="font-semibold text-sm text-brand_gray-200"
              placeholder="Text here"
              label="Postcode*"
              className="border-brand_blue-500 border-[1.5px]"
            />
            <Select
              options={[]}
              labelClassName="font-semibold text-sm text-brand_gray-200"
              label="City*"
              className="react-notification-select"
              classNamePrefix="react-select-notification"
            />
            <Select
              labelClassName="font-semibold text-sm text-brand_gray-200"
              options={[]}
              label="Country*"
              className="react-notification-select"
              classNamePrefix="react-select-notification"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-6">
            <Input
              labelClassName="font-semibold text-sm text-brand_gray-200"
              placeholder="Text here"
              label="Latitude (for Maps Pin Position)"
              className="border-brand_blue-500 border-[1.5px]"
            />
            <Input
              labelClassName="font-semibold text-sm text-brand_gray-200"
              placeholder="Text here"
              label="Longitude (for Maps Pin Position)"
              className="border-brand_blue-500 border-[1.5px]"
            />
          </div>
        </div>
        <div className="w-full h-96 lg:h-6/6 md:pt-5">
          <MapWithLocationOnly {...props} />
        </div>
      </div>
    </AccountLayout>
  );
};

export default ListingLocation;
