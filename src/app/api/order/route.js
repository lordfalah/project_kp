import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";
import { getAuthSession } from "../auth/[...nextauth]/route";

export async function POST(req, res) {
  try {
    const { token } = await getAuthSession();
    if (!token) {
      return NextResponse.json({ message: "NOT AUTHORIZED" }, { status: 401 });
    }

    const { price, products, status } = await req.json();

    const response = await prisma.order.create({
      data: {
        price,
        products,
        status,
        userId: token?.id,
      },
    });

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }
}

export async function GET(req) {
  try {
    const { token } = await getAuthSession();
    if (!token) {
      return NextResponse.json({ message: "NOT AUTHORIZED" }, { status: 401 });
    }

    const res = await prisma.user.findMany({
      include: {
        order: true,
      },

      where: {
        order: { isNot: null },
      },
    });

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
