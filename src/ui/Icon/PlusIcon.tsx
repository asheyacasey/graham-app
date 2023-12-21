import { SvgProps } from "./utils";

export const PlusIcon = (props: SvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 45 45"
    fill="none"
    stroke="black"
    {...props}
  >
    <rect
      x="1"
      y="1"
      width="43"
      height="43"
      rx="21.5"
      stroke="black"
      strokeWidth="2"
    />
    <path
      d="M14.25 22.5H30.75"
      stroke="black"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <path
      d="M22.5 14.25L22.5 30.75"
      stroke="black"
      strokeWidth="4"
      strokeLinecap="round"
    />
  </svg>
);
