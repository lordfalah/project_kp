import Search from "@/assets/icon/Search";
import React from "react";
import Modal from "../Modal";

const BreadTrigger = () => {
  return (
    <div className="bg-white p-4 sm:p-6 grid grid-cols-6 gap-x-4 flex-wrap rounded-lg">
      <div className="relative flex flex-wrap items-stretch w-full transition-all rounded-lg ease col-span-4">
        <span className="text-sm ease leading-5.6 absolute z-50 -ml-px flex h-full items-center whitespace-nowrap rounded-lg rounded-tr-none rounded-br-none border border-r-0 border-transparent bg-transparent py-2 px-2.5 text-center font-normal text-slate-500 transition-all">
          <Search />
        </span>
        <input
          type="text"
          className="pl-9 text-sm focus:shadow-primary-outline ease w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:transition-shadow"
          placeholder="Type here..."
        />
      </div>

      <div className="col-span-2 justify-self-end">
        <Modal />
      </div>
    </div>
  );
};

const DottedButton = () => {
  return (
    <button className="rounded-2xl border-2 border-dashed border-black bg-white px-6 py-1.5 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none">
      Create
    </button>
  );
};

const NeumorphismButton = () => {
  return (
    <button
      className={`
        px-6 py-2 rounded-full 
        flex items-center gap-2 
        text-slate-500
        shadow-[-5px_-5px_10px_rgba(255,_255,_255,_0.8),_5px_5px_10px_rgba(0,_0,_0,_0.25)]
        transition-all
        hover:shadow-[-1px_-1px_5px_rgba(255,_255,_255,_0.6),_1px_1px_5px_rgba(0,_0,_0,_0.3),inset_-2px_-2px_5px_rgba(255,_255,_255,_1),inset_2px_2px_4px_rgba(0,_0,_0,_0.3)]
        hover:text-violet-500
    `}
    >
      <span>Create</span>
    </button>
  );
};

export default BreadTrigger;
