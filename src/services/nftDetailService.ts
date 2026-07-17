import 'server-only';

import { getNftById } from '@/actions';
import { Nft } from '@/types';
import { createLogger } from '@/utils';
import { loadNftsList } from './allNftsService';

const logger = createLogger();

export async function loadNftDetailById(id: string): Promise<Nft | null> {
  const nftId = Number(id);

  if (Number.isNaN(nftId)) {
    logger.warn({ id }, 'NFT detail requested with invalid id');

    return null;
  }

  logger.debug({ id: nftId }, 'Loading NFT detail');

  const initialList = await loadNftsList();
  const nft = await getNftById(initialList, nftId);

  if (!nft) {
    logger.info({ id: nftId }, 'NFT detail not found');

    return null;
  }

  logger.info({ id: nftId, name: nft.name }, 'NFT detail loaded successfully');

  return nft ?? null;
}
