import type { MetadataRoute } from 'next';
import { ROWS_PER_PAGE } from '@/config';
import { loadNftsList } from '@/services';
import { SITE_URL } from '@/config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemapEntries: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ];

  let page = 1;
  let loadedItems = 0;
  let totalItems = Number.POSITIVE_INFINITY;

  while (loadedItems < totalItems) {
    const response = await loadNftsList({
      page,
      rows: ROWS_PER_PAGE,
    });

    if (response.nfts.length === 0) {
      break;
    }

    totalItems = response.count;
    loadedItems += response.nfts.length;

    sitemapEntries.push(
      ...response.nfts.map((nft) => ({
        url: `${SITE_URL}/nft/${nft.id}`,
        lastModified: new Date(nft.createdAt),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      })),
    );

    page += 1;
  }

  return sitemapEntries;
}
