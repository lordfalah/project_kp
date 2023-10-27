import "@/assets/css/App.css";
import BrowseRoom from "@/parts/homePage/BrowseRoom";
import JustArrived from "@/parts/homePage/JustArrived";
import Clients from "@/parts/homePage/Clients";
import Hero from "./Hero";
import Layouts from "@/components/Layouts";

export default function Home() {
  return (
    <Layouts>
      <main>
        <Hero />
        <BrowseRoom />
        <JustArrived />
        <Clients />
      </main>
    </Layouts>
  );
}
