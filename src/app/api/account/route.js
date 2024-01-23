import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";
import { getAuthSession } from "../auth/[...nextauth]/route";

export async function GET(req) {
  try {
    const session = await getAuthSession();
    if (!session.token)
      return NextResponse.json({ message: "NOT AUTHORIZED" }, { status: 401 });

    const role = session.token?.role.toUpperCase();
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

    return NextResponse.json("response", { status: 200 });
  } catch (error) {
    console.log({ err: error });
    return NextResponse.json(
      { message: "INTERNAL SERVER ERROR" },
      { status: 500 }
    );
  }
}
