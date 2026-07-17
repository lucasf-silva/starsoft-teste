import type { Metadata } from 'next';
import { loadNftDetailById } from '@/services';
import { createNotFoundMetadata, createPageMetadata } from '@/utils';
import { notFound } from 'next/navigation';
import { NftDetailPage } from './_components';

type NftDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({ params }: NftDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const nft = await loadNftDetailById(id);

  if (!nft) {
    return createNotFoundMetadata({
      title: 'NFT nao encontrado',
      description: 'O NFT solicitado nao foi encontrado no marketplace da Starsoft.',
    });
  }

  return createPageMetadata({
    title: nft.name,
    description: nft.description,
    path: `/nft/${nft.id}`,
    imageUrl: nft.image,
    imageAlt: nft.name,
  });
}

export default async function NftDetail({ params }: NftDetailPageProps) {
  const { id } = await params;
  const nft = await loadNftDetailById(id);

  if (!nft) {
    notFound();
  }

  return <NftDetailPage nft={nft} />;
}
