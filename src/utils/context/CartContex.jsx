"use client";

import { createContext, useReducer } from "react";

const orderReducer = (state, action) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      const existingProductIndex = state.products.findIndex(
        (product) => product.id === action.payload.id
      );

      if (existingProductIndex !== -1) {
        const updatedProducts = state.products.map((product, index) =>
          index === existingProductIndex
            ? {
                ...product,
                quantity: product.quantity + 1,
                price: product.price * (product.quantity + 1),
              } // Increase quantity
            : product
        );

        return {
          ...state,
          products: updatedProducts,
          totalItems: state.totalItems + 1, // Increase totalItems
          totalPrice: state.totalPrice + action.payload.price, // Update totalPrice
        };
      } else {
        return {
          ...state,
          products: [...state.products, { ...action.payload, quantity: 1 }],
          totalItems: state.totalItems + 1,
          totalPrice: state.totalPrice + action.payload.price,
        };
      }
    case "REMOVE_PRODUCT":
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
      };
    case "UPDATE_PRODUCT":
      // Logic for updating product remains the same
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        ),
        totalPrice: state.products.reduce(
          (acc, current) => acc + current.price * current.quantity,
          0
        ),
      };

    case "RESET":
      return {
        ...state,
        products: [],
        totalPrice: 0,
        totalItems: 0,
      };
    default:
      return state;
  }
};

export const CartContext = createContext();

export function CartOrderContext({ children }) {
  const [state, dispatch] = useReducer(orderReducer, {
    products: [],
    totalPrice: 0,
    totalItems: 0,
  });

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}
