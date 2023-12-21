import React from "react";
import { HeartContained } from "../../../public/assets/assets/svg";

const HeartBadge = ({ liked = false, className = "" }) => {
  return (
    <div
      style={{
        boxShadow:
          "0px 4px 11px 0px rgba(0, 0, 0, 0.10), 4px 0px 11px 0px rgba(0, 0, 0, 0.10)",
      }}
      className={`w-[35px] h-[35px] rounded-full flex items-center justify-center ${
        liked ? "bg-red-500" : "#F6F7FB"
      } ${className}`}
    >
      <HeartContained fill={liked ? "white" : "#C4CDD5"} />
    </div>
  );
};

export default HeartBadge;
