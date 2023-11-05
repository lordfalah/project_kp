import React from "react";
import iconFace from "../../../public/images/bruce-mars.jpg";
import Image from "next/image";
import Edit from "@/assets/icon/Edit";
import Trash from "@/assets/icon/Trash";

const navTitle = [
  {
    title: "AUTHOR",
  },
  {
    title: "FUNCTION",
  },
  {
    title: "STATUS",
  },
  {
    title: "DATE",
  },
  {
    title: "ACTION",
  },
];

const Tables = () => {
  return (
    <div className="flex flex-wrap -mx-3 mt-10">
      <div className="flex-none w-full max-w-full px-3">
        <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
          <div className="p-6 pb-0 mb-0 border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
            <h6 className="">Authors table</h6>
          </div>
          <div className="flex-auto px-0 pt-0 pb-2">
            <div className="p-0 overflow-x-auto">
              <table className="items-center w-full mb-0 align-top border-collapse dark:border-white/40 text-slate-500">
                <thead className="align-bottom">
                  <tr>
                    {navTitle.map(({ title }, idx) => (
                      <th
                        key={idx}
                        className="pr-10 pl-4  font-bold text-left uppercase align-middle bg-transparent border-b border-collapse shadow-none dark:border-white/40 text-xs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70"
                      >
                        {title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 5 }, (_, idx) => (
                    <tr key={idx}>
                      <td className="pr-10 pl-4 py-2.5 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                        <div className="flex px-2 py-1">
                          <div className="w-10">
                            <Image
                              src={iconFace.src}
                              className="inline-flex items-center justify-center mr-4 text-sm text-white transition-all duration-200 ease-in-out h-9 w-9 rounded-xl"
                              alt="user1"
                              width={100}
                              height={100}
                            />
                          </div>
                          <div className="flex flex-col justify-center">
                            <h6 className="mb-0 text-sm leading-normal ">
                              John Michael
                            </h6>
                            <p className="mb-0 text-xs leading-tight  dark:opacity-80 text-slate-400">
                              john@creative-tim.com
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="pr-10 pl-4  align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                        <p className="mb-0 text-xs font-semibold leading-tight  dark:opacity-80">
                          Manager
                        </p>
                        <p className="mb-0 text-xs leading-tight  dark:opacity-80 text-slate-400">
                          Organization
                        </p>
                      </td>
                      <td className="pr-10 pl-4  text-sm leading-normal align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                        <span className="bg-gradient-to-tl from-emerald-500 to-teal-400 px-2.5 text-xs rounded-1.8 inline-block whitespace-nowrap  align-baseline font-bold uppercase leading-none text-white">
                          Online
                        </span>
                      </td>
                      <td className="pr-10 pl-4  align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                        <span className="text-xs font-semibold leading-tight  dark:opacity-80 text-slate-400">
                          23/04/18
                        </span>
                      </td>
                      <td className="pr-10 pl-4 py-5 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent flex gap-x-3.5">
                        <Edit />
                        <Trash />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tables;
