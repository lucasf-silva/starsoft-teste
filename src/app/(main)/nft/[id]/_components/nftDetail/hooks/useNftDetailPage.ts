'use client';

import { addItem, useAppDispatch } from '@/store';
import type { Nft } from '@/types';
import { useState } from 'react';

type UseNftDetailPageParams = {
  nft: Nft;
};

type UseNftDetailPageReturn = {
  quantity: number;
  setQuantity: (value: number) => void;
  handleAddToCart: () => void;
};

export const useNftDetailPage = ({ nft }: UseNftDetailPageParams): UseNftDetailPageReturn => {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    dispatch(
      addItem({
        nft,
        quantity,
      }),
    );
    setQuantity(1);
  };

  return {
    quantity,
    setQuantity,
    handleAddToCart,
  };
};
