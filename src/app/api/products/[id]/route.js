import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  const product = await prisma.products.delete({
    where: {
      id: params.id,
    },
  });

  return NextResponse.json(product, { status: 200 });
}

export async function GET(req, { params }) {
  const product = await prisma.products.findFirst({
    where: {
      id: params.id,
    },

    include: {
      category: true,
    },
  });

  if (!product) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product, { status: 200 });
}

const categorys = ["makanan", "minuman"];

export async function PUT(req, { params }) {
  const { title, description, price, files, slug } = await req.json();
  if (!categorys.includes(slug.toLowerCase()))
    return NextResponse.json(null, { status: 400 });

  const product = await prisma.products.update({
    where: {
      id: params.id,
    },
    data: {
      title,
      description,
      price: parseFloat(price),
      imageUrls: [{ url: files.url, size: files.size }],
      category: {
        connectOrCreate: {
          create: {
            slug,
            description:
              slug === "makanan" ? "Makanan enak poel" : "Minuman enak poll",
          },

          where: {
            slug,
          },
        },
      },
    },

    include: {
      category: true,
    },
  });

  return NextResponse.json(product, { status: 200 });
}
