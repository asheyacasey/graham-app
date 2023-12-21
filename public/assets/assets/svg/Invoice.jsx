export const Invoice = (props) => (
  <svg
    width={15}
    height={15}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 30 30"
    fill="none"
    {...props}
  >
    <path
      fill={props.color}
      d="M27 0H3C1.5 0 0 1.35 0 3V7.515C0 8.595 0.645 9.525 1.5 10.05V27C1.5 28.65 3.15 30 4.5 30H25.5C26.85 30 28.5 28.65 28.5 27V10.05C29.355 9.525 30 8.595 30 7.515V3C30 1.35 28.5 0 27 0ZM25.5 27H4.5V10.5H25.5V27ZM27 7.5H3V3H27V7.5Z"
    />
    <path fill={props.color} d="M10.5 15H19.5V18H10.5V15Z" />
  </svg>
);
