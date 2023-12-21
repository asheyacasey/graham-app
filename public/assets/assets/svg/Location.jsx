import * as React from "react";

export const Location = (props) => {
  return (
    <svg
      width={14}
      height={18}
      viewBox="0 0 20 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M19 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1118 0z"
        stroke="#92929D"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 13a3 3 0 100-6 3 3 0 000 6z"
        stroke="#92929D"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const LocationAlt = (props) => {
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
        d="M12 7.636A4.362 4.362 0 007.636 12 4.362 4.362 0 0012 16.364 4.362 4.362 0 0016.364 12 4.362 4.362 0 0012 7.636zm9.753 3.273a9.812 9.812 0 00-8.662-8.662V0h-2.182v2.247a9.812 9.812 0 00-8.662 8.662H0v2.182h2.247a9.812 9.812 0 008.662 8.662V24h2.182v-2.247a9.812 9.812 0 008.662-8.662H24v-2.182h-2.247zM12 19.636A7.63 7.63 0 014.364 12 7.63 7.63 0 0112 4.364 7.63 7.63 0 0119.636 12 7.63 7.63 0 0112 19.636z"
        fill="#92929D"
      />
    </svg>
  );
};
