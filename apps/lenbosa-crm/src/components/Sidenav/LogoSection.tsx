import React from "react";
import Logo from "../logo";

const LogoSection = () => {
  return (
    <div className="flex items-center gap-2 p-2 sticky top-0 bg-white">
      <Logo />
      <div>
        <p className="text-md font-bold uppercase text-primary">Lanbosa-CRM</p>
        <p className="text-sm text-gray-500">Admin</p>
      </div>
    </div>
  );
};

export default LogoSection;
