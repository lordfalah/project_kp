import User from "@/assets/icon/User";
import React from "react";
import BurgerMenu from "../BurgerMenu";
import { OpenNav } from "@/utils/hooks/useOpenNav";
import BreadCrumb from "./BreadCrumb";

const Header = () => {
  return (
    <nav
      className="relative flex flex-wrap items-center justify-between px-0 py-2 transition-all ease-in shadow-none duration-250 rounded-2xl lg:flex-nowrap lg:justify-start"
      navbar-main=""
      navbar-scroll="false"
    >
      <div className="flex items-center justify-between w-full py-1 mx-auto flex-wrap-inherit">
        <BreadCrumb />
        <div className="flex items-center lg:flex lg:basis-auto justify-between">
          <ul className="flex flex-row justify-end gap-x-3 list-none md-max:w-full">
            <li className="flex items-center gap-x-3.5">
              <User className="w-5 h-5 fill-white stroke-none" />
              <span className="hidden sm:inline text-white">Sign In</span>
            </li>
            <li className="flex items-center xl:hidden">
              <BurgerMenu />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
