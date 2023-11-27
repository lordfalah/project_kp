import Cards from "@/components/dashboard/Cards";
import Header from "@/components/dashboard/Header";
import prisma from "@/libs/prisma";
import { getServerSession } from "next-auth/next";
import getQueryClient from "@/utils/query/getQueryClient";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import DataTableAdmin from "./(tables)/data-table";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const revalidate = 0;
export const getUsers = async () => {
  const session = await getServerSession(authOptions);
  const role = session?.token?.role.toUpperCase();
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

  return response;
};

export default async function page() {
  // Inisialisasi QueryClient
  const queryClient = getQueryClient();

  const data = await queryClient.fetchQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  return (
    <main className="relative h-full min-h-screen transition-all duration-200 ease-in-out xl:ml-68 rounded-xl w-full">
      <div className="w-full px-6 py-6 mx-auto">
        <Header />
        <Cards />

        <HydrationBoundary state={dehydrate(queryClient)}>
          <DataTableAdmin />
        </HydrationBoundary>
      </div>
    </main>
  );
}
