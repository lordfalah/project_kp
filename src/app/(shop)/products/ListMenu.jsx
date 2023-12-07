import Container from "@/components/Container";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Eye from "@/assets/icon/Eye";
import { formatRupiah } from "@/utils/format";

const ListMenu = ({ products, children }) => {
  return (
    <Container className="px-4 my-20 space-y-10 py-6">
      {children}

      {!products || products.length === 0 ? (
        <div className="text-black text-4xl font-medium text-center">
          Product Tidak Ada
        </div>
      ) : (
        <div className="flex flex-row overflow-x-auto gap-8 sm:flex-wrap md:justify-between sm:gap-6">
          {products.map((data, key) => (
            <Link
              key={`${data.id}-${key}`}
              href={`products/${data?.id}`}
              className={`card relative z-30 group shadow-sm`}
            >
              <div className="w-[280px] h-[386px] relative rounded-xl overflow-hidden group-hover:shadow-lg transition duration-200 ease-in-out">
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
      )}
    </Container>
  );
};

export default ListMenu;
