import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const { title, description, price, files } = await req.json();

  const products = await prisma.products.create({
    data: {
      title,
      description,
      price: parseFloat(price),
      imageUrls: { imageUrls: { ...files } },
      category: {
        connect: {
          slug: "teh",
        },
      },
    },
    include: {
      category: true,
    },
  });

  return NextResponse.json(products, { status: 201 });
}
