"use client";
import React from "react";
import CustomerActions from "./customer-actions";
import CheckerActions from "./checker-actions";

const CustomerDetail = ({ id }: { id: string }) => {
  return (
    <div>
      <CheckerActions />
      <CustomerActions />
      CustomerDetail {id}
    </div>
  );
};

export default CustomerDetail;
