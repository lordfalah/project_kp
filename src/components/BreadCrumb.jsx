"use client";

import React from "react";
import Container from "./Container";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BreadCrumb = ({ itemsLink, className }) => {
  const addClass = className ? className : "";
  const pathname = usePathname();

  return (
    <section className={`breadcrump bg-gray-100 ${addClass}`}>
      <Container>
        <ul className="flex font-light text-lg">
          {itemsLink.map(({ name, path }, idx) => {
            const aria =
              idx + 1 === itemsLink.length
                ? { "aria-label": "current page" }
                : "";
            return (
              <li key={`${path}:${idx}`}>
                <Link
                  href={path}
                  className={`${
                    pathname === path
                      ? "font-semibold"
                      : "after:content-['/'] after:mx-5"
                  }`}
                  {...aria}
                >
                  {name}
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
};

export default BreadCrumb;
