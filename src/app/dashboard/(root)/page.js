import getQueryClient from "@/utils/query/getQueryClient";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import DataTableDashboard from "./(tables)/data-table";
import prisma from "@/libs/prisma";

export const fetchCache = "auto";
export const getOrders = async () => {
  try {
    const response = await prisma.user.findMany({
      include: {
        order: true,
      },

      where: {
        order: { isNot: null },
      },
    });

    return response;
  } catch (error) {
    throw new Error(error.message || "");
  }
};

export const metadata = {
  title: "Dashboard",
  description: "Dashboard Admin",
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
