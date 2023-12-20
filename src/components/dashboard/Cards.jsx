import User from "@/assets/icon/User";
import HoverCards from "./HoverCards";
import Money from "@/assets/icon/Money";
import ProductsHave from "@/assets/icon/ProductsHave";
import Users from "@/assets/icon/Users";
import prisma from "@/libs/prisma";
import { formatRupiah } from "@/utils/format";

const styleIcon1 =
  "absolute z-10 -right-10 text-xl group-hover:text-violet-400 group-hover:rotate-12 transition-transform duration-300 w-32 h-32 top-1/2 -translate-y-3/4 stroke-violet-400/20";
const styleIcon2 =
  "mb-2 text-2xl text-violet-600 group-hover:text-white transition-colors relative z-10 duration-300 w-5 h-5";

const totalUsers = async () => {
  try {
    const res = await prisma.user.count();
    return res;
  } catch (error) {
    throw new Error(error.message || "");
  }
};

export const getHistorys = async () => {
  try {
    const response = await prisma.history.aggregate({
      _sum: {
        price: true,
      },
    });

    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const getProducts = async () => {
  try {
    const response = await prisma.products.count();
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const getOrders = async () => {
  try {
    const response = await prisma.user.count({
      where: {
        order: { isNot: null },
      },
    });

    return response;
  } catch (error) {
    throw new Error(error.message || "");
  }
};

const Cards = async () => {
  const countUser = await totalUsers();
  const countProduct = await getProducts();
  const countOrder = await getOrders();
  const income = await getHistorys();

  return (
    <div className="w-full py-6 mx-auto">
      {/* row 1 */}
      <div className="grid gap-y-4 grid-cols-2 xl:grid-cols-4 gap-x-4 ">
        <HoverCards
          title={"Account"}
          subtitle={`Manage Account ${countUser}`}
          icon1={<User className={styleIcon1} />}
          icon2={<User className={styleIcon2} />}
        />

        <HoverCards
          title={"Income"}
          subtitle={`Rp. ${formatRupiah(income._sum.price)}`}
          icon1={<Money className={styleIcon1} />}
          icon2={<Money className={styleIcon2} />}
        />

        <HoverCards
          title={"Products"}
          subtitle={`Total products ${countProduct}`}
          icon1={<ProductsHave className={styleIcon1} />}
          icon2={<ProductsHave className={styleIcon2} />}
        />

        <HoverCards
          title={"Oders"}
          subtitle={`Total Order ${countOrder}`}
          icon1={<Users className={styleIcon1} />}
          icon2={<Users className={styleIcon2} />}
        />
      </div>
    </div>
  );
};

export default Cards;
