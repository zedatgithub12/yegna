import * as React from "react";

export default function ProductSoldIcon({
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
        d="M14.6261 3.26532L11.3263 3.73673C10.8222 3.80875 10.4103 4.04904 10.1162 4.38114L2.41674 12.0806C1.6357 12.8616 1.63566 14.1279 2.41674 14.909L5.24517 17.7374C6.02625 18.5185 7.29255 18.5185 8.0736 17.7374L15.773 10.038C16.1051 9.74388 16.3454 9.33199 16.4174 8.82786L16.8888 5.52803C17.0775 4.20815 15.946 3.07671 14.6261 3.26532ZM12.3162 7.83793C12.7067 8.22843 13.3399 8.22846 13.7305 7.83793C14.121 7.4474 14.1209 6.81421 13.7305 6.42371C13.34 6.03322 12.7068 6.03319 12.3162 6.42372C11.9257 6.81424 11.9257 7.44743 12.3162 7.83793Z"
        fill="white"
      />
    </svg>
  );
}
