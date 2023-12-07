import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

const categorys = ["makanan", "minuman"];

export async function POST(req, res) {
  try {
    const { title, description, price, files, category } = await req.json();
    if (!categorys.includes(category.toLowerCase()))
      return NextResponse.json(null, { status: 400 });

    const products = await prisma.products.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        imageUrls: [{ url: files.url, size: files.size }],
        category: {
          connectOrCreate: {
            create: {
              slug: category,
              description:
                category === "makanan"
                  ? "Makanan enak poel"
                  : "Minuman enak poll",
            },

            where: {
              slug: category,
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

export async function GET(req) {
  const product = await prisma.products.findMany({
    include: {
      category: true,
    },
  });
  return NextResponse.json(product, { status: 200 });
}
