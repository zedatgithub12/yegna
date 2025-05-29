"use client";

import React from "react";
import { Popover, Button, Avatar, Text } from "rizzui";

const Profile = () => {
  return (
    <Popover enableOverlay showArrow={false}>
      <Popover.Trigger>
        <div className="w-12 cursor-pointer">
          <Avatar
            name="profile"
            src=""
            size="sm"
            className="text-secondary"
            color="secondary"
          />
        </div>
      </Popover.Trigger>
      <Popover.Content className="bg-white border-none shadow-3xl shadow-gray-400 ">
        {({ setOpen }) => (
          <div className=" rounded-md ">
            <div className="mb-3 flex items-center gap-3 border-none">
              <div>
                <Text className="text-base font-semibold text-gray-900">
                  Fred Chaparro
                </Text>
                <Text className="text-sm text-gray-500">@fredchaparro</Text>
              </div>
              <hr />
            </div>
            <hr className="h-[0.2px] text-gray-200 my-4" />
            <div className="max-w-[240px] text-sm">
              <div className=" inline-flex gap-3 text-gray-500">
                <Button>Account</Button>
              </div>
            </div>
            <hr className="h-[0.2px] text-gray-200 my-4" />
            <Button
              className="w-full text-sm bg-primary"
              size="sm"
              onClick={() => setOpen(false)}
            >
              Sign Out
            </Button>
          </div>
        )}
      </Popover.Content>
    </Popover>
  );
};

export default Profile;
