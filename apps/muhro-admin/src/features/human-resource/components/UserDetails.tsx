"use client";

import Image from "next/image";
import React from "react";
import UserIDIcon from "@/components/icons/user-id";
import { Avatar } from "@yegna-systems/ui/avatar";
import { Button } from "@yegna-systems/ui/button";

interface AdminInfo {
  name: string;
  email: string;
  id: string;
  photoUrl: string;
}

interface DocumentInfo {
  fileName: string;
  fileSize: string;
  uploadedAt: string;
}

export interface UserDetailPanelProps {
  profilePhoto: string;
  name: string;
  userName: string;
  registeredAt: string;
  email: string;
  phoneNumber: string;
  admin: AdminInfo;
  document: DocumentInfo;
}

const UserDetailPanel: React.FC<UserDetailPanelProps> = ({
  profilePhoto,
  name,
  userName,
  registeredAt,
  email,
  phoneNumber,
  admin,
  document,
}) => {
  return (
    <div className="space-y-6 p-2 bg-white rounded-lg shadow-sm text-gray-800">
      <div>
        <h2 className="text-lg font-bold mb-2">Employee Information</h2>
        <div className="flex items-start gap-6 ">
          {profilePhoto ? (
            <Image
              src={profilePhoto}
              alt="Profile"
              width={300}
              height={300}
              className="w-32 h-32 rounded-lg object-cover bg-gray-200"
            />
          ) : (
            <div className="w-32 h-32 rounded-lg bg-gray-200 flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-normal text-gray-400">Name</p>
              <p>{name}</p>
            </div>
            <div>
              <p className="font-normal text-gray-400">User Name</p>
              <p>{userName}</p>
            </div>

            <div>
              <p className="font-normal text-gray-400">Registered at</p>
              <p className="font-bold">{registeredAt}</p>
            </div>
            <div>
              <p className="font-normal text-gray-400">Email</p>
              <p>{email}</p>
            </div>
            <div>
              <p className="font-normal text-gray-400">Phone Number</p>
              <p className="font-bold text-black">{phoneNumber}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Account Info */}
      <div>
        <h2 className="text-lg font-bold mb-2">User Account Information</h2>
        <div className=" p-2 bg-white rounded-2xl shadow-[0_2px_12px_0_#eee]">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-3 mt-2">
              <Avatar
                src={admin.photoUrl}
                name={name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="">
                <p className="font-semibold text-[15px]">{admin.name}</p>
                <p className="text-sm text-gray-500 font-normal">
                  {admin.email}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400 font-normal">Admin ID</p>
              <p className="font-semibold text-[15px] mt-0.5">{admin.id}</p>
            </div>
          </div>

          <hr className="my-2" />
          <div className="w-full flex items-center justify-end">
            <Button
              variant="outline"
              color="primary"
              className="px-4 py-1 text-sm rounded-xl text-primary border-primary hover:bg-primary hover:text-secondary transition-all duration-75 ease-in-out"
            >
              Manage Account
            </Button>
          </div>
        </div>
      </div>

      {/* Document */}
      <div>
        <h2 className="text-lg font-normal text-grbold mb-2">Document</h2>
        <div className=" p-2 bg-white rounded-2xl shadow-[0_2px_12px_0_#eee]">
          <div className="mb-1">
            <p className="font-normal text-gray-500">ID</p>
          </div>
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-3 mt-2">
              <div className="p-2 bg-primary rounded-full">
                <UserIDIcon color="#D7F400" />
              </div>
              <div className="">
                <p className="font-semibold text-[15px]">{document.fileName}</p>
                <p className="text-sm text-gray-500 font-normal">
                  {document.fileSize}
                </p>
              </div>
            </div>
            <div className="text-right flex items-end pt-8">
              <p className="text-sm text-gray-400 font-normal">
                {document.uploadedAt}
              </p>
            </div>
          </div>

          <hr className="my-2" />
          <div className="w-full flex items-center justify-end gap-2">
            <Button
              variant="outline"
              color="primary"
              className="px-4 py-1 text-sm rounded-xl text-primary border-primary hover:bg-primary hover:text-secondary transition-all duration-75 ease-in-out"
            >
              Update
            </Button>
            <Button
              variant="solid"
              color="primary"
              className="px-4 py-1 text-sm rounded-xl text-white "
            >
              View Document
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailPanel;
