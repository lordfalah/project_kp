import User from "@/assets/icon/User";
import HoverCards from "./HoverCards";
import Money from "@/assets/icon/Money";
import ProductsHave from "@/assets/icon/ProductsHave";
import Users from "@/assets/icon/Users";

const styleIcon1 =
  "absolute z-10 -right-10 text-xl group-hover:text-violet-400 group-hover:rotate-12 transition-transform duration-300 w-32 h-32 top-1/2 -translate-y-3/4 stroke-violet-400/20";
const styleIcon2 =
  "mb-2 text-2xl text-violet-600 group-hover:text-white transition-colors relative z-10 duration-300 w-5 h-5";

const Cards = () => {
  return (
    <div className="w-full py-6 mx-auto">
      {/* row 1 */}
      <div className="grid gap-y-4 grid-cols-2 xl:grid-cols-4 gap-x-4 ">
        <HoverCards
          title={"Account"}
          subtitle={"Manage Account"}
          icon1={<User className={styleIcon1} />}
          icon2={<User className={styleIcon2} />}
        />

        <HoverCards
          title={"Income"}
          subtitle={"Rp. 0000"}
          icon1={<Money className={styleIcon1} />}
          icon2={<Money className={styleIcon2} />}
        />

        <HoverCards
          title={"Products"}
          subtitle={"Total products"}
          icon1={<ProductsHave className={styleIcon1} />}
          icon2={<ProductsHave className={styleIcon2} />}
        />

        <HoverCards
          title={"Oders"}
          subtitle={"Total Order"}
          icon1={<Users className={styleIcon1} />}
          icon2={<Users className={styleIcon2} />}
        />
      </div>
    </div>
  );
};

export default Cards;
