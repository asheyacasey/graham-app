
import React from "react";
import Label from "../Label";
import { cn } from "@/utils/styles";
import ErrorBox from "../ErrorBox";
interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  label?: string;
  labelClassName?: string
  children?: React.ReactNode
}
const TextArea = ({ error, label, className, labelClassName, children, ...props }: TextAreaProps) => {
  return (
    <div className="space-y-2 w-full">
      {
        label && <Label text={label} className={labelClassName} />
      }
      <textarea
        className={cn("flex p-4 outline-none items-center rounded-10px border border-brand_gray-500 bg-white w-full", className)}
        rows={3}
        {...props}
      >
        {children}
      </textarea>
      {
        error && <ErrorBox error={error} />
      }
    </div>
  );
};

export default TextArea;
