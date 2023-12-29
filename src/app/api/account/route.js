import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";
import { getAuthSession } from "../auth/[...nextauth]/route";

export async function GET(req) {
  try {
    const { token } = await getAuthSession();
    if (!token)
      return NextResponse.json({ message: "NOT AUTHORIZED" }, { status: 401 });

    const role = token?.role.toUpperCase();
    const response = await prisma.user.findMany({
      where: {
        role:
          role === "ADMIN"
            ? "USER"
            : role === "SUPER ADMIN"
            ? { in: ["USER", "ADMIN"] }
            : "",
      },
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "INTERNAL SERVER ERROR" },
      { status: 500 }
    );
  }
}
