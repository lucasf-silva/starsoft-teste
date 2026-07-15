'use client';

import { Container, NftsCard } from '@/components';
import styles from './HomePage.module.scss';
import { motion } from 'framer-motion';
import { Nft } from '@/types';

const products: Nft[] = [
  {
    id: 1,
    name: 'NFT 1',
    description: 'Descrição 1',
    image: 'https://softstar.s3.amazonaws.com/items/star-wand.png',
    price: '100.00',
    createdAt: '2023-01-01',
  },
  {
    id: 2,
    name: 'NFT 2',
    description: 'Descrição 2',
    image: 'https://softstar.s3.amazonaws.com/items/star-wand.png',
    price: '200.00',
    createdAt: '2023-01-02',
  },
];

export function HomePage() {
  return (
    <Container>
      <section className={styles.section}>
        <div className={styles.toolbar}>
          <div className={styles.filters} aria-label="Filtros da lista de produtos">
            <label className={styles.filterGroup}>
              <span className={styles.filterLabel}>Ordenar por</span>
              <select className={styles.select}>
                <option value="id">ID</option>
                <option value="name">Nome</option>
                <option value="price">Preco</option>
              </select>
            </label>

            <label className={styles.filterGroup}>
              <span className={styles.filterLabel}>Ordem</span>
              <select className={styles.select}>
                <option value="ASC">ASC</option>
                <option value="DESC">DESC</option>
              </select>
            </label>
          </div>
        </div>

        <motion.ul className={styles.list} initial="hidden" animate="visible">
          {products.map((product) => (
            <NftsCard key={product.id} nft={product} />
          ))}
        </motion.ul>
      </section>
    </Container>
  );
}
