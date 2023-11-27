import Cards from "@/components/dashboard/Cards";
import Header from "@/components/dashboard/Header";
import prisma from "@/libs/prisma";
import getQueryClient from "@/utils/query/getQueryClient";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import DataTableDashboard from "./(tables)/data-table";

export const revalidate = 0;
export const getOrders = async () => {
  try {
    const response = await prisma.order.findMany({
      include: {
        user: true,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export default async function page() {
  // Inisialisasi QueryClient
  const queryClient = getQueryClient();

  await queryClient.fetchQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  return (
    <main className="relative h-full min-h-screen transition-all duration-200 ease-in-out xl:ml-68 rounded-xl w-full">
      <div className="w-full px-6 py-6 mx-auto">
        <Header />
        <Cards />

        <HydrationBoundary state={dehydrate(queryClient)}>
          <DataTableDashboard />
        </HydrationBoundary>
      </div>
    </main>
  );
}
