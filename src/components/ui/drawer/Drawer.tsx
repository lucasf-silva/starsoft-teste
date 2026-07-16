'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { ReactNode } from 'react';
import styles from './Drawer.module.scss';
import { useDrawer } from './hooks/useDrawer';

type DrawerProps = {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  ariaLabel?: string;
};

export function Drawer({
  isOpen,
  title,
  onClose,
  children,
  ariaLabel = 'Drawer lateral',
}: DrawerProps) {
  useDrawer({ isOpen, onClose });

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.button
            type="button"
            className={styles.backdrop}
            aria-label="Fechar drawer"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.aside
            className={styles.drawer}
            aria-label={ariaLabel}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <div className={styles.header}>
              <button
                type="button"
                className={styles.closeButton}
                onClick={onClose}
                aria-label="Fechar drawer"
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <p className={styles.title}>{title}</p>
              </div>
            </div>

            <div className={styles.content}>{children}</div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
