"use client";

import User from "@/assets/icon/User";
import HoverCards from "./HoverCards";

const Cards = () => {
  return (
    <div className="w-full py-6 mx-auto">
      {/* row 1 */}
      <div className="grid gap-y-4 grid-cols-2 xl:grid-cols-4 gap-x-4 ">
        <HoverCards
          title={"Account"}
          subtitle={"Manage profile"}
          icon1={
            <User className="absolute z-10 -right-10 text-xl group-hover:text-violet-400 group-hover:rotate-12 transition-transform duration-300 w-32 h-32 top-1/2 -translate-y-3/4 stroke-violet-400/20" />
          }
          icon2={
            <User className="mb-2 text-2xl text-violet-600 group-hover:text-white transition-colors relative z-10 duration-300 w-5 h-5" />
          }
        />

        <HoverCards
          title={"Account"}
          subtitle={"Manage profile"}
          icon1={
            <User className="absolute z-10 -right-10 text-xl group-hover:text-violet-400 group-hover:rotate-12 transition-transform duration-300 w-32 h-32 top-1/2 -translate-y-3/4 stroke-violet-400/20" />
          }
          icon2={
            <User className="mb-2 text-2xl text-violet-600 group-hover:text-white transition-colors relative z-10 duration-300 w-5 h-5" />
          }
        />

        <HoverCards
          title={"Account"}
          subtitle={"Manage profile"}
          icon1={
            <User className="absolute z-10 -right-10 text-xl group-hover:text-violet-400 group-hover:rotate-12 transition-transform duration-300 w-32 h-32 top-1/2 -translate-y-3/4 stroke-violet-400/20" />
          }
          icon2={
            <User className="mb-2 text-2xl text-violet-600 group-hover:text-white transition-colors relative z-10 duration-300 w-5 h-5" />
          }
        />

        <HoverCards
          title={"Account"}
          subtitle={"Manage profile"}
          icon1={
            <User className="absolute z-10 -right-10 text-xl group-hover:text-violet-400 group-hover:rotate-12 transition-transform duration-300 w-32 h-32 top-1/2 -translate-y-3/4 stroke-violet-400/20" />
          }
          icon2={
            <User className="mb-2 text-2xl text-violet-600 group-hover:text-white transition-colors relative z-10 duration-300 w-5 h-5" />
          }
        />
      </div>
    </div>
  );
};

export default Cards;
