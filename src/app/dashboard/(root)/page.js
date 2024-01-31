import getQueryClient from "@/utils/query/getQueryClient";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import DataTableDashboard from "./(tables)/data-table";

export const getOrders = async () => {
  try {
    const req = await fetch(`${process.env.NEXT_PUBLIC_URL_PAGE}/api/order`, {
      method: "GET",
      cache: "no-store",
    });

    const res = await req.json();

    return res;
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message || "INTERNAL SERVER ERROR");
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
