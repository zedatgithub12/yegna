import React from "react";

export function CheckmarkIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="#ffffff"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        // d="M4.5 12.75l6 6 9-13.5"
        d="M18.71,7.21a1,1,0,0,0-1.42,0L9.84,14.67,6.71,11.53A1,1,0,1,0,5.29,13l3.84,3.84a1,1,0,0,0,1.42,0l8.16-8.16A1,1,0,0,0,18.71,7.21Z"
      />
    </svg>
  );
}
