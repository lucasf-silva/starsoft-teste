'use server';

import { getNftsList } from '@/actions/nftsAll';
import { Nft } from '@/types';

export type NftList = {
  nfts: Nft[];
  count: number;
};

export async function loadNftsList(): Promise<NftList> {
  try {
    const [nftsList] = await Promise.all([
      getNftsList().catch((err) => {
        return {
          products: [],
          count: 0,
        };
      }),
    ]);
    return {
      nfts: nftsList?.products || [],
      count: nftsList?.count || 0,
    };
  } catch (error) {
    console.log(error);
    return {
      nfts: [],
      count: 0,
    };
  }
}
