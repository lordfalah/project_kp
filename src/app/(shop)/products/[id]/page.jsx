import BreadCrumb from "@/components/BreadCrumb";
import React from "react";
import HeroProduct from "./HeroProduct";
import AboutProduct from "./AboutProduct";
import prisma from "@/libs/prisma";
import { getAuthSession } from "@/app/api/auth/[...nextauth]/route";
import { notFound } from "next/navigation";

export const revalidate = 0;

export const metadata = {
  title: "Detail Product",
  description: "products",
};

const getProduct = async (id) => {
  try {
    const response = await prisma.products.findFirst({
      where: {
        id,
      },
    });

    if (!response) return null;

    return response;
  } catch (error) {
    throw new Error(error.message || "");
  }
};

const getProductByCategory = async (category) => {
  try {
    const response = await prisma.products.findMany({
      where: {
        catSlug: category,
      },
    });

    return response ? response : [];
  } catch (error) {
    throw new Error(error.message || "");
  }
};

const page = async ({ params }) => {
  const product = await getProduct(params?.id);
  if (!product) {
    notFound();
  }
  const productsCategory = await getProductByCategory(product.catSlug);
  const token = await getAuthSession();

  const itemsLink = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Details", path: "" },
  ];

  return (
    <main>
      <BreadCrumb itemsLink={itemsLink} className="px-4 sm:px-0 py-7 mt-20" />
      <HeroProduct product={product} session={token} />
      <AboutProduct products={productsCategory} />
    </main>
  );
};

export default page;
