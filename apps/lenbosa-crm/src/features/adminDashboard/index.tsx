import React from "react";
import VisitorInsights from "./VisitorInsights";
import TotalRevenue from "./TotalRevenue";
import CustomerSatisfaction from "./CustomerSatisfaction";
import TargetVsReality from "./TargetvsReality";
import VolumeVsServiceLevel from "./VolumeVsServiceLevel";
import SalesSummery from "./SalesSummery";

const AdminDashboard = () => {
  return (
    <div
      style={{
        width: "100%",
        padding: "20px",
        backgroundColor: "#f5f7fa",
        minHeight: "100vh",
      }}
    >
      {/* Grid Container */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "auto auto",
          gap: "20px",
          maxWidth: "1900px",
          margin: "0 auto",
        }}
      >
        {/* Top Row - 60/40 split */}
        <div
          style={{
            gridColumn: "span 3",
            display: "grid",
            gridTemplateColumns: "57% 41%",
            gap: "20px",
          }}
        >
          {/* Sales Summary - 60% width */}
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              padding: "16px",
              // minHeight: "250px",
              height: "300px",
            }}
          >
            <SalesSummery />
          </div>

          {/* Visitor Insights - 40% width */}
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              padding: "16px",
              height: "300px",
            }}
          >
            <VisitorInsights />
          </div>
        </div>

        {/* Bottom Row - 3 equal columns */}
        <div
          style={{
            gridColumn: "span 3",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              padding: "10px",
              height: "250px",
            }}
          >
            <TotalRevenue />
          </div>

          <div
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              padding: "16px",
              height: "250px",
            }}
          >
            <CustomerSatisfaction />
          </div>

          <div
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              padding: "16px",
              height: "250px",
            }}
          >
            <TargetVsReality />
          </div>
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              padding: "16px",
              height: "250px",
            }}
          >
            <VolumeVsServiceLevel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
