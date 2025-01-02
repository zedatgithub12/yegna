import LogoImage from "@public/Blue_Logo.png";
import Image, { StaticImageData } from "next/image";
import cn from "@coop-super-app/ui/cn";

export default function Logo({
  className,
  image,
}: {
  className?: string;
  image?: StaticImageData;
}) {
  return (
    <Image
      src={image ?? LogoImage}
      alt="logo"
      className={cn("h-12 object-contain w-full", className)}
      priority
    />
  );
}
