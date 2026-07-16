import { getNftsList } from '@/actions';
import { DEFAULT_ORDER_BY, DEFAULT_SORT_BY, ROWS_PER_PAGE } from '@/config';
import { nftsListResponse } from '@/types';
import type { LoadNftsListParams, NftList } from '@/types';
import { createLogger, serializeError } from '@/utils/logger';

const logger = createLogger();

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

  logger.debug({ params: resolvedParams }, 'Loading NFTs list');

  try {
    const response = await getNftsList(resolvedParams);

    const parsed = nftsListResponse.safeParse(response);

    if (!parsed.success) {
      logger.warn(
        {
          params: resolvedParams,
          error: parsed.error.flatten(),
        },
        'NFTs list response validation failed',
      );

      return {
        nfts: [],
        count: 0,
      };
    }

    logger.info(
      {
        params: resolvedParams,
        count: parsed.data.count,
        items: parsed.data.products.length,
      },
      'NFTs list loaded successfully',
    );

    return {
      nfts: parsed.data.products,
      count: parsed.data.count,
    };
  } catch (error) {
    logger.error(
      {
        params: resolvedParams,
        error: serializeError(error),
      },
      'Unexpected error while loading NFTs list',
    );

    return {
      nfts: [],
      count: 0,
    };
  }
}
