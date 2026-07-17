'use client';

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthUser } from '@/types';

export type AuthState = {
  isLoginDrawerOpen: boolean;
  user: AuthUser | null;
};

const initialState: AuthState = {
  isLoginDrawerOpen: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    openLoginDrawer(state) {
      state.isLoginDrawerOpen = true;
    },
    closeLoginDrawer(state) {
      state.isLoginDrawerOpen = false;
    },
    login(state, action: PayloadAction<AuthUser>) {
      state.user = action.payload;
      state.isLoginDrawerOpen = false;
    },
    logout(state) {
      state.user = null;
      state.isLoginDrawerOpen = false;
    },
    hydrateAuthSession(state, action: PayloadAction<AuthUser | null>) {
      state.user = action.payload;
    },
  },
});

export const { openLoginDrawer, closeLoginDrawer, login, logout, hydrateAuthSession } =
  authSlice.actions;

export { authSlice };
