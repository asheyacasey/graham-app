import React from "react";

interface Props {
  InputType: string;
  label: string;
}
const DateInput = ({ InputType, label }: Props) => {
  return (
    <div className="flex w-full flex-col py-2 px-2">
      <label className="text-xs text-brand_gray-200 uppercase font-Roboto">
        {label}
      </label>
      <input
        className="outline-none font-medium h-5 text-sm"
        type={InputType}
      />
    </div>
  );
};

export default DateInput;
