import type { Metadata } from 'next';

type CreatePageMetadataParams = {
  title: string;
  description: string;
  path: string;
  imageUrl?: string;
  imageAlt?: string;
  type?: 'website' | 'article';
  noIndex?: boolean;
};

type CreateNotFoundMetadataParams = {
  title: string;
  description: string;
};

export function getMetadataDescription(description: string, maxLength = 160) {
  const normalizedDescription = description.trim();

  if (normalizedDescription.length <= maxLength) {
    return normalizedDescription;
  }

  return `${normalizedDescription.slice(0, maxLength - 3)}...`;
}

export function createPageMetadata({
  title,
  description,
  path,
  imageUrl,
  imageAlt,
  type = 'website',
  noIndex = false,
}: CreatePageMetadataParams): Metadata {
  const normalizedDescription = getMetadataDescription(description);
  const images = imageUrl
    ? [
        {
          url: imageUrl,
          alt: imageAlt ?? title,
        },
      ]
    : undefined;

  return {
    title,
    description: normalizedDescription,
    alternates: {
      canonical: path,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : undefined,
    openGraph: {
      title,
      description: normalizedDescription,
      url: path,
      type,
      images,
    },
    twitter: {
      card: imageUrl ? 'summary_large_image' : 'summary',
      title,
      description: normalizedDescription,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

export function createNotFoundMetadata({
  title,
  description,
}: CreateNotFoundMetadataParams): Metadata {
  return createPageMetadata({
    title,
    description,
    path: '',
    noIndex: true,
  });
}
