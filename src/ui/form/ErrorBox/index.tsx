import { cn } from "@/utils/styles";
import React from "react";
interface ErrorBoxProps {
  error: string;
  className?: string
}
const ErrorBox = ({ error, className }: ErrorBoxProps) => {
  return <div className={cn("text-sm text-red-500 font-Roboto", className)}>{error}</div>;
};

export default ErrorBox;
