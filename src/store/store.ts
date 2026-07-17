'use client';

import { configureStore } from '@reduxjs/toolkit';
import { authSlice, type AuthState } from './authSlice';
import { cartSlice, type CartState } from './cartSlice';

type StorePreloadedState = {
  auth?: AuthState;
  cart?: CartState;
};

export function makeStore(preloadedState?: StorePreloadedState) {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
      cart: cartSlice.reducer,
    },
    preloadedState,
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
