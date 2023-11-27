import BreadCrumb from "@/components/BreadCrumb";
import React from "react";
import HeroProduct from "./HeroProduct";
import AboutProduct from "./AboutProduct";
import getQueryClient from "@/utils/query/getQueryClient";
import prisma from "@/libs/prisma";
import { redirect } from "next/navigation";

const getProduct = async (id) => {
  const response = await prisma.products.findFirst({
    where: {
      id,
    },
  });

  return response;
};

const page = async ({ params }) => {
  const queryClient = getQueryClient();

  const product = await queryClient.fetchQuery({
    queryKey: ["products"],
    queryFn: () => getProduct(params?.id),
  });

  if (!product) {
    return redirect("/");
  }

  const itemsLink = [
    { name: "Home", path: "/" },
    { name: "Products", path: "" },
    { name: "Details", path: "" },
  ];

  return (
    <main>
      <BreadCrumb itemsLink={itemsLink} className="px-4 sm:px-0 py-7 mt-20" />
      <HeroProduct product={product} />
      <AboutProduct />
    </main>
  );
};

export default page;
