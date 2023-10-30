import Footer from "@/components/dashboard/Footer";
import Cards from "@/components/dashboard/Cards";
import Tables from "@/components/dashboard/Tables";
import Header from "@/components/dashboard/Header";
import Pagination from "@/components/dashboard/Pagination";
import HoverDevCards from "@/components/dashboard/HoverDevCards";

export default function page() {
  return (
    <main className="relative h-full min-h-screen transition-all duration-200 ease-in-out xl:ml-68 rounded-xl w-full">
      <div className="w-full px-6 py-6 mx-auto">
        <Header />

        <Cards />

        <Tables />
        <Pagination />
      </div>
    </main>
  );
}
