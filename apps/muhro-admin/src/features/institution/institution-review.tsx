"use client";

import React from "react";
import { EthiopianPhoneNumber } from "@/utils/lib/ethiopian-phone";
import EditPencil from "@/components/icons/edit-pencil";
import Image from "next/image";

import { Avatar } from "@yegna-systems/ui/avatar";
import { Button } from "@/components/ui/button";
import LocationIcon from "@/components/icons/location";

export type InstitutionReviewValue = {
  values: {
    school_name: string;
    profile_photo_url?: string;
    school_type: string;
    first_name: string;
    position: string;
    gender: string;
    middle_name: string;
    last_name: string;
    school_code?: string;
    // email: string;
    phone_number: string;
    access_role: string;
    bank: string;
    // phone: string;
    collection_account: string;
    education_level: string;
    location: string;
    user_name: string;
  };
  onEdit?: (section: string) => void;
};

const InstitutionReview = ({ values, onEdit }: InstitutionReviewValue) => {
  return (
    <div className="space-y-6 p-2 bg-white rounded-lg shadow-sm text-gray-800">
      <div className="flex justify-between items-center mb-6"></div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left column (2/3 width on large screens) */}
        <div className="lg:col-span-1 space-y-6">
          <div>
            <div className="flex justify-start gap-5 mb-4">
              <h2 className="text-lg font-semibold">Institution Information</h2>
              {onEdit && (
                <Button
                  size="sm"
                  onClick={() => onEdit("basic")}
                  className="flex items-center gap-1 bg-white "
                >
                  <EditPencil className="w-5 h-5" />
                </Button>
              )}
            </div>

            <div>
              <div className="flex items-start gap-6">
                {values.profile_photo_url ? (
                  <Image
                    src={values.profile_photo_url}
                    alt="Profile"
                    width={300}
                    height={300}
                    className="w-32 h-32 rounded-lg object-cover bg-gray-200"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-lg bg-gray-200 flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-normal text-gray-400">School Name</p>
                    <p>{values.school_name}</p>
                  </div>
                  {/* <div>
                    <p className="font-normal text-gray-400">Email</p>
                    <p>{values.email}</p>
                  </div> */}
                  <div>
                    <p className="font-normal text-gray-400">Phone</p>
                    <p>{EthiopianPhoneNumber(values.phone_number)}</p>
                  </div>
                  <div>
                    <p className="font-normal text-gray-400">Education Level</p>
                    <p>{values.education_level}</p>
                  </div>
                  <div>
                    <p className="font-normal text-gray-400">Type</p>
                    <p>{values.school_type}</p>
                  </div>
                  <div>
                    <p className="font-normal text-gray-400">Selected Bank</p>
                    <p>{values.bank}</p>
                  </div>
                  <div>
                    <p className="font-normal text-gray-400">
                      Collection Account
                    </p>
                    <p>{values.collection_account}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Location Information */}
          <div className="space-y-6 p-2 bg-white rounded-lg shadow-sm text-gray-800">
            <div className="flex justify-start gap-5 items-center">
              <h2 className="text-lg font-semibold">Institution Address </h2>
              {onEdit && (
                <Button
                  size="sm"
                  onClick={() => onEdit("location")}
                  className="flex items-center gap-1 bg-white "
                >
                  <EditPencil className="w-5 h-5" />
                </Button>
              )}
            </div>
            <div className="p-2 bg-white rounded-2xl shadow-[0_2px_12px_0_#eee]">
              <div className="flex items-center gap-3 mt-2">
                <div className="p-2 bg-primary rounded-full">
                  <LocationIcon color="#D7F400" />
                </div>
                <div className="grid grid-cols-2 gap-4 w-full">
                  <div>
                    <p className="font-normal text-gray-400">Location</p>
                    <p className="font-semibold">{values.location}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Subscription Information */}
          <div className="space-y-6 p-2 ">
            <div className="flex gap-5 items-center">
              <h2 className="text-lg font-semibold">Subscription Plan</h2>
              {onEdit && (
                <Button
                  size="sm"
                  onClick={() => onEdit("subscription")}
                  className="flex items-center gap-1 bg-white "
                >
                  <EditPencil className="w-5 h-5 text-black" />
                </Button>
              )}
            </div>

            <div>
              <div className="p-2 bg-white rounded-2xl shadow-[0_2px_12px_0_#eee]">
                {/* <div className="flex flex-col items-start justify-between px-1">
                  <p>{values.subscription_cycle}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <UserIDIcon className="w-10 h-10 text-gray-500" />
                    <div className="">
                      <p className="font-normal text-gray-400">Name</p>
                      <p>{values.subscription_plan_id}</p>
                    </div>
                  </div>
                  <div className="text-right"></div>
                </div> */}

                <hr className="my-2" />
                <div className="w-full flex items-center justify-end">
                  <Button
                    variant="outline"
                    color="primary"
                    className="px-4 py-1 text-sm rounded-xl text-primary border-primary hover:bg-primary hover:text-secondary transition-all duration-75 ease-in-out"
                  >
                    Manage Plan
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column (1/3 width on large screens) - Admin Information */}

        <div className="bg-gray-50 rounded-lg shadow-sm p-4 text-gray-800">
          <div className="flex justify-start gap-5 items-center mb-4">
            <h2 className="text-lg font-bold">Admin Information</h2>
            {onEdit && (
              <Button
                size="sm"
                onClick={() => onEdit("admin")}
                className="flex items-center gap-1 bg-white"
              >
                <EditPencil className="w-5 h-5" />
              </Button>
            )}
          </div>
          <hr className="my-2" />

          <div className="flex bg-white shadow-md rounded-md p-4 flex-col items-center text-center space-y-1">
            <Avatar
              src="/images/default-admin.png"
              name="Admin"
              size="lg"
              customSize={100}
              className="w-16 h-16 rounded-full object-cover"
            />
            <p className="text-lg font-semibold">{values.first_name}</p>
            {/* <p className="text-sm text-gray-500">{values?.email || "N/A"}</p> */}
          </div>

          <div className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between">
              <p className="font-medium text-gray-500">First Name</p>
              <p>{values.middle_name || "N/A"}</p>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between">
              <p className="font-medium text-gray-500">Last Name</p>
              <p>{values.last_name || "N/A"}</p>
            </div>

            <hr className="my-2" />
            <div className="flex justify-between">
              <p className="font-medium text-gray-500">Phone Number</p>
              {/* <p>{EthiopianPhoneNumber(values?.admin_phone) || "N/A"}</p> */}
              <p>{values?.phone_number || "N/A"}</p>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between">
              <p className="font-medium text-gray-500">Email</p>
              {/* <p>{values?.email || "N/A"}</p> */}
            </div>
            <hr className="my-2" />
            <div className="flex justify-between">
              <p className="font-medium text-gray-500 rounded-full  px-2 py-1">
                Role
              </p>
              <p className="bg-secondary text-white rounded-full px-2 py-1">
                {values?.access_role || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutionReview;
