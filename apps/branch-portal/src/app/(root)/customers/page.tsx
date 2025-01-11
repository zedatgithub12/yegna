import React from 'react'
import CustomersList from '@/features/customers/list/customers-list';
import { metaObject } from "@/lib/config/site-seo";
export const metadata = {
  ...metaObject("Customers"),
};
const page = () => {
  return (
    <CustomersList />
  )
}

export default page