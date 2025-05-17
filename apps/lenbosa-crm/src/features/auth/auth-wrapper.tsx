"use client";
import React from "react";
import AuthCover from "@public/images/Auth-Cover.png";

type Props = {
  children: React.ReactNode;
};
const AuthWrapper: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex h-screen items-center justify-center ">
      <div className="mx-auto p-6 grid w-full h-full grid-cols-1  gap-8 bg-[#F9F7F2] dark:bg-black md:grid-cols-2">
        <div
          className="mx-auto w-full max-w-xl flex-grow items-center shadow-xl shadow-gray-100 rounded-[30px]"
          style={{
            backgroundImage: `url(${AuthCover.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        <div className="mx-auto w-full  max-w-xl  p-3 flex-grow items-center bg-white shadow-xl shadow-gray-100 rounded-[30px]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthWrapper;
