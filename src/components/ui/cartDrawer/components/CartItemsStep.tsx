'use client';

import Image from 'next/image';
import { Trash2 } from 'lucide-react';
import { QuantitySelector } from '@/components';
import { ProgressiveImage } from '@/components/ui/progressiveImage';
import type { CartItem } from '@/types';
import { formatPrice } from '@/utils';
import cryptoIcon from '@/assets/cripto-icon.svg';
import styles from '../CartDrawer.module.scss';

type CartItemsStepProps = {
  items: CartItem[];
  totalPrice: number;
  onNextStep: () => void;
  onRemoveItem: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
};

export function CartItemsStep({
  items,
  totalPrice,
  onNextStep,
  onRemoveItem,
  onUpdateQuantity,
}: CartItemsStepProps) {
  return (
    <>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.id} className={styles.item}>
            <div className={styles.itemImageWrapper}>
              <ProgressiveImage
                src={item.image}
                alt={item.name}
                width={88}
                height={88}
                className={styles.itemImage}
              />
            </div>

            <div className={styles.itemContent}>
              <div className={styles.itemHeader}>
                <div>
                  <h3 className={styles.itemTitle}>Item {item.id}</h3>
                  <p className={styles.itemDescription}>{item.name}</p>
                  <div className={styles.itemPriceRow}>
                    <Image src={cryptoIcon} alt="Icone de criptomoeda" width={18} height={18} />
                    <p className={styles.itemPrice}>{formatPrice(item.price)} ETH</p>
                  </div>
                </div>
              </div>

              <div className={styles.itemFooter}>
                <QuantitySelector
                  ariaLabel={`Quantidade do item ${item.name}`}
                  defaultValue={item.quantity}
                  min={1}
                  onChange={(quantity) => onUpdateQuantity(item.id, quantity)}
                />
                <button
                  type="button"
                  className={styles.removeButton}
                  aria-label={`Remover ${item.name} do carrinho`}
                  onClick={() => onRemoveItem(item.id)}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className={styles.summary}>
        <div className={styles.summaryRow}>
          <span>Total</span>
          <strong>{formatPrice(String(totalPrice))} ETH</strong>
        </div>
        <button type="button" className={styles.finishButton} onClick={onNextStep}>
          Ver Resumo
        </button>
      </div>
    </>
  );
}
