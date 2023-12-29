import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";
import { getAuthSession } from "../../auth/[...nextauth]/route";

// update role by super admin
export async function PATCH(req, { params }) {
  try {
    const { role } = await req.json();
    const { token } = await getAuthSession();

    if (!token)
      return NextResponse.json({ message: "NOT AUTHORIZED" }, { status: 401 });

    if (token.role === "SUPER ADMIN") {
      const product = await prisma.user.update({
        where: {
          id: params.id,
        },
        data: {
          role,
        },
      });

      return NextResponse.json(product, { status: 200 });
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
      return NextResponse.json({ message: "NOT AUTHORIZED" }, { status: 401 });

    if (token.role === "SUPER ADMIN") {
      const user = await prisma.user.delete({
        where: {
          id: params.id,
        },
      });

      return NextResponse.json(user, { status: 200 });
    }
    return NextResponse.json({ message: "NOT AUTHORIZED" }, { status: 401 });
  } catch (error) {
    return NextResponse.json(
      { message: "INTERNAL SERVER ERROR :(" },
      { status: 500 }
    );
  }
}
