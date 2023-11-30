"use client";

import Xmark from "@/assets/icon/Xmark";
import Container from "@/components/Container";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { CartContext } from "@/utils/context/CartContex";
import { formatRupiah } from "@/utils/format";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useContext } from "react";

const TableShop = () => {
  const { state: cart, dispatch } = useContext(CartContext);
  const { toast } = useToast();

  const removeProduct = (id) => {
    dispatch({ type: "REMOVE_PRODUCT", payload: id });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const status = "ORDER";
      const req = await fetch("/api/order", {
        method: "POST",
        body: JSON.stringify({
          price: cart.totalPrice,
          products: cart.products,
          status,
        }),
      });

      if (!req.ok) {
        throw new Error(req.statusText | "");
      }

      const res = await req.json();
      toast({
        title: "Success",
        description: "Checkout berhasil di tambah",
        action: (
          <ToastAction altText="link">
            <Link href={"/order"}>Cek Status</Link>
          </ToastAction>
        ),
      });
      return res;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error?.message || "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  return (
    <Container className="mx-auto xl:!max-w-7xl px-4 sm:px-0">
      <h4 className="font-sans font-normal text-[26px] md:text-[22px] lg:text-[26px] mb-0 md:mb-6">
        Shopping Cart
      </h4>
      <div className="hidden md:grid grid-cols-5 gap-4 font-sans text-base text-[#000000]">
        <p>Photo</p>
        <p>Product</p>
        <p>Price</p>
        <p>Quantity</p>
        <p className="text-center">Action</p>
      </div>
      <hr className="mt-3 mb-5" />

      <Fragment>
        {cart?.products?.length <= 0 ? (
          <div className="text-center my-10">
            <p>
              Ooops... Cart is{" "}
              <Link href={"/"} className="underline underline-offset-2">
                empty Shop Now!
              </Link>
            </p>
          </div>
        ) : (
          <form method="POST" onSubmit={handleSubmit}>
            <div className="grid grid-cols-5 gap-4 items-center">
              {cart?.products?.map((product, idx) => (
                <Fragment key={idx}>
                  <div className="col-span-2 md:col-span-1 w-full h-24 lg:w-36 md:h-36">
                    <Image
                      src={product?.imageUrls[0].url}
                      width={200}
                      height={200}
                      alt={product.title}
                      className="w-full h-full object-cover object-center rounded-xl"
                      priority
                    />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <h5 className="font-sans font-semibold text-lg w-fit">
                      {product.title}
                    </h5>
                    <span className="font-sans text-sm font-normal w-fit">
                      {product.catSlug}
                    </span>
                    <h5 className="font-sans font-semibold text-base block md:hidden w-fit">
                      Rp {formatRupiah(product.price)}
                    </h5>
                  </div>

                  <h5 className="font-sans font-semibold text-base hidden md:block">
                    Rp {formatRupiah(product.price)}
                  </h5>

                  <h5 className="font-sans font-semibold text-base hidden md:block">
                    {product.quantity}
                  </h5>

                  <button
                    onClick={() => removeProduct(product.id)}
                    type="button"
                    className="w-fit mx-auto col-span-1"
                  >
                    <Xmark className="stroke-[#E0195D] transition ease-in-out duration-150 stroke-2 hover:stroke-[2.5] hover:stroke-red-500 cursor-pointer" />
                  </button>
                </Fragment>
              ))}

              <div className="flex flex-col sm:flex-row col-span-full w-full justify-between sm:items-center mb-40 mt-20 sm:mt-10 px-0 sm:px-4 xl:px-0">
                <div>
                  <p>Payment Option</p>
                  <p>Cash</p>
                </div>

                <div>
                  <div className="space-y-3 sm:w-fit my-8 sm:my-10 ">
                    <div className="flex justify-between gap-x-6">
                      <p className="font-semibold text-slate-400">
                        Subtotal ({cart?.totalItems} items)
                      </p>
                      <p className="font-semibold">
                        Rp {formatRupiah(cart?.totalPrice)}
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-between gap-x-6">
                        <p className="font-semibold text-slate-400">Total</p>
                        <p className="font-semibold">
                          Rp {formatRupiah(cart?.totalPrice)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`w-full sm:w-60 rounded-full text-center transition duration-150 ease-linear justify-self-end col-span-full ${
                      cart?.products?.length <= 0
                        ? "g-[#F0F0F0]"
                        : "bg-[#F9CADA]  "
                    }`}
                  >
                    <button
                      type="submit"
                      disabled={cart?.products?.length <= 0 ? true : false}
                      className={`font-medium text-lg font-sans px-6 py-3   ${
                        cart?.products?.length <= 0
                          ? "cursor-not-allowed text-[#D2D2D2]"
                          : "cursor-pointer text-black"
                      }`}
                    >
                      Checkout Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </Fragment>
    </Container>
  );
};

export default TableShop;
