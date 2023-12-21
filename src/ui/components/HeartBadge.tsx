import React from "react";
import { HeartContained } from "../../../public/assets/assets/svg";
import { cn } from "@/utils/styles";

interface HeartBadgeProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  liked: boolean,
  className?: string
}

const HeartBadge = ({ liked = false, className = "", ...props }: HeartBadgeProps) => {
  return (
    <div
      {...props}
      style={{
        boxShadow:
          "0px 4px 11px 0px rgba(0, 0, 0, 0.10), 4px 0px 11px 0px rgba(0, 0, 0, 0.10)",
      }}
      className={cn('cursor-pointer w-[35px] h-[35px] rounded-full flex items-center justify-center', {
        'bg-red-500': liked,
        "bg-white": !liked
      },
        className
      )}
    >
      <HeartContained fill={liked ? "white" : "#C4CDD5"} />
    </div>
  );
};

export default HeartBadge;
