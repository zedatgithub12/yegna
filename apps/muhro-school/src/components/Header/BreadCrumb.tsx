"use client";
import React from "react";
import Link from "next/link";
import { Text } from "rizzui/typography";
import { usePathname } from "next/navigation";
import { Circle } from "lucide-react";

const pathToLabel = (path: string) => {
  if (path === "/dashboard") return "Dashboard";
  return path.charAt(0).toUpperCase() + path.slice(1);
};

export const Breadcrumb: React.FC = () => {
  const paths = usePathname();
  const pathnames = paths.split("/");
  return (
    <div>
      <div aria-label="breadcrumb" className="flex items-center">
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `${process.env.NEXT_PUBLIC_DOMAIN_URL}/${pathnames.slice(0, index + 1).join("/")}`;

          return last ? (
            <div key={to} className="flex items-center justify-between ml-1">
              <Text
                color="#7B7B7B"
                className="font-normal text-gray-500 text-sm"
              >
                {pathToLabel(value)}
              </Text>
            </div>
          ) : (
            <div key={to} className="flex items-center ml-1">
              <Link
                href={to}
                key={to}
                style={{
                  textDecoration: "none",
                  fontSize: "0.9rem",
                  color: "#7B7B7B",
                }}
              >
                {pathToLabel(value)}
              </Link>
              {index > 0 ? (
                <Circle
                  size={6}
                  color="#7B7B7B"
                  fill="#7B7B7B"
                  className="mx-1"
                />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};
