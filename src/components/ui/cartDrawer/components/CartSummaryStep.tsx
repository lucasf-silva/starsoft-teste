'use client';

import type { CartItem } from '@/types';
import { formatPrice } from '@/utils';
import styles from '../CartDrawer.module.scss';

type CartSummaryStepProps = {
  items: CartItem[];
  totalPrice: number;
  canGoBack: boolean;
  onBack: () => void;
  onFinishPurchase: () => void;
};

export function CartSummaryStep({
  items,
  totalPrice,
  canGoBack,
  onBack,
  onFinishPurchase,
}: CartSummaryStepProps) {
  return (
    <>
      <ul className={styles.summaryList}>
        {items.map((item) => (
          <li key={item.id} className={styles.summaryItem}>
            <div className={styles.summaryItemHeader}>
              <span className={styles.summaryItemName}>{item.name}</span>
              <span className={styles.summaryItemQuantity}>Qtd: {item.quantity}</span>
            </div>
            <div className={styles.summaryItemRow}>
              <span>Preço unitário</span>
              <strong>{formatPrice(item.price)} ETH</strong>
            </div>
          </li>
        ))}
      </ul>

      <div className={styles.summary}>
        <div className={styles.summaryRow}>
          <span>Total</span>
          <strong>{formatPrice(String(totalPrice))} ETH</strong>
        </div>
        <div className={styles.summaryActions}>
          {canGoBack ? (
            <button type="button" className={styles.secondaryButton} onClick={onBack}>
              Voltar
            </button>
          ) : null}
          <button type="button" className={styles.finishButton} onClick={onFinishPurchase}>
            Finalizar Compra
          </button>
        </div>
      </div>
    </>
  );
}
