'use client';

import styles from '../CartDrawer.module.scss';

export function CartEmptyState() {
  return (
    <div className={styles.emptyState}>
      <p className={styles.emptyTitle}>Seu carrinho está vazio</p>
      <p className={styles.emptyDescription}>
        Adicione um NFT para vê-lo aqui com a quantidade escolhida.
      </p>
    </div>
  );
}
