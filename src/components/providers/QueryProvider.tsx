'use client';

import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createLogger, serializeError } from '@/utils';
import { ReactNode, useState } from 'react';

type QueryProviderProps = {
  children: ReactNode;
};

const logger = createLogger();

export function QueryProvider({ children }: QueryProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error, query) => {
            logger.error(
              {
                queryKey: query.queryKey,
                error: serializeError(error),
              },
              'React Query query failed',
            );
          },
        }),
        mutationCache: new MutationCache({
          onError: (error, _variables, _context, mutation) => {
            logger.error(
              {
                mutationKey: mutation.options.mutationKey,
                error: serializeError(error),
              },
              'React Query mutation failed',
            );
          },
        }),
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5,
            gcTime: 1000 * 60 * 10,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
