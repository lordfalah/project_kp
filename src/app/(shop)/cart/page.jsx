import BreadCrumb from "@/components/BreadCrumb";
import React from "react";
import TableShop from "./TableShop";

const itemsLink = [
  { name: "Home", path: "/" },
  { name: "Shopping Cart", path: "/cart" },
];

const page = () => {
  return (
    <main className="min-h-screen space-y-14">
      <BreadCrumb itemsLink={itemsLink} className="px-4 sm:px-0 py-7 mt-20" />
      <TableShop />
    </main>
  );
};

export default page;
