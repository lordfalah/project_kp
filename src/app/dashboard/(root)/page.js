import prisma from "@/libs/prisma";
import getQueryClient from "@/utils/query/getQueryClient";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import DataTableDashboard from "./(tables)/data-table";

export const fetchCache = "auto";
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
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DataTableDashboard />
    </HydrationBoundary>
  );
}
