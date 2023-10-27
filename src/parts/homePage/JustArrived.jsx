"use client";

import React, { Fragment, Suspense } from "react";

import Eye from "@/assets/icon/Eye";
import { customSlickSett, formatRupiah } from "@/utils/format";
import Container from "@/components/Container";
import useLongPress from "@/utils/hooks/useLongPress";
import Link from "next/link";

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

const JustArrived = () => {
  const products = [
    {
      id: 1,
      idc: 3,
      title: "Chair Thatty",
      price: 12000000,
      imageUrl:
        "https://luxspace-html.netlify.app/images/content/showcase-1.front.jpg",
    },
    {
      id: 2,
      idc: 3,
      title: "Cangkir Mauttie",
      price: 89300,
      imageUrl:
        "https://luxspace-html.netlify.app/images/content/image-arrived-1.png",
    },
    {
      id: 3,
      idc: 3,
      title: "Buku Sidu Edition",
      price: 120699,
      imageUrl:
        "https://luxspace-html.netlify.app/images/content/image-arrived-3.png",
    },
    {
      id: 4,
      idc: 3,
      title: "Watch Notes X",
      price: 1973000,
      imageUrl:
        "https://luxspace-html.netlify.app/images/content/image-arrived-4.png",
    },
    {
      id: 5,
      idc: 3,
      title: "Sweet Modern Dinning Table",
      price: 599400,
      imageUrl:
        "https://images.unsplash.com/photo-1554295405-abb8fd54f153?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=562&q=80",
    },
    {
      id: 6,
      idc: 3,
      title: "Bankyu Minimay",
      price: 67899,
      imageUrl:
        "https://luxspace-html.netlify.app/images/content/image-arrived-2.png",
    },
    {
      id: 7,
      idc: 8,
      title: "Gray White Padded Sofa",
      price: 89999999,
      imageUrl:
        "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=701&q=80",
    },
    {
      id: 8,
      idc: 1,
      title: "Teal Wooden Cabiner",
      price: 1298599,
      imageUrl:
        "https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    },
    {
      id: 9,
      idc: 2,
      title: "Classy Wooden Chair",
      price: 859000,
      imageUrl:
        "https://images.unsplash.com/photo-1487015307662-6ce6210680f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=632&q=80",
    },
  ];
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
              <div
                style={{ backgroundImage: `url(${data.imageUrl})` }}
                className="w-full h-full bg-cover bg-no-repeat bg-center group-hover:scale-125 transition duration-300 ease-in-out"
              ></div>

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
