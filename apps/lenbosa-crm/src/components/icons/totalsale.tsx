import * as React from "react";

export default function TotalSaleIcon({
  strokeWidth = 2.75,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className="w-6 h-6"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 1C1.89543 1 1 1.89545 1 3V17C1 18.1046 1.89543 19 3 19H17C18.1046 19 19 18.1046 19 17V3C19 1.89545 18.1046 1 17 1H3ZM6 11C6 10.4477 5.55228 10 5 10C4.44772 10 4 10.4477 4 11V15C4 15.5523 4.44772 16 5 16C5.55228 16 6 15.5523 6 15V11ZM10 7C10.5523 7 11 7.44769 11 8V15C11 15.5523 10.5523 16 10 16C9.44772 16 9 15.5523 9 15V8C9 7.44769 9.44772 7 10 7ZM16 5C16 4.44769 15.5523 4 15 4C14.4477 4 14 4.44769 14 5V15C14 15.5523 14.4477 16 15 16C15.5523 16 16 15.5523 16 15V5Z"
        fill="white"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}
