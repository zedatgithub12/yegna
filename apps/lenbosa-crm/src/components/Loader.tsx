import React from "react";
import { Loader as Load } from "rizzui";

const Loader = ({ size = 20 }: { size?: number }) => {
  return (
    <Load
      variant="threeDot"
      fontSize={`${size}px`}
      size="lg"
      color="primary"
    />
  );
};

export default Loader;
