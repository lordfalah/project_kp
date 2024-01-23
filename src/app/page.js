import "@/assets/css/App.css";
import Hero from "./Hero";
import Layouts from "@/components/Layouts";
import getQueryClient from "@/utils/query/getQueryClient";

import BrowseRoom from "@/parts/homePage/BrowseRoom";
import JustArrived from "@/parts/homePage/JustArrived";
import Clients from "@/parts/homePage/Clients";

const getProducts = async () => {
  try {
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_URL_PAGE}/api/products`,
      { method: "GET", cache: "no-store" }
    );

    const res = await req.json();
    return res;
  } catch (error) {
    throw new Error(error.message || "INTERNAL SERVER ERROR");
  }
};

export default async function Home() {
  const queryClient = getQueryClient();

  const products = await queryClient.fetchQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return (
    <Layouts>
      <main>
        <Hero />
        <BrowseRoom />
        <JustArrived products={products} />
        <Clients />
      </main>
    </Layouts>
  );
}
