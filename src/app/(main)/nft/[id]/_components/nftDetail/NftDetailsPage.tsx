'use client';

import { Container, ProgressiveImage, QuantitySelector } from '@/components';
import Image from 'next/image';
import styles from './NftsDetailPage.module.scss';
import cryptoIcon from '@/assets/cripto-icon.svg';
import { formatPrice } from '@/utils';
import { Nft } from '@/types';
import { useNftDetailPage } from './hooks/useNftDetailPage';

type NftDetailPageProps = {
  nft: Nft;
};

export function NftDetailPage({ nft }: NftDetailPageProps) {
  const { quantity, setQuantity, handleAddToCart, handleBuyNow } = useNftDetailPage({ nft });

  return (
    <Container>
      <div className={styles.card}>
        <div className={styles.imageWrapper}>
          <ProgressiveImage
            className={styles.image}
            src={nft.image}
            alt={nft.name}
            width={240}
            height={240}
            sizes="(min-width: 1536px) 22vw, (min-width: 1024px) 30vw, (min-width: 640px) 40vw, 100vw"
            priority
          />
        </div>

        <div className={styles.content}>
          <h2 className={styles.productName}>{nft.name}</h2>
          <p className={styles.description}>{nft.description}</p>
          <div className={styles.priceRow}>
            <div className={styles.priceContent}>
              <Image
                src={cryptoIcon}
                alt="Icone de criptomoeda"
                width={29}
                height={29}
                className={styles.priceIcon}
              />
              <p className={styles.price}>{formatPrice(nft.price)} ETH</p>
            </div>
            <div className={styles.actions}>
              <QuantitySelector defaultValue={quantity} onChange={setQuantity} />
              <button className={styles.buttonAction} type="button" onClick={handleAddToCart}>
                Adicionar ao carrinho
              </button>
              <button className={styles.buyButton} type="button" onClick={handleBuyNow}>
                Comprar
              </button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
