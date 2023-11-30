import BreadCrumb from "@/components/BreadCrumb";
import React from "react";
import TableShop from "./TableShop";
import { getAuthSession } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/libs/prisma";
import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";

const itemsLink = [
  { name: "Home", path: "/" },
  { name: "Shopping Cart", path: "/cart" },
];

const getMyOrder = async (id) => {
  try {
    const response = await prisma.order.findFirst({
      where: {
        userId: id,
      },
    });

    return response ? response : null;
  } catch (error) {
    return null;
  }
};

const page = async () => {
  const session = await getAuthSession();

  if (session && !session?.token) {
    return redirect("/");
  }

  const myOrder = await getMyOrder(session?.token?.id);
  if (myOrder) {
    return redirect("/order");
  }

  return (
    <main className="min-h-screen space-y-14">
      <BreadCrumb itemsLink={itemsLink} className="px-4 sm:px-0 py-7 mt-20" />
      <TableShop />
    </main>
  );
};

export default page;
