import LocationIcon from "@/components/icons/location";
import { Avatar } from "@yegna-systems/ui/avatar";
import { Button } from "@yegna-systems/ui/button";
import Image from "next/image";
import React from "react";

const InstitutionDetailsPanel: React.FC<InstitutionShowData> = ({
  profile_photo_url,
  name,
  email,
  phone,
  admin,
  location,
}) => {
  return (
    <div className="space-y-6 p-2 bg-white rounded-lg shadow-sm text-gray-800">
      <div>
        <h2 className="text-lg font-semibold mb-2">User Information</h2>
        <div className="flex items-start gap-6">
          {profile_photo_url ? (
            <Image
              src={profile_photo_url}
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
              <p>{name}</p>
            </div>
            <div>
              <p className="font-normal text-gray-400">Email</p>
              <p>{email}</p>
            </div>
            <div>
              <p className="font-normal text-gray-400">Phone Number</p>
              <p className="font-bold text-black">{phone}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Account Info */}
      <div>
        <h2 className="text-lg font-semibold mb-2">User Account Information</h2>
        <div className="p-2 bg-white rounded-2xl shadow-[0_2px_12px_0_#eee]">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-3 mt-2">
              <Avatar
                src={admin.profile_photo_url}
                name={admin.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="">
                <p className="font-semibold text-[15px]">{admin.name}</p>
                <p className="text-sm text-gray-500 font-normal">
                  {admin.email}
                </p>
                {admin.phone && (
                  <p className="text-sm text-gray-500 font-normal">
                    {admin.phone}
                  </p>
                )}
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

      {/* location Section */}
      {location && (location.latitude || location.longitude) && (
        <div>
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
        </div>
      )}
    </div>
  );
};

export default InstitutionDetailsPanel;
