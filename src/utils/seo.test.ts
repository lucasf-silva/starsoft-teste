import { createNotFoundMetadata, createPageMetadata, getMetadataDescription } from './seo';

describe('seo utils', () => {
  it('limita a descricao para metadata quando ultrapassa o tamanho maximo', () => {
    const description = 'a'.repeat(170);

    expect(getMetadataDescription(description)).toHaveLength(160);
    expect(getMetadataDescription(description).endsWith('...')).toBe(true);
  });

  it('cria metadata reutilizavel com canonical e imagem social', () => {
    const metadata = createPageMetadata({
      title: 'NFT Teste',
      description: 'Descricao do NFT de teste',
      path: '/nft/10',
      imageUrl: 'https://example.com/nft.png',
      imageAlt: 'NFT Teste',
    });

    expect(metadata.alternates?.canonical).toBe('/nft/10');
    expect(metadata.openGraph?.images).toEqual([
      {
        url: 'https://example.com/nft.png',
        alt: 'NFT Teste',
      },
    ]);
    expect(metadata.twitter?.images).toEqual(['https://example.com/nft.png']);
  });

  it('cria metadata de nao encontrado com noindex', () => {
    const metadata = createNotFoundMetadata({
      title: 'NFT nao encontrado',
      description: 'Conteudo indisponivel',
    });

    expect(metadata.robots).toEqual({
      index: false,
      follow: false,
    });
  });
});
