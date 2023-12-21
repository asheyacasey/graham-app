import * as React from "react";

export const Bell = (props) => {
  return (
    <svg
      width={15}
      height={18}
      viewBox="0 0 20 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.98 4.64a3 3 0 00-5.957 0 7.224 7.224 0 00-4.244 6.582v5.018L.11 19.55A1 1 0 001 21h5.171a3.001 3.001 0 005.659 0H17a1 1 0 00.893-1.45l-1.67-3.31v-5.018a7.224 7.224 0 00-4.244-6.581zm2.35 12.289L15.377 19H2.626l1.046-2.071a1 1 0 00.107-.451v-5.256a5.222 5.222 0 0110.444 0v5.256a1 1 0 00.108.45z"
        fill="#92929D"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 8a4 4 0 100-8 4 4 0 000 8z"
        fill="#FC5A5A"
      />
    </svg>
  );
};
