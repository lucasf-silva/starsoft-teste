import { render, screen } from '@testing-library/react';
import { NftsCard } from './NftsCard';

const nft = {
  id: 10,
  name: 'Rare NFT',
  description: 'Uma descricao de teste',
  image: 'https://example.com/nft.png',
  price: '15',
  createdAt: '2024-01-01',
};

describe('NftsCard', () => {
  it('renderiza os dados do nft e o link para detalhe', () => {
    render(<NftsCard nft={nft} />);

    expect(screen.getByText('Rare NFT')).toBeInTheDocument();
    expect(screen.getByText('Uma descricao de teste')).toBeInTheDocument();
    expect(screen.getByText('15.00 ETH')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Ver detalhes' })).toHaveAttribute('href', '/nft/10');
  });
});
