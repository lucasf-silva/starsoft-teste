import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  clearMocks: true,
  collectCoverageFrom: [
    'src/actions/**/*.{ts,tsx}',
    'src/services/**/*.{ts,tsx}',
    'src/components/providers/**/*.{ts,tsx}',
    'src/components/shared/container/Container.tsx',
    'src/components/ui/**/*.{ts,tsx}',
    'src/app/(main)/_components/**/*.{ts,tsx}',
    'src/app/(main)/nft/[id]/**/*.{ts,tsx}',
    'src/utils/formatters.ts',
    '!src/**/*.d.ts',
    '!src/**/index.ts',
    '!src/**/*.test.{ts,tsx}',
    '!src/**/*.spec.{ts,tsx}',
  ],
  coverageThreshold: {
    global: {
      statements: 75,
      lines: 75,
      functions: 75,
      branches: 70,
    },
  },
  moduleNameMapper: {
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
    '^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$': '<rootDir>/__mocks__/fileMock.js',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};

export default createJestConfig(customJestConfig);
