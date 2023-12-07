import prisma from "@/libs/prisma";
import getQueryClient from "@/utils/query/getQueryClient";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import DataTableHistorys from "./(tables)/data-table";

export const fetchCache = "auto";

export const getHistorys = async () => {
  try {
    const response = await prisma.history.findMany();
    return response ? response : [];
  } catch (error) {
    throw new Error(error);
  }
};

const page = async () => {
  // Inisialisasi QueryClient
  const queryClient = getQueryClient();

  await queryClient.fetchQuery({
    queryKey: ["historys"],
    queryFn: getHistorys,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DataTableHistorys />
    </HydrationBoundary>
  );
};

export default page;
