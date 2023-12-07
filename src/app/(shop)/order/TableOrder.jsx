"use client";
import { useQuery } from "@tanstack/react-query";
import Container from "@/components/Container";
import { formatRupiah } from "@/utils/format";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";

const TableOrder = ({ id }) => {
  const removeProduct = (id) => {
    dispatch({ type: "REMOVE_PRODUCT", payload: id });
  };

  const getOrder = async () => {
    try {
      const req = await fetch(`/api/order/${id}`, {
        method: "GET",
      });
      const res = await req.json();

      return res;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["myOrder"],
    queryFn: getOrder,
    refetchInterval: 3000,
  });

  return (
    <Container className="xl:!max-w-7xl px-4">
      <h4 className="font-sans font-normal text-[26px] md:text-[22px] lg:text-[26px] mb-0 md:mb-6">
        Order Status
      </h4>
      <div className="hidden md:grid grid-cols-5 gap-4 font-sans text-base text-[#000000]">
        <p>Photo</p>
        <p>Product</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Status</p>
      </div>
      <hr className="mt-3 mb-5" />

      <Fragment>
        {isLoading ? (
          <h1>Loading</h1>
        ) : data && Object.keys(data).length !== 0 ? (
          <form method="POST">
            <div className="grid grid-cols-5 gap-4 items-center">
              {data?.products?.map((product, idx) => (
                <Fragment key={idx}>
                  <div className="col-span-2 md:col-span-1 w-full h-24 lg:w-36 md:h-36">
                    <Image
                      src={product?.imageUrls[0].url}
                      width={200}
                      height={200}
                      alt={product.title}
                      className="w-full h-full object-cover object-center rounded-xl"
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

                  <div>{data?.status}</div>
                </Fragment>
              ))}
            </div>
          </form>
        ) : isError ? (
          <h1>Error ashole</h1>
        ) : (
          <div className="text-center my-10">
            <p>
              Ooops... Cart is{" "}
              <Link href={"/"} className="underline underline-offset-2">
                empty Shop Now!
              </Link>
            </p>
          </div>
        )}
      </Fragment>
    </Container>
  );
};

export default TableOrder;
