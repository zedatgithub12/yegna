import type { Metadata } from "next";
import "@coop-super-app/tailwind-config/base-styles";
import GlobalDrawer from "@coop-super-app/lib/view/drawer-view";
import GlobalModal from "@coop-super-app/lib/view/modal-view";
import { Toaster } from "sonner";
import AppProvider from "@/provider/app-provider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/auth-options";
import { inter, outfit } from "@/fonts/font";
import { siteSeo } from "@/lib/config/site-seo";
import NextProgress from "@/components/next-progress";

export const metadata: Metadata = {
  title: siteSeo.title,
  description: siteSeo.description,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${inter.variable} font-outfit antialiased`}
        suppressHydrationWarning
      >
        <AppProvider session={session}>
          <NextProgress />
          <Toaster position="bottom-center" visibleToasts={1} />
          <GlobalDrawer />
          <GlobalModal />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
