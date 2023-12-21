import { cn } from "@/utils/styles";
import React, { useState } from "react";
import ErrorBox from "../ErrorBox";
import { EyeCloseOutlined, EyeOpenOutlined } from "@/ui/Icon";
interface MailInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  className?: string;
  wrapperClassName?: string;
}
const MailInput = ({
  className,
  error = "",
  wrapperClassName,
  ...props
}: MailInputProps) => {
  return (
    <div className={cn("space-y-2", wrapperClassName)}>
      <div
        className={cn(
          "flex pr-3.5 items-center rounded-10px border border-brand_gray-500  outline-none font-Roboto text-brand_gray-400 placeholder:text-brand_gray-100",
          {
            "border-brand_red-600": error,
            "focus:border-brand_blue-500": !error,
          }
        )}
      >
        <input
          autoComplete="off"
          placeholder="Enter text..."
          {...props}
          className={cn("h-12 flex-1 p-4 w-full outline-none rounded-10px")}
        />
        <h1 className="text-brand_gray-400 font-Roboto text-sm tracking-[0.1px]">
          @gamil.com
        </h1>
      </div>
      {error && <ErrorBox error={error} />}
    </div>
  );
};

export default MailInput;
