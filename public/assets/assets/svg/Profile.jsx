import React from "react";

export const Profile = (props) => {
  return (
    <svg
      width={25}
      height={25}
      viewBox="0 0 33 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16.667 2C8.567 2 2 8.566 2 16.667c0 8.1 6.566 14.666 14.667 14.666 8.1 0 14.666-6.566 14.666-14.666C31.333 8.567 24.767 2 16.667 2z"
        stroke={props.color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.334 25.974S8.604 21.8 16.67 21.8s11.337 4.174 11.337 4.174M16.669 16.67a4.4 4.4 0 100-8.8 4.4 4.4 0 000 8.8v0z"
        stroke={props.color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
