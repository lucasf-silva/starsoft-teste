import { loadNftDetailById } from '@/services/nftDetailService';
import { notFound } from 'next/navigation';
import { NftDetailPage } from './_components';

type NftDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function NftDetail({ params }: NftDetailPageProps) {
  const { id } = await params;
  const nft = await loadNftDetailById(id);

  if (!nft) {
    notFound();
  }

  return <NftDetailPage nft={nft} />;
}
