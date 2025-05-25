"use client";

import Header from "@/components/Header";
import React from "react";

const Dashboard = () => {
  return (
    <div>
      <Header title="Dashboard" back={true} search={false} breadcrumb={true} />
      Dashboard
    </div>
  );
};

export default Dashboard;
