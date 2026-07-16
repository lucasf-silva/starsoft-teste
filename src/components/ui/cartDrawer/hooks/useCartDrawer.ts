'use client';

import {
  closeCart,
  removeItem,
  selectCartItems,
  selectCartTotalPrice,
  selectIsCartOpen,
  updateQuantity,
  useAppDispatch,
  useAppSelector,
} from '@/store';

type UseCartDrawerReturn = {
  isOpen: boolean;
  items: ReturnType<typeof selectCartItems>;
  totalPrice: number;
  handleCloseCart: () => void;
  handleRemoveItem: (id: number) => void;
  handleUpdateQuantity: (id: number, quantity: number) => void;
};

export const useCartDrawer = (): UseCartDrawerReturn => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsCartOpen);
  const items = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectCartTotalPrice);

  const handleCloseCart = () => {
    dispatch(closeCart());
  };

  const handleRemoveItem = (id: number) => {
    dispatch(removeItem(id));
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  return {
    isOpen,
    items,
    totalPrice,
    handleCloseCart,
    handleRemoveItem,
    handleUpdateQuantity,
  };
};
