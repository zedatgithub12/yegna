import { Metadata } from "next";
import logoImg from "@public/primary-logo.png";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";

enum MODE {
  DARK = "dark",
  LIGHT = "light",
}

export const siteSeo = {
  title: "Lenbosa CRM",
  description: `Lenbosa CRM - real agents customer relation management platform`,
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
    title: title ? `${title} - Lenbosa CRM - real agents customer relation management platform` : siteSeo.title,
    description,
    openGraph: openGraph ?? {
      title: title ? `${title} - Lenbosa CRM - real agents customer relation management platform` : title,
      description,
      siteName: "Lenbosa CRM - real agents customer relation management platform",
      locale: "en_US",
      type: "website",
    },
    icons: {
      icon: "/favicon.ico",
    },
  };
};
