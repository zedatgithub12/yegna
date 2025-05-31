import React from "react";
import Image from "next/image";
import NotFound from "@public/images/not_found.png";
import forbidden from "@public/images/forbidden_access.png";
import serverError from "@public/images/server_error.png";

const FallbackImages = (status: string) => {
  switch (status) {
    case "404":
      return <Image src={NotFound} alt="Not found" width={200} height={200} />;
    case "403":
      return (
        <Image
          src={forbidden}
          alt="Forbidden access"
          width={200}
          height={200}
        />
      );
    case "500":
      return (
        <Image src={serverError} alt="Server Error" width={200} height={200} />
      );
    default:
      return null;
  }
};

const FallbackComponent = ({
  status_code = "",
  title,
  message,
  action,
}: fallbackComponentProps) => {
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-40 py-8">
      {FallbackImages(status_code)}

      <p className="text-xl font-semibold">{title}</p>
      <p className="text-sm font-normal text-gray-500 my-1">{message}</p>

      {action ? <div>{action}</div> : null}
    </div>
  );
};

export default FallbackComponent;
