import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
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

    return NextResponse.json(products, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
