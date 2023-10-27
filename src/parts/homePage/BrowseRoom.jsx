"use client";

import Container from "@/components/Container";
import { formatRupiah } from "@/utils/format";
import React from "react";

const ratioClassNames = {
  wrapper: {
    default: {
      "1/9": "col-span-9 row-span-1",
    },

    md: {
      "1/4": "md:col-span-4 md:row-span-1 group",
      "2/2": "md:col-span-2 md:row-span-2 group",
      "2/3": "md:col-span-3 md:row-span-2 group",
      "2/4": "md:col-span-4 md:row-span-2 group",
    },

    meta: {
      "1/4": {
        styleImg:
          "flex justify-end xl:justify-center items-center bg-cover relative bg-center w-full h-[180px] rounded-xl group-hover:shadow-lg transition duration-150 ease-linear",
        description: "pr-10 xl:pr-0",
      },

      "2/2": {
        styleImg:
          "bg-cover relative bg-center w-full h-[180px] md:h-full rounded-xl group-hover:shadow-lg transition duration-150 ease-linear",
        description: "text-center py-10",
      },

      "2/3": {
        styleImg:
          "bg-cover relative bg-center w-full h-[180px] md:h-full rounded-xl group-hover:shadow-lg transition duration-150 ease-linear",
        description: "text-center py-10",
      },

      "2/4": {
        styleImg:
          "flex justify-end xl:justify-center items-center bg-cover relative bg-center w-full h-[180px] rounded-xl group-hover:shadow-lg transition duration-150 ease-linear",
        description: "pr-10 xl:pr-0",
      },
    },
  },
};

const BrowseRoom = () => {
  const categories = [
    {
      id: 1,
      title: "Living Room",
      products: 18309,
      imageUrl: "image-catalog-1.png",
      ratio: {
        default: "1/9",
        md: "1/4",
      },
    },
    {
      id: 2,
      title: "Children Room",
      products: 837,
      imageUrl: "image-catalog-3.png",
      ratio: {
        default: "1/9",
        md: "2/2",
      },
    },
    {
      id: 3,
      title: "Decoration",
      products: 77392,
      imageUrl: "image-catalog-4.png",
      ratio: {
        default: "1/9",
        md: "2/3",
      },
    },
    {
      id: 4,
      title: "Master Room",
      products: 22094,
      imageUrl: "image-catalog-2.png",
      ratio: {
        default: "1/9",
        md: "2/4",
      },
    },
  ];

  return (
    <section id="browse-the-room" className="bg-gray-100">
      <Container className="py-16 px-4 sm:px-0">
        <div className="text-left mb-4">
          <h3 className="text-2xl font-semibold">Browse The Room</h3>
          <h3 className="text-2xl font-semibold">That We Designed For You</h3>
        </div>

        <div className="grid grid-cols-1 grid-rows-2 md:grid-cols-9 md:grid-rows-2 gap-y-4 md:gap-4 h-full">
          {categories?.map(({ id, imageUrl, products, ratio, title }, key) => (
            <div
              key={`${id}-${key}`}
              className={`${ratioClassNames.wrapper.md[ratio?.md]}`}
            >
              <div
                style={{
                  backgroundImage: `url("images/content/${imageUrl}")`,
                }}
                className={` ${
                  ratioClassNames.wrapper.meta[ratio?.md]?.styleImg
                }`}
              >
                <div
                  className={`${
                    ratioClassNames.wrapper.meta[ratio?.md]?.description
                  }`}
                >
                  <h5 className="text-lg font-semibold">{title}</h5>
                  <p>{formatRupiah(products.toString())} items</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default BrowseRoom;
