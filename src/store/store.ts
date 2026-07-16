'use client';

import { configureStore } from '@reduxjs/toolkit';
import { cartSlice, type CartState } from './cartSlice';

type StorePreloadedState = {
  cart: CartState;
};

export function makeStore(preloadedState?: StorePreloadedState) {
  return configureStore({
    reducer: {
      cart: cartSlice.reducer,
    },
    preloadedState,
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
