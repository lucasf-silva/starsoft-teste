import { motion } from 'framer-motion';
import styles from './NftsCard.module.scss';
import Image from 'next/image';
import cryptoIcon from '@/assets/cripto-icon.svg';
import { formatPrice } from '@/utils';
import { Nft } from '@/types';
import Link from 'next/link';

type NftsCardProps = {
  nft: Nft;
};

export function NftsCard({ nft }: NftsCardProps) {
  return (
    <motion.li
      className={styles.card}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.35, ease: 'easeOut' },
        },
      }}
      whileHover={{
        y: -6,
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.18)',
      }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
    >
      <div className={styles.imageWrapper}>
        <Image
          className={styles.image}
          src={nft.image}
          alt={nft.name}
          width={240}
          height={240}
          sizes="(min-width: 1536px) 22vw, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
        />
      </div>

      <div className={styles.content}>
        <h2 className={styles.productName}>{nft.name}</h2>
        <p className={styles.description}>{nft.description}</p>
        <div className={styles.priceRow}>
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
          <Link href={`/nft/${nft.id}`} className={styles.button}>
            Ver detalhes
          </Link>
        </div>
      </div>
    </motion.li>
  );
}
