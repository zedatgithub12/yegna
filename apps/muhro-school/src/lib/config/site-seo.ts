import { Metadata } from "next";
import logoImg from "@public/primary-logo.png";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";

enum MODE {
  DARK = "dark",
  LIGHT = "light",
}

export const siteSeo = {
  title: "Muhro School",
  description: `Muhro School is a platform for schools to manage their overall operation`,
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
    title: title ? `${title} - Muhro School is a platform for schools to manage their overall operation` : siteSeo.title,
    description,
    openGraph: openGraph ?? {
      title: title ? `${title} - Muhro School is a platform for schools to manage their overall operation` : title,
      description,
      siteName: "Muhro School is a platform for schools to manage their overall operation",
      locale: "en_US",
      type: "website",
    },
    icons: {
      icon: "/favicon.ico",
    },
  };
};
