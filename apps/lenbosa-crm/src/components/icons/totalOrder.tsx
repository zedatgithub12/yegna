import * as React from "react";

export default function TotalOrderIcon({
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
        d="M4 6C4 3.79086 5.79086 2 8 2H14V6C14 8.20914 15.7909 10 18 10H20V18C20 20.2091 18.2091 22 16 22H8C5.79086 22 4 20.2091 4 18V6ZM8 11C7.44772 11 7 11.4477 7 12C7 12.5523 7.44772 13 8 13H10C10.5523 13 11 12.5523 11 12C11 11.4477 10.5523 11 10 11H8ZM8 15C7.44772 15 7 15.4477 7 16C7 16.5523 7.44772 17 8 17H12C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15H8ZM16.6818 4.19879L16.5509 6.16288C16.5106 6.76656 17.0115 7.26743 17.6152 7.22718L19.5792 7.09624C20.4365 7.03909 20.8274 5.99887 20.2198 5.39135L18.3867 3.5582C17.7792 2.95068 16.7389 3.34153 16.6818 4.19879Z"
        fill="white"
      />
    </svg>
  );
}
