"use client";

import MyProfile from "./components/MyProfile";
import Header from "@/components/Header";

export function AccountSettings() {
  return (
    <>
      <div>
        <Header
          title="My Account"
          back={true}
          search={false}
          breadcrumb={true}
          hasActionButton
        />

        <div className="gap-2  bg-white rounded-xl mt-4 justify-start">
          <div className="flex">
            <MyProfile />
          </div>
        </div>
      </div>
    </>
  );
}
