import Image from "next/image";
import React from "react";
import logo from "@public/assets/images/logo.png";

const Logo = ({
  width = 60,
  height = 60,
}: {
  width?: number;
  height?: number;
}) => {
  return <Image src={logo} alt="logo" width={width} height={height} />;
};

export default Logo;
