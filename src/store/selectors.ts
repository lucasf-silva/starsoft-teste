'use client';

import type { RootState } from './store';

function parsePrice(price: string) {
  return Number(price.replace(',', '.'));
}

export const selectCart = (state: RootState) => state.cart;
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectIsCartOpen = (state: RootState) => state.cart.isOpen;
export const selectCartItemsCount = (state: RootState) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectCartTotalPrice = (state: RootState) =>
  state.cart.items.reduce((total, item) => total + parsePrice(item.price) * item.quantity, 0);
