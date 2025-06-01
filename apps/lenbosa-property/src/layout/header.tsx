"use client";

import Cover from "@public/images/Auth-Cover.png";
import ProfileMenu from "./profile-menu";
import Image from "next/image";
import WhiteLogo from "@public/secondary-logo.png";
import Logo from "@/components/logo";
import cn from "@yegna-systems/ui/cn";
import TopNavigationMenus from "@/components/menus/top-navigation";
import { hasNumber } from "@yegna-systems/lib/utils/misc";
import { Text, Title } from "@yegna-systems/ui/typography";
import { TiArrowBack } from "react-icons/ti";
import { useRouter } from "nextjs-toploader/app";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathName = usePathname();
  const router = useRouter();
  const path = pathName
    .replaceAll("/", " ")
    .replaceAll("-", " ")
    .split(" ")
    .filter((item) => !hasNumber(item))
    .join(" ");

  return (
    <div
      className={cn(
        " relative w-full bg-primary  rounded-lg flex flex-col items-start mb-1",
        pathName === "/" ? "h-[260px] mb-[400px] md:mb-64 lg:mb-20" : "bg-white"
      )}
    >
      {pathName === "/" && (
        <Image
          src={Cover}
          priority
          alt="Cover"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      <div
        className={cn(
          "z-40 flex w-full items-center justify-between gap-3 border-b border-dashed border-[#f8f8f8] p-3 px-5 md:px-6",
          pathName !== "/" && "border-black/50"
        )}
      >
        {pathName === "/" ? (
          <Logo className="h-12 w-fit" image={WhiteLogo} />
        ) : (
          <Logo className="h-12 w-fit" />
        )}
        <ProfileMenu />
      </div>
      {pathName === "/" ? (
        <div
          className={
            "z-40 flex w-full flex-col items-start gap-1 p-3 px-5 md:px-6"
          }
        >
          {pathName === "/" ? (
            <Title as="h4" className="text-md text-white lg:text-xl">
              👋 Welcome to Lenbosa CRM
            </Title>
          ) : (
            <button
              onClick={() => router.back()}
              className="group z-40 flex w-fit items-center gap-2 p-1"
            >
              <TiArrowBack className={cn("capitalize text-white")} size={22} />
              <Title as="h4" className={cn("capitalize text-white")}>
                {path}
              </Title>
            </button>
          )}
          <Text as="p" className={cn("max-w-2xl text-white/80")}>
            Efficiently manage performance, transactions, and all essential
            settings of the super app in one place.
          </Text>
        </div>
      ) : (
        <button
          onClick={() => router.back()}
          className="group z-40 flex w-fit items-center gap-2 p-3"
        >
          <TiArrowBack
            className={cn(
              "capitalize text-white group-hover:text-primary",
              pathName !== "/" && "text-black"
            )}
            size={22}
          />
          <Title
            as="h6"
            className={cn(
              "capitalize text-white group-hover:text-primary",
              pathName !== "/" && "text-black"
            )}
          >
            {path}
          </Title>
        </button>
      )}
      {pathName === "/" && (
        <div className="xl:absolute xl:left-0 xl:right-0 z-50 xl:-bottom-[30%] p-3 px-5 md:px-6 w-full">
          <TopNavigationMenus />
        </div>
      )}
    </div>
  );
}
