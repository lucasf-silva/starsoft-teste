import type { Nft } from './models';

export type NftList = {
  nfts: Nft[];
  count: number;
};

export type SortField = 'id' | 'name' | 'price';
export type SortOrder = 'ASC' | 'DESC';

export type LoadNftsListParams = {
  page?: number;
  rows?: number;
  sortBy?: SortField;
  orderBy?: SortOrder;
};
