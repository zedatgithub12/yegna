"use client";
import React from "react";
import AuthCover from "@public/images/Auth-Cover.png";
import Image from "next/image";
import Logo from "@/components/logo";
import WhiteLogo from "@public/White_Logo.png";
type Props = {
  children: React.ReactNode;
};
const AuthWrapper: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex min-h-screen items-center justify-center ">
      <div className=" z-40 grid w-full  grid-cols-1 items-center gap-3 rounded-2xl   bg-white dark:bg-black   md:grid-cols-2">
        <div className="hidden h-full md:flex bg-primary/0 relative w-full">
          <Image
            src={AuthCover}
            alt="Sign In Thumbnail"
            priority
            className="h-screen w-full object-cover"
          />
          <div className="absolute inset-0 z-40 flex flex-col items-center justify-center p-2 gap-2">
            <Logo image={WhiteLogo} className="h-28" />
          </div>
        </div>
        <div className="mx-auto w-full max-w-lg p-3    flex-grow ">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthWrapper;
