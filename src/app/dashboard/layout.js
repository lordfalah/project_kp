import SideNav from "@/components/dashboard/SideNav";
import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <div className="m-0 font-sans text-base antialiased font-normal leading-default text-slate-500 relative bg-gray-100">
      <div className="absolute w-full bg-blue-500 h-72"></div>

      <SideNav />
      <div className="block xl:flex xl:gap-x-4">
        <div className="max-w-[280px] w-full"></div>
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
