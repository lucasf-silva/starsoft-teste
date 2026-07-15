import { loadNftsList } from '@/services';
import { HomePage } from './_components';

export default async function Home() {
  const { nfts, count } = await loadNftsList();
  return <HomePage nfts={nfts} count={count} />;
}
