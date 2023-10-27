import Xmark from "@/assets/icon/Xmark";
import Container from "@/components/Container";
import { formatRupiah } from "@/utils/format";
import Link from "next/link";
import React, { Fragment } from "react";

const TableShop = () => {
  // const removeProduct = (id) => {
  //   const product = category.filter((data) => data.id !== id);
  //   setCategory(product);
  // };

  return (
    <Container className="xl:!max-w-7xl px-4 sm:px-0">
      <h4 className="font-sans font-normal text-[26px] md:text-[22px] lg:text-[26px] mb-0 md:mb-6">
        Shopping Cart
      </h4>
      <div className="hidden md:grid grid-cols-4 gap-4 font-sans text-base text-[#000000]">
        <p>Photo</p>
        <p>Product</p>
        <p>Price</p>
        <p className="text-center">Action</p>
      </div>
      <hr className="mt-3 mb-5" />

      <Fragment>
        {[].length <= 0 ? (
          <div className="text-center my-10">
            <p>
              Ooops... Cart is{" "}
              <Link href={"/"} className="underline underline-offset-2">
                empty Shop Now!
              </Link>
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-5 md:grid-cols-4 gap-4 items-center">
            {[].map((data, idx) => (
              <Fragment key={idx}>
                <div className="col-span-2 md:col-span-1 w-full h-24 lg:w-36 md:h-36">
                  <img
                    src={data?.imgUrls[0]}
                    alt="Chair"
                    className="w-full h-full object-cover object-center rounded-xl"
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <h5 className="font-sans font-semibold text-lg w-fit">
                    {data.title}
                  </h5>
                  <span className="font-sans text-sm font-normal w-fit">
                    {data.category.title}
                  </span>
                  <h5 className="font-sans font-semibold text-base block md:hidden w-fit">
                    Rp {formatRupiah(data.price)}
                  </h5>
                </div>

                <h5 className="font-sans font-semibold text-base hidden md:block">
                  Rp {formatRupiah(data.price)}
                </h5>
                <button
                  // onClick={() => removeProduct(data.id)}
                  type="button"
                  className="w-fit mx-auto col-span-1"
                >
                  <Xmark className="stroke-[#E0195D] transition ease-in-out duration-150 stroke-2 hover:stroke-[2.5] hover:stroke-red-500 cursor-pointer" />
                </button>
              </Fragment>
            ))}
          </div>
        )}
      </Fragment>
    </Container>
  );
};

export default TableShop;
