"use client";

import MainLayout from "@/layout/root-layout";
import { useIsMounted } from "@/lib/hooks/use-is-mounted";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMounted = useIsMounted();

  if (!isMounted) {
    return null;
  }

  return <MainLayout>{children}</MainLayout>;
}
