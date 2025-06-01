import LogoImage from "@public/primary-logo.png";
import Image, { StaticImageData } from "next/image";
import cn from "@yegna-systems/ui/cn";

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
      className={cn("w-12 h-12 object-contain ", className)}
      priority
    />
  );
}
