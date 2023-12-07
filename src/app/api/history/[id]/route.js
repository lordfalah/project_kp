import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    const response = await prisma.history.delete({
      where: {
        id: params.id,
      },
    });

    if (!response) return NextResponse.json(null, { status: 404 });
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(null, { status: 500 });
  }
}
