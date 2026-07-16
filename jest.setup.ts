import { createElement } from 'react';
import type { ReactNode } from 'react';
import '@testing-library/jest-dom';

type MockComponentProps = {
  children?: ReactNode;
  href?: string;
} & Record<string, unknown>;

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => {
    // Simplifica o next/image em testes para um img comum.
    const imgProps = { ...props };
    delete imgProps.priority;
    return createElement('img', imgProps);
  },
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...props }: MockComponentProps) =>
    createElement('a', { href, ...props }, children),
}));

jest.mock('framer-motion', () => {
  const motion = new Proxy(
    {},
    {
      get:
        (_, tagName: string) =>
        ({ children, ...props }: MockComponentProps) => {
          const cleanProps = { ...props };

          delete cleanProps.animate;
          delete cleanProps.initial;
          delete cleanProps.transition;
          delete cleanProps.variants;
          delete cleanProps.whileHover;
          delete cleanProps.whileTap;

          return createElement(tagName, cleanProps, children);
        },
    },
  );

  return {
    __esModule: true,
    AnimatePresence: ({ children }: MockComponentProps) => children,
    motion,
  };
});
