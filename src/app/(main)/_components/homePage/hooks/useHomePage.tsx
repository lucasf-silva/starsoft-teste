'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { QueryKey } from '@/types';
import {
  DEFAULT_ORDER_BY,
  DEFAULT_SORT_BY,
  getNextNftsPageParam,
  loadNftsList,
  ROWS_PER_PAGE,
} from '@/services';
import type { SortField, SortOrder } from '@/types';
import { useMemo, useState } from 'react';

type useHomePageResponse = {
  nfts: Awaited<ReturnType<typeof loadNftsList>>['nfts'];
  count: number;
  sortBy: SortField;
  orderBy: SortOrder;
  isLoading: boolean;
  isError: boolean;
  isLoadingMore: boolean;
  loadedItems: number;
  progressPercentage: number;
  hasMore: boolean;
  setSortByState: (value: SortField) => void;
  setOrderByState: (value: SortOrder) => void;
  setPageSearch: () => Promise<void>;
  refetch: () => Promise<unknown>;
};

export const useHomePage = (): useHomePageResponse => {
  const [sortBy, setSortByState] = useState<SortField>(DEFAULT_SORT_BY);
  const [orderBy, setOrderByState] = useState<SortOrder>(DEFAULT_ORDER_BY);

  const query = useInfiniteQuery({
    queryKey: QueryKey.NFTS_LIST({ sortBy, orderBy }),
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      loadNftsList({
        page: pageParam,
        rows: ROWS_PER_PAGE,
        sortBy,
        orderBy,
      }),
    getNextPageParam: getNextNftsPageParam,
  });

  const pages = query.data?.pages;
  const nfts = useMemo(() => pages?.flatMap((page) => page.nfts) ?? [], [pages]);
  const count = pages?.[0]?.count ?? 0;
  const loadedItems = nfts.length;
  const progressPercentage = count > 0 ? Math.min((loadedItems / count) * 100, 100) : 0;

  async function setPageSearch(): Promise<void> {
    if (!query.hasNextPage || query.isFetchingNextPage) {
      return;
    }

    await query.fetchNextPage();
  }

  return {
    nfts,
    count,
    sortBy,
    orderBy,
    isLoading: query.isLoading,
    isError: query.isError,
    isLoadingMore: query.isFetchingNextPage,
    loadedItems,
    progressPercentage,
    hasMore: Boolean(query.hasNextPage),
    setSortByState,
    setOrderByState,
    setPageSearch,
    refetch: query.refetch,
  };
};
