import { getNftsList } from '@/actions';
import { DEFAULT_ORDER_BY, DEFAULT_SORT_BY, ROWS_PER_PAGE } from '@/config';
import { nftsListResponse } from '@/types';
import type { LoadNftsListParams, NftList } from '@/types';

export function getNextNftsPageParam(lastPage: NftList, allPages: NftList[]): number | undefined {
  const loadedItems = allPages.reduce((total, page) => total + page.nfts.length, 0);

  return loadedItems < lastPage.count ? allPages.length + 1 : undefined;
}

export async function loadNftsList(params: LoadNftsListParams = {}): Promise<NftList> {
  const resolvedParams: Required<LoadNftsListParams> = {
    page: params.page ?? 1,
    rows: params.rows ?? ROWS_PER_PAGE,
    sortBy: params.sortBy ?? DEFAULT_SORT_BY,
    orderBy: params.orderBy ?? DEFAULT_ORDER_BY,
  };

  try {
    const response = await getNftsList(resolvedParams);

    const parsed = nftsListResponse.safeParse(response);

    if (!parsed.success) {
      console.error(parsed.error);

      return {
        nfts: [],
        count: 0,
      };
    }

    return {
      nfts: parsed.data.products,
      count: parsed.data.count,
    };
  } catch (error) {
    console.error(error);

    return {
      nfts: [],
      count: 0,
    };
  }
}
