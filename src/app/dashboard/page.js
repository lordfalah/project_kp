import Cards from "@/components/dashboard/Cards";
import Header from "@/components/dashboard/Header";
import prisma from "@/libs/prisma";
import { columns } from "./columns";
import DataTable from "./data-table";

import getQueryClient from "@/utils/query/getQueryClient";

export const revalidate = 0;
export const getProducts = async () => {
  const response = await prisma.products.findMany();
  return response;
};

export default async function page() {
  // Inisialisasi QueryClient
  const queryClient = getQueryClient();

  const data = await queryClient.fetchQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return (
    <main className="relative h-full min-h-screen transition-all duration-200 ease-in-out xl:ml-68 rounded-xl w-full">
      <div className="w-full px-6 py-6 mx-auto">
        <Header />
        <Cards />

        <DataTable columns={columns} data={data} />
      </div>
    </main>
  );
}
