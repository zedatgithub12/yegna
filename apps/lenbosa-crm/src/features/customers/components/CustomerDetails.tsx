"use client";

import { Button } from "@yegna-systems/ui/button";
import Image from "next/image";
import React from "react";

export interface CustomerDetailPanelProps {
  profilePhoto: string;
  name: string;
  userName: string;
  customer_type: string;
  registeredAt: string;
  email: string;
  phoneNumber: string;
  subscription: CustomerSubscription[];
}

const UserDetailPanel: React.FC<CustomerDetailPanelProps> = ({
  profilePhoto,
  name,
  userName,
  customer_type,
  registeredAt,
  email,
  phoneNumber,
  subscription,
}) => {
  return (
    <div className="space-y-6 p-2 bg-white rounded-lg shadow-sm text-gray-800">
      <div>
        <h2 className="text-lg font-bold mb-2">User Information</h2>
        <div className="flex items-start gap-6 ">
          <Image
            src={profilePhoto}
            alt="Profile"
            width={300}
            height={300}
            className="w-32 h-32 rounded-lg object-cover bg-gray-100"
          />
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
              <p className="font-normal text-gray-400">Role</p>

              <p className="font-bold text-black">{customer_type}</p>
            </div>
            <div>
              <p className="font-normal text-gray-400">Registered at</p>
              <p className="font-bold">{registeredAt}</p>
            </div>
            <div>
              <p className="font-normal text-gray-400 line-clamp-1">Email</p>
              <p>{email}</p>
            </div>
            <div>
              <p className="font-normal text-gray-400">Phone Number</p>
              <p className="font-bold text-black">{phoneNumber}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Subscription */}
      <div>
        <h2 className="text-lg font-bold mb-2">Subscription Plan</h2>
        {subscription.map((plan, index) => (
          <div
            key={index}
            className=" p-2 bg-white rounded-2xl shadow-[0_2px_12px_0_#eee]"
          >
            <div className="mb-1">
              <p className="font-normal text-gray-500">{plan.cycle}</p>
            </div>
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-2">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center"
                    style={{
                      background: plan?.plan?.color
                        ? `linear-gradient(45deg, ${plan?.plan?.color})`
                        : "#ddd",
                    }}
                  >
                    <div className={`w-5 h-5 rounded-full  bg-white`} />
                  </div>
                </div>
                <div className="">
                  <p className="font-semibold text-[15px]">
                    {plan?.plan?.name}
                  </p>

                  <div
                    className="text-sm text-gray-500 font-normal"
                    dangerouslySetInnerHTML={{
                      __html: plan?.plan?.description ?? "",
                    }}
                  />
                </div>
              </div>
            </div>

            <hr className="my-2" />
            <div className="w-full flex items-center justify-end gap-2">
              <Button
                variant="outline"
                color="primary"
                className="px-4 py-1 text-sm rounded-xl text-white "
              >
                Manage Plan
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDetailPanel;
