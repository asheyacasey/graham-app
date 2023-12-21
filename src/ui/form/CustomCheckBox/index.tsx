import React, { useState } from "react";

interface Props {
  toogle: () => void;
  isChecked: boolean;
  text: string;
}
const CustomCheckbox = ({ toogle, isChecked, text }: Props) => {
  return (
    <div className="flex gap-3">
      <div
        className={`cursor-pointer w-5 h-5 border-2 border-black  rounded ${
          isChecked ? "bg-black" : "bg-white"
        }`}
        onClick={toogle}
      />
      <p
        className={`font-Roboto font-medium text-sm ${
          isChecked ? "text-black" : "text-brand_gray-200"
        }`}
      >
        {text}
      </p>
    </div>
  );
};

export default CustomCheckbox;
