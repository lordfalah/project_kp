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
                price: action.payload.price,
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
      const existingProductIdx = state.products.findIndex(
        (product) => product.id === action.payload.id
      );

      if (existingProductIdx !== -1) {
        const updatedProducts = [...state.products];
        const removedProduct = updatedProducts[existingProductIdx];

        if (removedProduct.quantity > 0) {
          removedProduct.quantity = action.payload.quantity - 1;

          removedProduct.price = action.payload.price;
        } else {
          updatedProducts.splice(existingProductIdx, 1);
        }

        return {
          ...state,
          products: updatedProducts,
          totalItems: state.totalItems - 1,
          totalPrice: state.totalPrice - action.payload.price,
        };
      } else {
        return state;
      }

    case "DELETE_PRODUCT":
      const productIdx = state.products.findIndex(
        (product) => product.id === action.payload.id
      );

      if (productIdx !== -1) {
        const filterProducts = state.products.filter(
          (product) => product.id !== action.payload.id
        );

        return {
          ...state,
          products: filterProducts,
          totalItems: state.products.length - 1,
          totalPrice: filterProducts.reduce(
            (acc, current) => acc + current.price * current.quantity,
            0
          ),
        };
      }

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
