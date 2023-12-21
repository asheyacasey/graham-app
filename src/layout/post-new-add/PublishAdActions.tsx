import React from "react";
import AccountLayout from "../account";
import Button from "@/ui/form/Button";

const PublishAdActions = () => {
  return (
    <AccountLayout>
      <h1 className="text-center text-18px font-light">
        Our <span className="text-brand_yellow-500">terms of use</span> apply .
        You can find information on the processing of your data in our{" "}
        <span className="text-brand_yellow-500">privacy policy.</span>
      </h1>
      <div className="mt-2.5 flex flex-col md:flex-row md:items-center md:justify-center md:w-2/3 lg:w-1/2 mx-auto gap-3">
        <Button className="bg-transparent  text-black">Place an Ad</Button>
        <Button>Pay & Place an Ad</Button>
        <Button className="bg-transparent  text-black">Preview</Button>
      </div>
    </AccountLayout>
  );
};

export default PublishAdActions;
