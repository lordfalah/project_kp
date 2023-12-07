import BreadCrumb from "@/components/BreadCrumb";
import React from "react";
import HeroProduct from "./HeroProduct";
import AboutProduct from "./AboutProduct";
import prisma from "@/libs/prisma";
import { redirect } from "next/navigation";
import { getAuthSession } from "@/app/api/auth/[...nextauth]/route";

const getProduct = async (id) => {
  try {
    const response = await prisma.products.findFirst({
      where: {
        id,
      },
    });

    return response;
  } catch (error) {
    return null;
  }
};

export const metadata = {
  title: "Detail Product",
  description: "products",
};

const page = async ({ params }) => {
  const product = await getProduct(params?.id);
  const token = await getAuthSession();

  if (!product) {
    return redirect("/");
  }

  const itemsLink = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Details", path: "" },
  ];

  return (
    <main>
      <BreadCrumb itemsLink={itemsLink} className="px-4 sm:px-0 py-7 mt-20" />
      <HeroProduct product={product} session={token} />
      <AboutProduct />
    </main>
  );
};

export default page;
