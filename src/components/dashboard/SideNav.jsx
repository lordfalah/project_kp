"use client";

import { usePathname } from "next/navigation";
import Monitor from "@/assets/icon/Monitor";
import SignIn from "@/assets/icon/SignIn";
import SignUp from "@/assets/icon/SignUp";
import Table from "@/assets/icon/Table";
import Link from "next/link";
import React from "react";

const nav_link = {
  route_dash: [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <Monitor />,
    },

    {
      name: "Table Admin",
      path: "/dashboard/admin",
      icon: <Table />,
    },
  ],

  route_auth: {
    title: "ACCOUNT PAGES",
    route: [
      {
        name: "Sign In",
        path: "/signin",
        icon: <SignIn />,
      },
      {
        name: "Sign Up",
        path: "/signup",
        icon: <SignUp />,
      },
    ],
  },
};

const SideNav = () => {
  const pathname = usePathname();

  return (
    <aside
      className="fixed inset-y-4 pb-4 overflow-y-auto antialiased transition-transform duration-200 -translate-x-full bg-white border-0 shadow-xl dark:shadow-none dark:bg-slate-850 max-w-[280px] ease-nav-brand z-990 xl:ml-6 rounded-2xl xl:left-0 xl:translate-x-0 w-full "
      aria-expanded="false"
    >
      <div className="flex flex-col justify-between h-full">
        <div>
          <div>
            <div className="h-19">
              <i
                className="absolute top-0 right-0 p-4 opacity-50 cursor-pointer fas fa-times  text-slate-400 xl:hidden"
                sidenav-close=""
              />
              <a
                className="block px-8 py-6 m-0 text-sm whitespace-nowrap  text-slate-700"
                href="https://demos.creative-tim.com/argon-dashboard-tailwind/pages/dashboard.html"
                target="_blank"
              >
                <img
                  src="../assets/img/logo-ct-dark.png"
                  className="inline h-full max-w-full transition-all duration-200 dark:hidden ease-nav-brand max-h-8"
                  alt="main_logo"
                />
                <div className="flex items-center ">
                  <Monitor className="w-8 h-8" />
                  <span className="ml-1 font-semibold transition-all duration-200 ease-nav-brand">
                    Argon Dashboard 2
                  </span>
                </div>
              </a>
            </div>
            <hr className="h-px mt-0 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent" />
          </div>
          <div className="">
            <ul className="flex flex-col pl-0 mb-0">
              {nav_link.route_dash.map(({ path, name, icon }, idx) => (
                <li key={`${idx}~${name}`} className="py-4 w-full">
                  <Link
                    href={path}
                    className={`py-2.7 dark:opacity-80 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap rounded-lg px-4 text-slate-700 transition-colors ${
                      pathname === path ? "bg-blue-500/20 font-semibold" : ""
                    }`}
                  >
                    <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                      {icon}
                    </div>
                    <span>{name}</span>
                  </Link>
                </li>
              ))}

              <li className="w-full py-2">
                <h6 className="pl-6 ml-2 text-xs font-bold leading-tight uppercase  opacity-60">
                  Account pages
                </h6>
              </li>

              {nav_link.route_auth.route.map(({ name, path, icon }, idx) => (
                <li key={`${idx}~${name}`} className="py-4 w-full">
                  <Link
                    href={path}
                    className="dark:opacity-80 py-2.7 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors"
                  >
                    <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                      {icon}
                    </div>
                    <span className="ml-1 duration-300 opacity-100 pointer-events-none ease">
                      {name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SideNav;
