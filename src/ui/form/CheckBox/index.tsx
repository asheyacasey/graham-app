import { CheckIcon } from "@/ui/Icon";
import { cn } from "@/utils/styles";
import React from "react";
interface CheckBoxProps {
  label?: React.ReactNode;
  checked?: boolean;
  onChange?: () => void;
  className?: string;
}
const CheckBox = ({
  label,
  checked = true,
  onChange = () => {},
  className,
}: CheckBoxProps) => {
  return (
    <div className={cn("flex items-center gap-x-3", className)}>
      <div
        onClick={onChange}
        className={cn(
          "h-5 w-5 border cursor-pointer border-brand_green-200 bg-brand_green-200 rounded flex items-center justify-center",
          {
            "bg-white": !checked,
          }
        )}
      >
        {checked && <CheckIcon className="fill-white stroke-white" />}
      </div>
      {label && (
        <h1 className="text-sm tracking-[0.1px] text-brand_gray-50 font-Roboto">
          {label}
        </h1>
      )}
    </div>
  );
};

export default CheckBox;
