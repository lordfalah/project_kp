import prisma from "@/libs/prisma";
import getQueryClient from "@/utils/query/getQueryClient";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getAuthSession } from "@/app/api/auth/[...nextauth]/route";
import DataTableAdmin from "./(tables)/data-table";

export const fetchCache = "auto";
export const getUsers = async () => {
  try {
    const { token } = await getAuthSession();
    const role = token?.role.toUpperCase();
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

    return response ? response : [];
  } catch (error) {
    return null;
  }
};

export default async function page() {
  // Inisialisasi QueryClient
  const queryClient = getQueryClient();

  await queryClient.fetchQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {/* <DataTableAdmin /> */}
      <h1>debug on admin</h1>
    </HydrationBoundary>
  );
}
