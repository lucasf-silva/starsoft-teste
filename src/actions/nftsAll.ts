'use server';

import { Nft, NftsListResponse, PatchAPI } from '@/types';
import type { LoadNftsListParams } from '@/types';
import { api } from '@/utils';
import { createLogger, serializeError } from '@/utils/logger';

type getNftsListResponse = {
  products: Nft[];
  count: number;
};

const logger = createLogger();

export const getNftsList = async (
  params?: LoadNftsListParams,
): Promise<NftsListResponse | undefined> => {
  logger.debug({ params }, 'Fetching NFTs list from external API');

  try {
    const baseApi = await api.get<getNftsListResponse>(PatchAPI.NFTS_LIST, {
      params,
    });

    logger.info(
      {
        params,
        count: baseApi.count,
        items: baseApi.products.length,
      },
      'NFTs list fetched successfully',
    );

    return baseApi;
  } catch (error) {
    logger.error(
      {
        params,
        error: serializeError(error),
      },
      'Failed to fetch NFTs list',
    );

    return {
      products: [],
      count: 0,
    };
  }
};
