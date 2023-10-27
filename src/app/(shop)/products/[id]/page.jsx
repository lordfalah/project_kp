"use client";

import BreadCrumb from "@/components/BreadCrumb";
import { useParams } from "next/navigation";
import React from "react";
import HeroProduct from "./HeroProduct";
import AboutProduct from "./AboutProduct";

const page = () => {
  const { id } = useParams();
  const itemsLink = [
    { name: "Home", path: "/" },
    { name: "Products", path: "" },
    { name: "Details", path: "" },
  ];

  return (
    <main>
      <BreadCrumb itemsLink={itemsLink} className="px-4 sm:px-0 py-7 mt-20" />
      <HeroProduct />
      <AboutProduct />
    </main>
  );
};

export default page;
