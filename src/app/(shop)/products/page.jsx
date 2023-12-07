import BreadCrumb from "@/components/BreadCrumb";
import prisma from "@/libs/prisma";
import React from "react";
import ListMenu from "./ListMenu";
import FilterMenu from "./FilterMenu";

export const revalidate = 0;
export const getProducts = async (Qmenu) => {
  let response;
  try {
    if (Qmenu.trim() !== "") {
      response = await prisma.products.findMany({
        where: {
          title: {
            startsWith: Qmenu,
          },
        },
      });
    } else {
      response = await prisma.products.findMany();
    }
    return response || [];
  } catch (error) {
    throw new Error(error);
  }
};

const itemsLink = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
];

const page = async ({ searchParams }) => {
  const menu = searchParams?.menu || "";
  const category = searchParams?.category || "";

  const products = await getProducts(menu);

  return (
    <main>
      <BreadCrumb itemsLink={itemsLink} className="px-4 sm:px-0 py-7 mt-20" />
      <section className="bg-gray-100 ">
        <ListMenu products={products}>
          <FilterMenu />
        </ListMenu>
      </section>
    </main>
  );
};

export default page;
