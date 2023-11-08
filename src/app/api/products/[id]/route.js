import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  const products = await prisma.products.delete({
    where: {
      id: params.id,
    },
  });

  return NextResponse.json({ message: "Success Delete" }, { status: 200 });
}
