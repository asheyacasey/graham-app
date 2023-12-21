import React from "react";
import CustomSelect from "react-select";
import ErrorBox from "../ErrorBox";
import Label from "../Label";
export interface OptionType {
  label: string;
  value: string | number;
}
interface CustomSelectProps {
  label?: string;
  error?: string;
  className?: string;
  labelClassName?: string;
  classNamePrefix?: string;
  options: OptionType[];
  [k: string]: any;
}

const Select: React.FC<CustomSelectProps> = ({
  label,
  error,
  options,
  labelClassName = "",
  className = "form-react-select",
  classNamePrefix = "react-select",
  ...rest
}) => {
  return (
    <div className="space-y-2">
      {label && <Label className={labelClassName} text={label} />}
      <CustomSelect
        className={className}
        classNamePrefix={classNamePrefix}
        options={options}
        components={{
          IndicatorSeparator: () => null,
        }}
        styles={{
          placeholder: (props) => ({ ...props, color: "#B5B5BE" }),
        }}
        {...rest}
      />
      {error && <ErrorBox error={error} />}

    </div>
  );
};

export default Select;
