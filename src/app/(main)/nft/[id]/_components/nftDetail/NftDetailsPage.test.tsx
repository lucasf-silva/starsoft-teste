import { render, screen } from '@testing-library/react';
import { NftDetailPage } from './NftDetailsPage';

const nft = {
  id: 25,
  name: 'Star Wand',
  description: 'Descricao do nft',
  image: 'https://example.com/star-wand.png',
  price: '393.0000',
  createdAt: '2024-01-01',
};

describe('NftDetailPage', () => {
  it('renderiza os dados do nft recebido por props', () => {
    render(<NftDetailPage nft={nft} />);

    expect(screen.getByText('Star Wand')).toBeInTheDocument();
    expect(screen.getByText('Descricao do nft')).toBeInTheDocument();
    expect(screen.getByText('393.00 ETH')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Adicionar ao carrinho' })).toBeInTheDocument();
    expect(screen.getByLabelText('Quantidade selecionada')).toHaveValue(1);
  });
});
