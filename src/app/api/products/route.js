import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const { title, description, price, files } = await req.json();

  const products = await prisma.products.create({
    data: {
      title,
      description,
      price: parseFloat(price),
      imageUrls: [{ url: files.url, size: files.size }],
      category: {
        connectOrCreate: {
          create: {
            slug: "teh",
            description: "minuman teh seger",
          },

          where: {
            slug: "teh",
          },
        },
      },
    },
    include: {
      category: true,
    },
  });

  console.log({ products });

  return NextResponse.json(products, { status: 201 });
}
