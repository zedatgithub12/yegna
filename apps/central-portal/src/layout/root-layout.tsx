import React from "react";
import Header from "./header";

type Props = {
  children: React.ReactNode;
};
const MainLayout = ({ children }: Props) => {
  return (
    <main className="flex flex-col min-h-screen flex-grow bg-[#f8f8f8] dark:bg-black">
      <Header />
      {children}
    </main>
  );
};

export default MainLayout;
