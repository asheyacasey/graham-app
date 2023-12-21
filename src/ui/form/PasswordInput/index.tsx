import { cn } from "@/utils/styles";
import React, { useState } from "react";
import ErrorBox from "../ErrorBox";
import { EyeCloseOutlined, EyeOpenOutlined } from "@/ui/Icon";
interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}
const PasswordInput = ({
  className,
  error = "",
  ...props
}: PasswordInputProps) => {
  const [showPassword, setshowPassword] = useState(false);
  const toggleShowPassword = () => {
    setshowPassword((prev) => !prev);
  };
  return (
    <div className="space-y-2">
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
          type={showPassword ? "text" : "password"}
          placeholder="Enter text..."
          {...props}
          className={cn("h-12 flex-1 p-4 w-full outline-none rounded-10px")}
        />
        {showPassword ? (
          <EyeOpenOutlined
            onClick={toggleShowPassword}
            className="fill-brand_gray-200"
          />
        ) : (
          <EyeCloseOutlined
            onClick={toggleShowPassword}
            className="fill-brand_gray-200"
          />
        )}
      </div>
      {error && <ErrorBox error={error} />}
    </div>
  );
};

export default PasswordInput;
