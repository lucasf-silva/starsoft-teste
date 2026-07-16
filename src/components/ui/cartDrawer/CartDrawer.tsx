'use client';

import { Drawer } from '@/components';
import { useCartDrawer } from './hooks/useCartDrawer';
import { CartEmptyState, CartItemsStep, CartSuccessStep, CartSummaryStep } from './components';

export function CartDrawer() {
  const {
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
  } = useCartDrawer();

  function renderContent() {
    if (currentStep === 'success') {
      return <CartSuccessStep onClose={handleCloseCart} />;
    }

    if (items.length === 0) {
      return <CartEmptyState />;
    }

    if (currentStep === 'summary') {
      return (
        <CartSummaryStep
          items={items}
          totalPrice={totalPrice}
          canGoBack={canGoBack}
          onBack={handleBackStep}
          onFinishPurchase={handleFinishPurchase}
        />
      );
    }

    return (
      <CartItemsStep
        items={items}
        totalPrice={totalPrice}
        onNextStep={handleNextStep}
        onRemoveItem={handleRemoveItem}
        onUpdateQuantity={handleUpdateQuantity}
      />
    );
  }

  return (
    <Drawer isOpen={isOpen} title={title} onClose={handleCloseCart} ariaLabel="Carrinho lateral">
      {renderContent()}
    </Drawer>
  );
}
