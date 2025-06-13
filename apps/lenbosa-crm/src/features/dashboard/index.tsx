"use client";

import Header from "@/components/Header";
import React from "react";
import AdminDashboard from "../adminDashboard";

const Dashboard = () => {
  return (
    <div>
      <Header title="Dashboard" back={false} search={true} breadcrumb={true} />
      <AdminDashboard />
    </div>
  );
};

export default Dashboard;
