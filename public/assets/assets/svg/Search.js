import * as React from "react";

export const Search = (props) => {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.683 4.683a9.16 9.16 0 1012.954 12.954A9.16 9.16 0 004.683 4.683zm1.414 1.414a7.16 7.16 0 1110.126 10.126A7.16 7.16 0 016.097 6.097z"
        fill="#92929D"
      />
      <path
        d="M22.094 20.282l-4.13-4.129c-.942-.943-2.356.471-1.413 1.414l4.13 4.13c.942.943 2.356-.472 1.413-1.415z"
        fill="#92929D"
      />
    </svg>
  );
};
