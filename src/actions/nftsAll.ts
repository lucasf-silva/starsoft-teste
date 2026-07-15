'use server';

import { Nft, NftsListResponse, PatchAPI } from '@/types';
import type { LoadNftsListParams } from '@/types';
import { api } from '@/utils';

type getNftsListResponse = {
  products: Nft[];
  count: number;
};

export const getNftsList = async (
  params?: LoadNftsListParams,
): Promise<NftsListResponse | undefined> => {
  try {
    const baseApi = await api.get<getNftsListResponse>(PatchAPI.NFTS_LIST, {
      params,
    });

    return baseApi;
  } catch (error) {
    console.log(error);
    return {
      products: [],
      count: 0,
    };
  }
};
