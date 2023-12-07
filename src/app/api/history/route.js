import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const response = await prisma.history.findMany();
    return NextResponse.json(response ? response : [], { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
