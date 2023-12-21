import * as React from "react";
import { SvgProps } from "../utils";

export const ChevDownContained = (props: SvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      fill="#92929D"
      fillRule="evenodd"
      d="M12.293 5.333a.5.5 0 0 1 .39.813L8.39 11.512a.5.5 0 0 1-.78 0L3.315 6.146a.5.5 0 0 1 .39-.813h8.587Z"
      clipRule="evenodd"
    />
  </svg>
);