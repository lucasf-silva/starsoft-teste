import { createElement } from 'react';
import '@testing-library/jest-dom';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => {
    // Simplifica o next/image em testes para um img comum.
    const imgProps = { ...props };
    delete imgProps.priority;
    return createElement('img', imgProps);
  },
}));
