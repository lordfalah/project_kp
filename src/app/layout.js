import { Inter } from "next/font/google";
import "./globals.css";

import Providers from "@/utils/query/Providers";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import NextAuthProvider from "@/utils/context/NextAuthProvider";
import { CartOrderContext } from "@/utils/context/CartContex";
import { Toaster } from "@/components/ui/toaster";
import { EdgeStoreProvider } from "@/libs/edgestore";
import { Suspense } from "react";
import Loading from "./loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Home",
  description: "Landing Page",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <Providers>
            <EdgeStoreProvider>
              <CartOrderContext>
                <Suspense fallback={<Loading />}>{children}</Suspense>
              </CartOrderContext>
            </EdgeStoreProvider>
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          </Providers>
        </NextAuthProvider>

        <Toaster />
      </body>
    </html>
  );
}
