import Cards from "@/components/dashboard/Cards";
import Header from "@/components/dashboard/Header";
import SideNav from "@/components/dashboard/SideNav";
import { NavigateOpen } from "@/utils/hooks/useOpenNav";
import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <div className="m-0 font-sans text-base antialiased font-normal leading-default text-slate-500 relative before:fixed before:-z-50 before:inset-0 before:bg-gray-100 after:absolute after:top-0 after:w-full after:-z-10 after:bg-blue-500 after:h-72">
      <div className="block xl:flex gap-x-8">
        <NavigateOpen>
          <SideNav />
          <div className="max-w-[280px] w-auto xl:w-full"></div>
          <main className="relative h-full min-h-screen transition-all duration-200 ease-in-out  rounded-xl w-full col-span-5">
            <div className="w-full px-6 py-6 mx-auto">
              <Header />
              <Cards />
              {children}
            </div>
          </main>
        </NavigateOpen>
      </div>
    </div>
  );
};

export default DashboardLayout;
