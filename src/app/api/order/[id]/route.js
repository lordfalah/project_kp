import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";
import { getAuthSession } from "../../auth/[...nextauth]/route";

// update role by super admin
export async function PATCH(req, { params }) {
  try {
    const { status } = await req.json();
    const { token } = await getAuthSession();

    if (!token || !status)
      return NextResponse.json(
        { message: "INTERNAL SERVER ERROR :(" },
        { status: 500 }
      );

    if (token.role === "SUPER ADMIN" || token.role === "ADMIN") {
      const order = await prisma.order.update({
        where: {
          id: params.id,
        },
        data: {
          status,
        },
      });

      return NextResponse.json(order, { status: 200 });
    }
    return NextResponse.json({ message: "NOT AUTHORIZED" }, { status: 401 });
  } catch (error) {
    return NextResponse.json(
      { message: "INTERNAL SERVER ERROR :(" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { token } = await getAuthSession();

    if (!token)
      return NextResponse.json(
        { message: "INTERNAL SERVER ERROR :(" },
        { status: 500 }
      );

    if (token.role === "SUPER ADMIN" || token.role === "ADMIN") {
      const order = await prisma.order.delete({
        where: {
          id: params.id,
        },
      });

      return NextResponse.json(order, { status: 200 });
    }
    return NextResponse.json({ message: "NOT AUTHORIZED" }, { status: 401 });
  } catch (error) {
    return NextResponse.json(
      { message: "INTERNAL SERVER ERROR :(" },
      { status: 500 }
    );
  }
}
