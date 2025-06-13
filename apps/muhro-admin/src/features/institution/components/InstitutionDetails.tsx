import LocationIcon from "@/components/icons/location";
// import { queryKeys } from "@/lib/api/query-keys";
// import { useFetchData } from "@/lib/api/use-fetch-data";
import { Avatar } from "@yegna-systems/ui/avatar";
import { Button } from "@yegna-systems/ui/button";
import Image from "next/image";
import React from "react";
import { InstitutionReviewValue } from "../institution-review";
import { Title } from "@yegna-systems/ui/typography";

const InstitutionDetailsPanel: React.FC<
  { id: string } & InstitutionReviewValue
> = ({ id, values }) => {
  return (
    <div className="space-y-6 p-2 bg-white rounded-lg shadow-sm text-gray-800">
      {/* Updated Header */}
      <h1 className="text-xl font-bold text-gray-700">
        Based on the column data, this is the detailed page
      </h1>

      <div>
        <h2 className="text-lg font-semibold mb-2">User Information</h2>
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
            <div className="w-32 h-32 rounded-lg bg-gray-200 flex items-center justify-center">
              No Image
            </div>
          )}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-normal text-gray-400">Name</p>
              <p>{values.school_name}</p>
            </div>
            <div>
              <p className="font-normal text-gray-400">Institution ID</p>
              <p className="font-bold text-black">{values.school_code}</p>
            </div>
            <div>
              <p className="font-normal text-gray-400">Type </p>
              <p>{values.school_type}</p>
            </div>
            <div>
              <p className="font-normal text-gray-400">Education Level </p>
              <p>{values.education_level}</p>
            </div>
            <div>
              <p className="font-normal text-gray-400">Email</p>
              <p>{values.middle_name}</p>
            </div>
            <div>
              <p className="font-normal text-gray-400">Selected Bank</p>
              <p>{values.bank}</p>
            </div>
            <div>
              <p className="font-normal text-gray-400">Phone Number</p>
              <p className="font-bold text-black">{values.phone_number}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Account Info */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Admin Information</h2>
        <div className="p-2 bg-white rounded-2xl shadow-[0_2px_12px_0_#eee]">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-3 mt-2">
              <Avatar
                src={values.profile_photo_url}
                name="Admin"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="">
                <p className="font-semibold text-[15px]">{values.first_name}</p>
                {/* <p className="text-sm text-gray-500 font-normal">{values.email}</p> */}
                {values.phone_number && (
                  <p className="text-sm text-gray-500 font-normal">
                    {values.phone_number}
                  </p>
                )}
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400 font-normal">Admin ID</p>
              <p className="font-semibold text-[15px] mt-0.5">{id}</p>
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

      {/* location Section */}
      <div>
        <Title className="text-lg font-semibold">School Address</Title>
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
      {/* <div>
        <h2 className="text-lg font-semibold mb-2">Institution Address</h2>
        <div className="p-2 bg-white rounded-2xl shadow-[0_2px_12px_0_#eee]">
          <div className="flex items-center gap-3 mt-2">
            <div className="p-2 bg-primary rounded-full">
              <LocationIcon color="#D7F400" />
            </div>
            <div className="grid grid-cols-2 gap-4 w-full">
              {location.latitude && (
                <div>
                  <p className="font-normal text-gray-400">Latitude</p>
                  <p className="font-semibold">{location.latitude}</p>
                </div>
              )}
              {location.longitude && (
                <div>
                  <p className="font-normal text-gray-400">Longitude</p>
                  <p className="font-semibold">{location.longitude}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default InstitutionDetailsPanel;
