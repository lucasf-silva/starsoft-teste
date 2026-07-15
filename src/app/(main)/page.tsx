import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { HomePage } from './_components';
import {
  DEFAULT_ORDER_BY,
  DEFAULT_SORT_BY,
  getNextNftsPageParam,
  loadNftsList,
  ROWS_PER_PAGE,
} from '@/services';
import { QueryKey } from '@/types';

export const dynamic = 'force-dynamic';

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
