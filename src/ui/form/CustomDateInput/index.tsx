import React, { useEffect, useState } from "react";

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const CustomDateInput = ({ value, onChange }: Props) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setInputValue(formatDateForInput(value));
  }, [value]);

  const formatDateForInput = (dateString: any) => {
    let formattedDate = dateString.replace(/[^0-9]/g, "");
    if (formattedDate.length > 2) {
      formattedDate = formattedDate.slice(0, 2) + "/" + formattedDate.slice(2);
    }
    return formattedDate;
  };

  const handleInputChange = (event: any) => {
    let newValue = event.target.value;
    setInputValue(formatDateForInput(newValue));
    const newEvent: any = new Event("change", { bubbles: true });
    Object.defineProperty(newEvent, "target", {
      writable: false,
      value: { value: newValue }, // Set the new value in the target property
    });

    onChange(newEvent);
  };

  return (
    <input
      type="text"
      placeholder="MM/YY"
      value={inputValue}
      onChange={handleInputChange}
      maxLength={5}
      className="border-[1.5px] text-black text-sm border-brand_blue-500  font-medium  
      h-12 p-4 w-full rounded-10px  outline-none font-Roboto  placeholder:text-brand_gray-100
      "
    />
  );
};

export default CustomDateInput;
