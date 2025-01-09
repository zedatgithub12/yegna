import React from 'react'
import { metaObject } from "@/lib/config/site-seo";
import CustomersList from '@/features/customers/list/customers-list';
export const metadata = {
  ...metaObject("Customers"),
};
const page = () => {
  return (
    <CustomersList />
  )
}

export default page