import { Metadata } from "next";
import logoImg from "@public/primary-logo.png";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";

enum MODE {
  DARK = "dark",
  LIGHT = "light",
}

export const siteSeo = {
  title: "Lenbosa Property",
  description: `Lenbosa Property - real estate property listing platform`,
  logo: logoImg,
  icon: "/favicon.ico",
  mode: MODE.LIGHT,
};

export const metaObject = (
  title?: string,
  openGraph?: OpenGraph,
  description: string = siteSeo.description
): Metadata => {
  return {
    title: title
      ? `${title} - Lenbosa Property - real estate property listing platform`
      : siteSeo.title,
    description,
    openGraph: openGraph ?? {
      title: title
        ? `${title} - Lenbosa Property - real estate property listing platform`
        : title,
      description,
      siteName: "Lenbosa Property - real estate property listing platform",
      locale: "en_US",
      type: "website",
    },
    icons: {
      icon: "/favicon.ico",
    },
  };
};
