import React from "react";
interface RadioButtonProps {
  checked?: boolean;
  label?: string;
  color?: string;
}
const RadioButton = ({
  checked,
  label,
  color = "#000000",
}: RadioButtonProps) => {
  return (
    <div
      className={`w-4 h-4 rounded-full border-2  flex items-center justify-center shrink-0 p-[2px]`}
      style={{
        borderColor: color,
      }}
    >
      <div
        className={`w-full h-full flex-shrink-0  rounded-full`}
        style={{
          backgroundColor: color,
        }}
      />
    </div>
  );
};

export default RadioButton;
