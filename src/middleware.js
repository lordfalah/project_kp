import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  async function middleware(req) {
    const token = req.nextauth.token;

    // access dashboard just role ADMIN and SUPER ADMIN
    if (req?.nextUrl?.pathname.startsWith("/dashboard")) {
      if (token?.role === "USER")
        return NextResponse.redirect(new URL("/", req.url));

      NextResponse.next();
    }

    // access /dashboard/product just role SUPER ADMIN
    if (req?.nextUrl?.pathname.startsWith("/dashboard/product")) {
      if (token?.role === "ADMIN" || token?.role === "USER") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
      NextResponse.next();
    }

    // must login to access cart
    if (req?.nextUrl?.pathname.startsWith("/cart")) {
      if (!token || token?.role === "ADMIN" || token?.role === "SUPER ADMIN") {
        return NextResponse.redirect(new URL("/", req.url));
      }

      return NextResponse.next();
    }

    if (req?.nextUrl?.pathname.startsWith("/order")) {
      if (!token || token?.role === "ADMIN" || token?.role === "SUPER ADMIN") {
        return NextResponse.redirect(new URL("/", req.url));
      }

      NextResponse.next();
    }
  },
  {
    callbacks: {
      authorized: async ({ token, req }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/dashboard", "/dashboard/((?!general).*)", "/cart", "/order"],
};
