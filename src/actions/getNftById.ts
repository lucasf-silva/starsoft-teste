import { InfiniteData } from '@tanstack/react-query';
import { DEFAULT_ORDER_BY, DEFAULT_SORT_BY } from '@/config';
import type { Nft, NftList } from '@/types';
import { createLogger } from '@/utils';
import { getNftsList } from './nftsAll';

type CachedNftsList = NftList | NftList[] | InfiniteData<NftList, number>;

const logger = createLogger();

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
    logger.debug({ id }, 'NFT found in cached list');

    return cachedNft;
  }

  logger.info({ id }, 'NFT not found in cache, falling back to list API');

  const response = await getNftsList({
    page: 1,
    rows: 50,
    sortBy: DEFAULT_SORT_BY,
    orderBy: DEFAULT_ORDER_BY,
  });

  const fallbackNft = response?.products.find((nft) => nft.id === id);

  if (!fallbackNft) {
    logger.warn({ id }, 'NFT not found after fallback API lookup');

    return undefined;
  }

  logger.info({ id, name: fallbackNft.name }, 'NFT found through fallback API lookup');

  return fallbackNft;
}
