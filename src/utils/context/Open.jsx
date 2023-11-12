import { createContext, useState } from "react";

// Buat context baru
export const OpenContext = createContext();

// Buat provider untuk menyediakan state dan fungsi-fungsi yang akan digunakan
export const OpenProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <OpenContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </OpenContext.Provider>
  );
};
