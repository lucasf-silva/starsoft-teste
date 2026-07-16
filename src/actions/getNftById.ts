import { InfiniteData } from '@tanstack/react-query';
import { DEFAULT_ORDER_BY, DEFAULT_SORT_BY } from '@/config';
import type { Nft, NftList } from '@/types';
import { getNftsList } from './nftsAll';

type CachedNftsList = NftList | NftList[] | InfiniteData<NftList, number>;

function normalizeCachedPages(cachedList: CachedNftsList): NftList[] {
  if (Array.isArray(cachedList)) {
    return cachedList;
  }

  if ('pages' in cachedList) {
    return cachedList.pages;
  }

  return [cachedList];
}

// Foi utilizado esse metodo para buscar o NFT pelo ID, pois a API nao possui rota especifica de detalhe.
export async function getNftById(cachedList: CachedNftsList, id: number): Promise<Nft | undefined> {
  const pages = normalizeCachedPages(cachedList);
  const cachedNft = pages.flatMap((page) => page.nfts).find((nft) => nft.id === id);

  if (cachedNft) {
    return cachedNft;
  }

  const response = await getNftsList({
    page: 1,
    rows: 50,
    sortBy: DEFAULT_SORT_BY,
    orderBy: DEFAULT_ORDER_BY,
  });

  return response?.products.find((nft) => nft.id === id);
}
