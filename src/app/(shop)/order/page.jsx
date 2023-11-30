import BreadCrumb from "@/components/BreadCrumb";
import React from "react";
import TableOrder from "./TableOrder";
import { getAuthSession } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const itemsLink = [
  { name: "Home", path: "/" },
  { name: "Order Status", path: "/order" },
];

const page = async () => {
  const session = await getAuthSession();

  if (session && !session?.token) {
    return redirect("/");
  }

  return (
    <main className="min-h-screen space-y-14">
      <BreadCrumb itemsLink={itemsLink} className="px-4 sm:px-0 py-7 mt-20" />

      <TableOrder id={session?.token?.id} />
    </main>
  );
};

export default page;
