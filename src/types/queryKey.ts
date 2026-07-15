export const QueryKey = {
  NFTS_LIST: (params: { sortBy: string; orderBy: string }) =>
    ['nfts-list', params.sortBy, params.orderBy] as const,
} as const;
