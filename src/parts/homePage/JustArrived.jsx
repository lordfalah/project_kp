"use client";

import React from "react";
import Eye from "@/assets/icon/Eye";
import { formatRupiah } from "@/utils/format";
import Container from "@/components/Container";
import Link from "next/link";
import Image from "next/image";

const JustArrived = ({ products }) => {
  return (
    <section className="pt-16" id="just-arrived">
      <Container className="mb-4">
        <div className="text-center capitalize text-2xl font-semibold">
          <h3>Menu</h3>
          <h3>Makanan & Minuman</h3>
        </div>
      </Container>

      <div className="flex overflow-x-auto gap-x-8">
        {products.map((data, key) => (
          <Link
            key={`${data.id}-${key}`}
            href={`products/${data?.id}`}
            className={`card relative z-30 px-4 group`}
          >
            <div className="w-[280px] h-[386px] relative rounded-xl overflow-hidden group-hover:shadow-lg transition duration-200 ease-in-out mx-auto">
              <Image
                src={data.imageUrls[0].url}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="w-full h-full bg-cover bg-no-repeat bg-center group-hover:scale-125 transition duration-300 ease-in-out"
                style={{ objectFit: "cover" }}
                alt={`image ${data?.title}`}
              />

              <div className="transition duration-200 ease-in-out absolute inset-0 opacity-0 group-hover:opacity-100 bg-black/[35%] w-full h-full flex justify-center items-center">
                <div className="rounded-full bg-white w-16 h-16 flex justify-center items-center">
                  <Eye className="w-10 h-10" />
                </div>
              </div>
            </div>

            <div className="mt-4 w-[280px] mx-auto">
              <h5 className="text-lg font-semibold">{data.title}</h5>
              <p>Rp {formatRupiah(data.price)}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default JustArrived;
