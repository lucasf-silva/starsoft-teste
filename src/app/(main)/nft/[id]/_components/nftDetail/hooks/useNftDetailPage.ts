'use client';

import { addItem, openCart, setCartStep, useAppDispatch } from '@/store';
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
    addItemToCart();
    dispatch(setCartStep('items'));
    dispatch(openCart());
    setQuantity(1);
  };

  const handleBuyNow = () => {
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
