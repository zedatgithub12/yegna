import * as React from "react";

export default function AdsIcon({
  strokeWidth,
  color = "#888",
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={strokeWidth}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M14.926 2.91106L8.274 6.10506C7.77193 6.34975 7.2009 6.41402 6.657 6.28706C6.42752 6.23014 6.19562 6.18343 5.962 6.14706C4.137 5.94006 3 7.38406 3 9.04506V9.95706C3 11.6171 4.137 13.0621 5.962 12.8531C6.19587 12.8185 6.42783 12.7721 6.657 12.7141C7.20101 12.5874 7.77205 12.652 8.274 12.8971L14.926 16.0901C16.453 16.8231 17.217 17.1901 18.068 16.9041C18.92 16.6181 19.212 16.0051 19.796 14.7791C20.5885 13.1324 21.0001 11.3285 21.0001 9.50106C21.0001 7.67364 20.5885 5.86968 19.796 4.22306C19.212 2.99706 18.92 2.38306 18.068 2.09806C17.217 1.81206 16.453 2.17706 14.926 2.91106Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.49999 12.5V6.5M11.458 20.77L9.96699 22C6.60499 19.334 7.01599 18.063 7.01599 13H8.14999C8.60999 15.86 9.69499 17.216 11.193 18.197C12.115 18.801 12.305 20.072 11.458 20.77Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
