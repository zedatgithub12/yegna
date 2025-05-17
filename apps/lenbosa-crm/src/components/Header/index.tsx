"use client";

import React from "react";
import { Breadcrumb } from "./BreadCrumb";
import Image from "next/image";
import arrowLeft from "@public/icons/back-arrow.png";
import { useRouter } from "next/navigation";
import { Text } from "rizzui/typography";
import SearchField from "./SearchField";
import ProfileMenu from "@/layout/profile-menu";

const Header = ({
  title,
  search,
  back = false,
  breadcrumb = true,
  hasActionButton = false,
  actionButtons,
}: pageHeaderProps) => {
  const router = useRouter();

  return (
    <div className="w-full bg-white shadow-2xl shadow-gray-50 rounded-2xl">
      <div className="flex items-center justify-between p-3 px-4">
        <div className="">
          {search ? (
            <SearchField />
          ) : back ? (
            <div
              className="flex items-center justify-between p-2 px-3 min-w-20 rounded-full border border-gray-300 hover:cursor-pointer hover:bg-gray-100"
              onClick={() => router.back()}
            >
              <Image src={arrowLeft} alt="BACK" width={16} height={16} />
              <p className="text-[16px] font-normal">Back</p>
            </div>
          ) : null}
        </div>
        <div className="flex items-center">
          
          <ProfileMenu />
        </div>
      </div>
      <hr className="my-1 text-gray-200" />
      <div className="flex items-center justify-between p-2 px-4">
        <div className="">
          {title ? (
            <Text className="capitalize text-[16px] font-bold ml-2">
              {title}
            </Text>
          ) : null}
          {breadcrumb ? <Breadcrumb /> : null}
        </div>

        {hasActionButton ? <div className="">{actionButtons}</div> : null}
      </div>
    </div>
  );
};

export default Header;
