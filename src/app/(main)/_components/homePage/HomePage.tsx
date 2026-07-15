'use client';

import { motion } from 'framer-motion';
import { Container, NftsCard } from '@/components';
import type { SortField, SortOrder } from '@/services';
import styles from './HomePage.module.scss';
import { useHomePage } from './hooks/useHomePage';

export function HomePage() {
  const {
    nfts,
    count,
    sortBy,
    orderBy,
    isLoading,
    isError,
    isLoadingMore,
    loadedItems,
    progressPercentage,
    hasMore,
    setSortByState,
    setOrderByState,
    setPageSearch,
    refetch,
  } = useHomePage();

  if (isLoading) {
    return (
      <Container>
        <section className={styles.section}>
          <div className={styles.emptyState}>Carregando NFTs...</div>
        </section>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container>
        <section className={styles.section}>
          <div className={styles.emptyState}>
            <p>Nao foi possivel carregar a lista de NFTs.</p>
            <motion.button
              type="button"
              onClick={() => {
                void refetch();
              }}
              className={styles.retryButton}
              whileHover={{ y: -1, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              Tentar novamente
            </motion.button>
          </div>
        </section>
      </Container>
    );
  }

  return (
    <Container>
      <section className={styles.section}>
        <div className={styles.toolbar}>
          <p className={styles.description}>
            {count} {count === 1 ? 'NFT encontrado' : 'NFTs encontrados'}
          </p>
          <div className={styles.filters} aria-label="Filtros da lista de produtos">
            <label className={styles.filterGroup}>
              <span className={styles.filterLabel}>Ordenar por</span>
              <select
                className={styles.select}
                value={sortBy}
                onChange={(event) => setSortByState(event.target.value as SortField)}
              >
                <option value="id">ID</option>
                <option value="name">Nome</option>
                <option value="price">Preco</option>
              </select>
            </label>

            <label className={styles.filterGroup}>
              <span className={styles.filterLabel}>Ordem</span>
              <select
                className={styles.select}
                value={orderBy}
                onChange={(event) => setOrderByState(event.target.value as SortOrder)}
              >
                <option value="ASC">ASC</option>
                <option value="DESC">DESC</option>
              </select>
            </label>
          </div>
        </div>

        {nfts.length > 0 ? (
          <motion.ul className={styles.list} initial="hidden" animate="visible">
            {nfts.map((product) => (
              <NftsCard key={product.id} nft={product} />
            ))}
          </motion.ul>
        ) : (
          <div className={styles.emptyState}>Nenhum NFT foi encontrado.</div>
        )}

        {count > 0 ? (
          <div className={styles.loadMoreSection}>
            <>
              <div
                className={styles.progressBar}
                role="progressbar"
                aria-label="Progresso de carregamento dos produtos"
                aria-valuemin={0}
                aria-valuemax={count}
                aria-valuenow={loadedItems}
              >
                <div className={styles.progressFill} style={{ width: `${progressPercentage}%` }} />
              </div>

              <div className={styles.loadMoreButtonContainer}>
                <motion.button
                  type="button"
                  onClick={() => {
                    void setPageSearch();
                  }}
                  className={styles.loadMoreButton}
                  disabled={isLoadingMore || !hasMore}
                  whileHover={isLoadingMore ? undefined : { y: -1, scale: 1.01 }}
                  whileTap={isLoadingMore ? undefined : { scale: 0.99 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  {isLoadingMore ? 'Carregando...' : hasMore ? 'Carregar mais' : 'Você já viu tudo'}
                </motion.button>
              </div>
            </>
          </div>
        ) : null}
      </section>
    </Container>
  );
}
