"use client";

import Image from "next/image";
import React, { Fragment, useState } from "react";

const Hero = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSectionView = () => {
    const elmBrowseRoom = document.querySelector("#browse-the-room");
    elmBrowseRoom.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "start",
    });
  };
  const inView = true;

  return (
    <Fragment>
      <section className="hero relative flex-col md:flex-row h-[90vh] md:h-auto flex justify-center items-center">
        <div className="text-center w-full container overflow-hidden">
          <h1
            className={`text-3xl md:text-4xl lg:text-5xl leading-tight font-semibold transition duration-500 ease-linear ${
              inView ? "opacity-100 translate-y-0" : "translate-y-56 opacity-0"
            }`}
          >
            The Room <br className="" />
            You've Dreaming
          </h1>
          <h2
            className={`px-8 text-base md:px-0 md:text-lg my-6 tracking-wide transition duration-300 ease-linear delay-500 ${
              inView ? "opacity-100 translate-x-0" : "translate-x-64 opacity-0"
            }`}
          >
            Kami menyediakan furniture berkelas yang
            <br className="hidden lg:block" />
            membuat ruangan terasa homey
          </h2>

          <div
            className={`mt-3 transition duration-200 ease-in-out delay-1000 w-fit mx-auto ${
              inView ? "opacity-100 translate-x-0" : "translate-x-64 opacity-0"
            }`}
          >
            <button
              onClick={handleSectionView}
              type="button"
              className={`bg-pink-400/40 px-8 py-3 rounded-full transition duration-200 ease-in-out hover:bg-black hover:text-pink-400 text-black`}
            >
              Explore Now
            </button>
          </div>
        </div>
        <div className="w-full inset-0">
          <div className="md:relative">
            <div className="absolute -z-10 md:z-10 inset-0 bg-black/[35%]"></div>
            <div
              className={`w-fit absolute md:top-1/2 md:-translate-x-1/2 group transition-all duration-200 ease-linear md:-translate-y-1/2 z-20 h-fit right-7 -bottom-5 md:left-1/2 delay-1000 ${
                inView ? "opacity-100 scale-100" : "opacity-0 scale-0"
              }`}
            ></div>

            <div className="flex flex-col">
              <Image
                src="/images/content/image-section-1.png"
                className="absolute -z-20 inset-0 md:relative object-cover object-center h-full md:w-full md:h-full"
                alt=""
                sizes="100vw"
                style={{
                  width: "100%",
                  height: "100%",
                }}
                width={0}
                height={0}
              />
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Hero;
