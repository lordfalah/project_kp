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
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_URL_PAGE}/api/products/${id}`,
      { method: "GET", cache: "no-store" }
    );

    const res = await req.json();
    return res;
  } catch (error) {
    console.log(error);
    throw new Error(error.message || "INTERNAL SERVER ERROR");
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

const getOrderByUser = async (id) => {
  try {
    if (!id || id === undefined) return true;
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_URL_PAGE}/api/order/${id}`,
      { cache: "no-store" }
    );

    if (!req.ok) {
      throw new Error(req.statusText || "INTERNAL SERVER ERROR");
    }

    const res = await req.json();
    return res ? true : false;
  } catch (error) {
    return false;
  }
};

const page = async ({ params }) => {
  const product = await getProduct(params?.id);

  if (!product) {
    notFound();
  }
  const productsCategory = await getProductByCategory(product.catSlug);
  const session = await getAuthSession();

  const order = await getOrderByUser(session?.token.id);
  const itemsLink = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Details", path: "" },
  ];

  return (
    <main>
      <BreadCrumb itemsLink={itemsLink} className="px-4 sm:px-0 py-7 mt-20" />
      <HeroProduct product={product} session={session} disable={order} />
      <AboutProduct products={productsCategory} />
    </main>
  );
};

export default page;
