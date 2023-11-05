import Header from "@/components/dashboard/Header";
import Tables from "@/components/dashboard/Tables";
import React from "react";

const page = () => {
  return (
    <main className="relative h-full min-h-screen transition-all duration-200 ease-in-out xl:ml-68 rounded-xl w-full">
      <div className="w-full px-6 py-6 mx-auto">
        <Header />

        <Tables />
      </div>
    </main>
  );
};

export default page;
