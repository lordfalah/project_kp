import BreadCrumb from "@/components/BreadCrumb";
import React from "react";
import TableOrder from "./TableOrder";

const itemsLink = [
  { name: "Home", path: "/" },
  { name: "Order Status", path: "/order" },
];

const page = () => {
  return (
    <main className="min-h-screen space-y-14">
      <BreadCrumb itemsLink={itemsLink} className="px-4 sm:px-0 py-7 mt-20" />

      <TableOrder />
    </main>
  );
};

export default page;
