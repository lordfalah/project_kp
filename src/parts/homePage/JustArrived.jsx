"use client";

import React, { Fragment, Suspense } from "react";

import Eye from "@/assets/icon/Eye";
import { customSlickSett, formatRupiah } from "@/utils/format";
import Container from "@/components/Container";
import useLongPress from "@/utils/hooks/useLongPress";
import Link from "next/link";
import Image from "next/image";

const settings = customSlickSett(
  {
    slidesToShow: 4.2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  },
  {
    slidesToShow: 3.4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  },
  {
    slidesToShow: 2.5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  },

  {
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  },

  {
    slidesToShow: 1.6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  },

  {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  }
);

const Loadings = () => {
  return (
    <p className="text-5xl text-black font-bold">Loading package location...</p>
  );
};

const JustArrived = ({ products }) => {
  // const navigation = useNavigation();
  // const navigate = useNavigate("");

  const onLongPress = () => {
    return null;
  };

  const onClick = (id) => id;

  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 120,
  };
  const longPressEvent = (id) => {
    return useLongPress(onLongPress, () => onClick(id), defaultOptions);
  };
  return (
    <section className="pt-16" id="just-arrived">
      <Container className="mb-4">
        <div className="text-center capitalize text-2xl font-semibold">
          <h3>Just Arrived</h3>
          <h3>This Summer For You</h3>
        </div>
      </Container>

      <div className="flex overflow-x-scroll">
        {products.map((data, key) => (
          <Link
            // {...longPressEvent(data.id)}
            key={`${data.id}-${key}`}
            href={`products/${data?.id}`}
            className={`card relative z-30 px-4 group hover:cursor-grab focus:cursor-grabbing`}
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
