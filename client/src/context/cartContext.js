import { createContext, useContext } from 'react';

export const cartContext = createContext({
  items: [],
  total: 0,
  addItem: () => {},
  removeItem: () => {},
});

export const CartProvider = cartContext.Provider;

export const useCart = () => {
  return useContext(cartContext);
};
