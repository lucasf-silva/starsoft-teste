import type { Nft } from './models';

export type CartItem = Nft & {
  quantity: number;
};
