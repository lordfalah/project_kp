"use client";

import ShoppingCart from "@/assets/icon/ShoppingCart";
import Container from "@/components/Container";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { CartContext } from "@/utils/context/CartContex";
import { formatRupiah } from "@/utils/format";

import Image from "next/image";
import React, { useContext, useState } from "react";

const HeroProduct = ({ product }) => {
  const { state, dispatch } = useContext(CartContext);
  const { toast } = useToast();

  const onAddProduct = async (product) => {
    try {
      dispatch({ type: "ADD_PRODUCT", payload: product });

      toast({
        title: "Success",
        description: "Product berhasil di tambah",
      });
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
    <section className="my-20">
      <Container className="px-4">
        <main className="flex justify-between flex-col lg:flex-row md:gap-x-4 xl:gap-x-0">
          {/* mobile */}
          <div className="block md:hidden">
            <h1 className="text-5xl font-semibold">{product.title}</h1>
            <div className="flex justify-between items-center my-3.5">
              <h4 className="text-xl font-normal">
                Rp {formatRupiah(product.price)}
              </h4>
              <button
                onClick={() => onAddProduct(product)}
                type="button"
                className="rounded-full bg-pink-100 flex justify-center 
                items-center py-3 px-8 gap-x-4 transition duration-100 ease-linear hover:shadow-pick"
              >
                <ShoppingCart />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>

          <div
            className={`flex flex-col gap-y-5 md:flex-row-reverse md:gap-x-5 lg:gap-x-6 xl:gap-x-10`}
          >
            <div
              className={`h-80 overflow-hidden md:h-[600px] md:w-full lg:w-[550px] md:my-auto transition duration-300 delay-200 ease-in-out`}
            >
              <Image
                src={product.imageUrls[0].url}
                priority
                width={500}
                height={500}
                className="w-full h-full mx-auto"
                style={{ objectFit: "cover" }}
                alt={`image ${product?.title}`}
              />
            </div>
          </div>

          <article className="my-0 md:mb-8 md:mt-14 lg:my-0 w-full lg:w-1/2">
            {/* desktop */}
            <div className="space-y-1 hidden md:block">
              <h1 className="text-5xl font-semibold">{product.title}</h1>
              <div className="flex justify-between items-center ">
                <h4 className="text-xl font-normal">
                  Rp {formatRupiah(product.price)}
                </h4>
                <button
                  onClick={() => onAddProduct(product)}
                  type="button"
                  className="btn-cart rounded-full bg-pink-100 flex justify-center 
                  items-center py-3 px-8 gap-x-4 transition duration-100 ease-linear hover:shadow-pick"
                >
                  <ShoppingCart />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>

            <hr className="block my-10 md:my-5" />

            <h4 className="font-semibold text-xl">About The Product</h4>
            <div>
              <p className="text-xl leading-7 mb-6">{product.description}</p>
            </div>
          </article>
        </main>
      </Container>
    </section>
  );
};

export default HeroProduct;
