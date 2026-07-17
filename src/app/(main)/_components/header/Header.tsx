'use client';

import { CartDrawer, LoginDrawer } from '@/components';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Handbag, UserRound } from 'lucide-react';
import Logo from '@/assets/logo.png';

import styles from './Header.module.scss';
import { useHeader } from './hooks/useHeader';

export function Header() {
  const { itemsCount, isAuthenticated, handleToggleCart, handleOpenLoginDrawer } = useHeader();

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.5,
              ease: 'easeOut',
            }}
            whileHover={{
              scale: 1.05,
            }}
          >
            <Link href="/">
              <Image src={Logo} alt="Logo StarSoft" width={100} height={50} priority />
            </Link>
          </motion.div>
          <nav className={styles.navHeader}>
            <motion.button
              className={styles.buttonIcon}
              aria-label={isAuthenticated ? 'Abrir perfil' : 'Abrir login'}
              type="button"
              onClick={handleOpenLoginDrawer}
              whileHover={{ y: -1, scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <span>
                <UserRound />
              </span>
            </motion.button>
            <motion.button
              className={styles.buttonIcon}
              aria-label="Abrir Carrinho"
              type="button"
              onClick={handleToggleCart}
              whileHover={{ y: -1, scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <span>
                <Handbag />
              </span>
              {itemsCount > 0 ? <span className={styles.badge}>{itemsCount}</span> : null}
            </motion.button>
          </nav>
        </div>
      </header>
      <CartDrawer />
      <LoginDrawer />
    </>
  );
}
