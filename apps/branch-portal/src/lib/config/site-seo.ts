import { Metadata } from "next";
import logoImg from "@public/Blue_Logo.png";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";

enum MODE {
  DARK = "dark",
  LIGHT = "light",
}

export const siteSeo = {
  title: "Coop Super App - Branch Portal",
  description: `Coop Super App - Branch Portal`,
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
    title: title ? `${title} - Coop Super App - Branch Portal` : siteSeo.title,
    description,
    openGraph: openGraph ?? {
      title: title ? `${title} - Coop Super App - Branch Portal` : title,
      description,
      siteName: "Coop Super App - Branch Portal",
      locale: "en_US",
      type: "website",
    },
    icons: {
      icon: "/favicon.ico",
    },
  };
};
