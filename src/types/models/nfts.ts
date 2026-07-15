import { z } from 'zod';

export const nftSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  image: z.string(),
  price: z.string(),
  createdAt: z.string(),
});

export const nftsListResponse = z.object({
  products: z.array(nftSchema),
  count: z.number(),
});

export type Nft = z.infer<typeof nftSchema>;
export type NftsListResponse = z.infer<typeof nftsListResponse>;
