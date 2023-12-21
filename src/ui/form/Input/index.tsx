import { cn } from "@/utils/styles";
import React, { memo } from "react";
import ErrorBox from "../ErrorBox";
import Label from "../Label";
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  wrapperClassName?: string;
  label?: string;
  rightElement?: React.ReactNode
  labelClassName?: string
}
const Input = ({
  className,
  error = "",
  wrapperClassName,
  label,
  rightElement,
  labelClassName = '',
  ...props
}: InputProps) => {
  return (
    <div className={cn("space-y-2 w-full", wrapperClassName)}>
      {label && <Label className={labelClassName} text={label} />}
      <div className={cn("flex items-center rounded-10px border border-brand_gray-500 bg-white ", {
        "border-brand_red-600": error,
        "focus-within:border-brand_blue-500": !error,
        "pr-4": rightElement
      }, className)}>
        <input
          autoComplete="off"
          {...props}
          className={cn(
            "h-12 p-4 w-full rounded-10px bg-transparent  outline-none font-Roboto text-brand_gray-400 placeholder:text-brand_gray-100",
          )}
        />
        {rightElement && rightElement}
      </div>
      {error && <ErrorBox error={error} />}
    </div>
  );
};

export default memo(Input);
