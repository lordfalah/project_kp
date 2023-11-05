"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Fragment, useState } from "react";

const Modal = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Fragment>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-gradient-to-r from-violet-600 to-blue-500 text-white font-medium px-4 py-2 rounded hover:opacity-90 transition-opacity"
      >
        Create
      </button>
      <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} children={children} />
    </Fragment>
  );
};

export const SpringModal = ({ isOpen, setIsOpen, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-hidden cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="text-white rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
