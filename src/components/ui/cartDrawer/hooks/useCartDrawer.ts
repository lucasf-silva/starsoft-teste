'use client';

import { useMemo } from 'react';
import {
  clearCart,
  closeCart,
  openLoginDrawer,
  removeItem,
  selectCartItems,
  selectCartStep,
  selectCartTotalPrice,
  selectIsAuthenticated,
  selectIsCartOpen,
  setCartStep,
  updateQuantity,
  useAppDispatch,
  useAppSelector,
} from '@/store';

type UseCartDrawerReturn = {
  isOpen: boolean;
  items: ReturnType<typeof selectCartItems>;
  totalPrice: number;
  currentStep: ReturnType<typeof selectCartStep>;
  title: string;
  canGoBack: boolean;
  handleCloseCart: () => void;
  handleBackStep: () => void;
  handleNextStep: () => void;
  handleFinishPurchase: () => void;
  handleRemoveItem: (id: number) => void;
  handleUpdateQuantity: (id: number, quantity: number) => void;
};

export const useCartDrawer = (): UseCartDrawerReturn => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsCartOpen);
  const items = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectCartTotalPrice);
  const currentStep = useAppSelector(selectCartStep);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const title = useMemo(() => {
    if (currentStep === 'summary') {
      return 'Resumo da Compra';
    }

    if (currentStep === 'success') {
      return 'Compra Finalizada';
    }

    return 'Mochila de Compras';
  }, [currentStep]);

  const canGoBack = currentStep === 'summary';

  const handleCloseCart = () => {
    dispatch(closeCart());
  };

  const handleBackStep = () => {
    dispatch(setCartStep('items'));
  };

  const handleNextStep = () => {
    if (!isAuthenticated) {
      dispatch(openLoginDrawer());
      return;
    }

    dispatch(setCartStep('summary'));
  };

  const handleFinishPurchase = () => {
    if (!isAuthenticated) {
      dispatch(openLoginDrawer());
      return;
    }

    dispatch(clearCart());
    dispatch(setCartStep('success'));
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
    currentStep,
    title,
    canGoBack,
    handleCloseCart,
    handleBackStep,
    handleNextStep,
    handleFinishPurchase,
    handleRemoveItem,
    handleUpdateQuantity,
  };
};
