'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Nft, CartItem } from '@/types';

export type CartStep = 'items' | 'summary' | 'success';

export type CartState = {
  isOpen: boolean;
  currentStep: CartStep;
  items: CartItem[];
};

type AddItemPayload = {
  nft: Nft;
  quantity: number;
};

type UpdateQuantityPayload = {
  id: number;
  quantity: number;
};

const initialState: CartState = {
  isOpen: false,
  currentStep: 'items',
  items: [],
};

function clampQuantity(quantity: number) {
  return Math.max(quantity, 1);
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<AddItemPayload>) {
      const nextQuantity = clampQuantity(action.payload.quantity);
      const existingItem = state.items.find((item) => item.id === action.payload.nft.id);

      if (existingItem) {
        existingItem.quantity += nextQuantity;
      } else {
        state.items.push({
          ...action.payload.nft,
          quantity: nextQuantity,
        });
      }
    },
    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCart(state) {
      state.items = [];
    },
    setCartStep(state, action: PayloadAction<CartStep>) {
      state.currentStep = action.payload;
    },
    updateQuantity(state, action: PayloadAction<UpdateQuantityPayload>) {
      const item = state.items.find((cartItem) => cartItem.id === action.payload.id);

      if (!item) {
        return;
      }

      item.quantity = clampQuantity(action.payload.quantity);
    },
    openCart(state) {
      state.isOpen = true;
    },
    closeCart(state) {
      state.isOpen = false;
      state.currentStep = 'items';
    },
    toggleCart(state) {
      state.isOpen = !state.isOpen;
    },
  },
});

export const {
  addItem,
  removeItem,
  clearCart,
  setCartStep,
  updateQuantity,
  openCart,
  closeCart,
  toggleCart,
} = cartSlice.actions;

export { cartSlice };
