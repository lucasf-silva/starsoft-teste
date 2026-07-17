'use client';

import {
  addItem,
  openCart,
  openLoginDrawer,
  selectIsAuthenticated,
  setCartStep,
  useAppDispatch,
  useAppSelector,
} from '@/store';
import type { Nft } from '@/types';
import { useState } from 'react';

type UseNftDetailPageParams = {
  nft: Nft;
};

type UseNftDetailPageReturn = {
  quantity: number;
  setQuantity: (value: number) => void;
  handleAddToCart: () => void;
  handleBuyNow: () => void;
};

export const useNftDetailPage = ({ nft }: UseNftDetailPageParams): UseNftDetailPageReturn => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const [quantity, setQuantity] = useState(1);

  const addItemToCart = () => {
    dispatch(
      addItem({
        nft,
        quantity,
      }),
    );
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      dispatch(openLoginDrawer());
      return;
    }

    addItemToCart();
    dispatch(setCartStep('items'));
    dispatch(openCart());
    setQuantity(1);
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      dispatch(openLoginDrawer());
      return;
    }

    addItemToCart();
    dispatch(setCartStep('summary'));
    dispatch(openCart());
    setQuantity(1);
  };

  return {
    quantity,
    setQuantity,
    handleAddToCart,
    handleBuyNow,
  };
};
