import getQueryClient from "@/utils/query/getQueryClient";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import prisma from "@/libs/prisma";
import DataTableProducts from "./(tables)/data-table";

export const fetchCache = "auto";
export const getProducts = async () => {
  try {
    const response = await prisma.products.findMany({
      include: {
        category: true,
      },
    });
    return response ? response : [];
  } catch (error) {
    throw new Error("INTERNAL SERVER ERROR");
  }
};

export const metadata = {
  title: "Product",
  description: "Table Product",
};

export default async function page() {
  // Inisialisasi QueryClient
  const queryClient = getQueryClient();

  await queryClient.fetchQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DataTableProducts />
    </HydrationBoundary>
  );
}
