import React from "react";
import Select from "react-select";

export interface OptionType {
  label: string;
  value: string | number;
}
interface CustomSelectProps {
  placeholder: string;
  Icon: any;
  options: OptionType[];
  [k: string]: any;
}

const Dropdown = ({
  Icon,
  placeholder,
  options,
  ...rest
}: CustomSelectProps) => {
  return (
    <div className="space-y-1 relative flex items-center bg-brand_white-500 w-full rounded-lg">
      {Icon && <i className=" left-2 top-1/3 z-20 absolute">{Icon}</i>}
      <Select
        styles={{
          placeholder: (styles) => ({
            ...styles,
            whiteSpace: "nowrap",
          }),
          control: (basicStyles) => ({
            ...basicStyles,
            zIndex: 0,
            paddingLeft: Icon ? "25px" : "0px",
          }),
        }}
        className="react-select-container flex-nowrap w-full"
        classNamePrefix="react-select"
        placeholder={placeholder}
        options={options}
        components={{
          IndicatorSeparator: () => null,
          DownChevron: () => <div></div>,
        }}
        {...rest}
      />
    </div>
  );
};
export default Dropdown;
