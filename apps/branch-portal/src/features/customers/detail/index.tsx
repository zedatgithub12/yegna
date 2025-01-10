'use client'
import React from "react";
import CustomerActions from './customer-actions'

const CustomerDetail = ({ id }: { id: string }) => {
  return (
    <div>
      <CustomerActions />
      CustomerDetail {id}
    </div>
  );
};

export default CustomerDetail;
