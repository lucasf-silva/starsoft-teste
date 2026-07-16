import type { Metadata } from 'next';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { DEFAULT_ORDER_BY, DEFAULT_SORT_BY, ROWS_PER_PAGE } from '@/config';
import { HomePage } from './_components';
import { getNextNftsPageParam, loadNftsList } from '@/services';
import { QueryKey } from '@/types';
import { createPageMetadata } from '@/utils';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = createPageMetadata({
  title: 'Marketplace de NFTs',
  description:
    'Descubra NFTs exclusivos, explore a colecao da Starsoft e navegue por itens digitais com carregamento otimizado.',
  path: '/',
});

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: QueryKey.NFTS_LIST({
      sortBy: DEFAULT_SORT_BY,
      orderBy: DEFAULT_ORDER_BY,
    }),
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      loadNftsList({
        page: pageParam,
        rows: ROWS_PER_PAGE,
        sortBy: DEFAULT_SORT_BY,
        orderBy: DEFAULT_ORDER_BY,
      }),
    getNextPageParam: getNextNftsPageParam,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomePage />
    </HydrationBoundary>
  );
}
