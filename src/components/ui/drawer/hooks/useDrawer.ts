'use client';

import { useEffect } from 'react';

type UseDrawerParams = {
  isOpen: boolean;
  onClose: () => void;
};

export const useDrawer = ({ isOpen, onClose }: UseDrawerParams) => {
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = '';

      return;
    }

    document.body.style.overflow = 'hidden';

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);
};
