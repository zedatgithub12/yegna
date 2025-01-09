import CustomerDetail from "@/features/customers/detail";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};
const page = async ({ params }: Props) => {
  const id = (await params).id;
  return <CustomerDetail id={id} />;
};

export default page;
