"use client";

import { createContext, useContext, useState } from "react";

export const OpenNav = createContext();

export function NavigateOpen({ children, value = false }) {
  const [isOpen, setIsOpen] = useState(value);

  return (
    <OpenNav.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </OpenNav.Provider>
  );
}
