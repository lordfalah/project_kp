import "@/assets/css/App.css";
import Hero from "./Hero";
import Layouts from "@/components/Layouts";
import getQueryClient from "@/utils/query/getQueryClient";
import { getProducts } from "./dashboard/product/page";
import BrowseRoom from "@/parts/homePage/BrowseRoom";
import JustArrived from "@/parts/homePage/JustArrived";
import Clients from "@/parts/homePage/Clients";

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
