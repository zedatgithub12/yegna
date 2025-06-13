import CustomersIcon from "@/components/icons/customers";
import ProductSoldIcon from "@/components/icons/productSold";
import TotalOrderIcon from "@/components/icons/totalOrder";
import TotalSaleIcon from "@/components/icons/totalsale";
import React from "react";

const data = [
  {
    icon: <TotalSaleIcon />,
    value: "$1k",
    label: "Total Sales",
    change: "+8% from yesterday",
    bg: "bg-gray-50",
    text: "text-blue-600",
    iconBg: "bg-primary",
  },
  {
    icon: <TotalOrderIcon />,
    value: "300",
    label: "Total Order",
    change: "+5% from yesterday",
    bg: "bg-lime-100",
    text: "text-blue-600",
    iconBg: "bg-secondary",
  },
  {
    icon: <ProductSoldIcon />,
    value: "5",
    label: "Product Sold",
    change: "+1.2% from yesterday",
    bg: "bg-blue-50",
    iconBg: " bg-slate-500",
    text: "text-blue-600",
  },
  {
    icon: <CustomersIcon />,
    value: "8",
    label: "New Customers",
    change: "0.5% from yesterday",
    bg: "bg-gray-100",
    iconBg: "bg-gray-400",
    text: "text-blue-400",
  },
];

const SalesSummery = () => {
  return (
    <div className="bg-white ">
      <h2 className="text-2xl font-bold text-gray-800 ">Today&apos;s Sales</h2>
      <p className="text-gray-400 text-sm mb-6">Sales Summary</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 ">
        {data.map((item, index) => (
          <div
            key={index}
            className={`rounded-xl p-3 ${item.bg} flex flex-col items-start gap-3`}
          >
            <div
              className={`${item.iconBg} rounded-full p-2  flex items-center justify-center`}
            >
              {item.icon}
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{item.value}</h3>
            <p className="text-gray-600">{item.label}</p>
            <span className={`text-xs ${item.text}`}>{item.change}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesSummery;
