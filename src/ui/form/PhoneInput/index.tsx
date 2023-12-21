import React from "react";
import Input from "../Input";
import ErrorBox from "../ErrorBox";
import { cn } from "@/utils/styles";
interface PhoneInputProps {
  error?: string;
  onChangeNumber?: (number: string) => void;
  onChangeCode?: (code: string) => void;
}
const PhoneInput = ({
  error = "",
  onChangeCode = () => { },
  onChangeNumber = () => { },
}: PhoneInputProps) => {
  return (
    <div className="space-y-1">
      <div className="flex w-full  items-center gap-x-2.5">
        <Input
          placeholder="+1"
          onChange={(e) => {
            onChangeCode(e.target.value);
          }}
          wrapperClassName={cn("w-[100px]")}
          className={cn({
            'border-brand_red-600': error
          })}
        />
        <Input
          onChange={(e) => {
            onChangeNumber(e.target.value);
          }}
          className={cn("flex-1", {
            'border-brand_red-600': error
          })}
          placeholder="Phone Number"
        />
      </div>
      {error && <ErrorBox error={error} />}
    </div>
  );
};

export default PhoneInput;
