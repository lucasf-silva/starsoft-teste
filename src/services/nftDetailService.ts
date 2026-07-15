import 'server-only';

import { getNftById } from '@/actions';
import { Nft } from '@/types';
import { loadNftsList } from './allNftsService';

export async function loadNftDetailById(id: string): Promise<Nft | null> {
  const nftId = Number(id);

  if (Number.isNaN(nftId)) {
    return null;
  }

  const initialList = await loadNftsList();
  const nft = await getNftById(initialList, nftId);

  return nft ?? null;
}
