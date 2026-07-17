import { Provider } from 'react-redux';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { makeStore } from '@/store/store';
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
    const store = makeStore();

    render(
      <Provider store={store}>
        <NftDetailPage nft={nft} />
      </Provider>,
    );

    expect(screen.getByText('Star Wand')).toBeInTheDocument();
    expect(screen.getByText('Descricao do nft')).toBeInTheDocument();
    expect(screen.getByText('393.00 ETH')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Adicionar ao carrinho' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Comprar' })).toBeInTheDocument();
    expect(screen.getByLabelText('Quantidade selecionada')).toHaveValue(1);
  });

  it('adiciona o nft ao carrinho e abre o drawer no step inicial', async () => {
    const user = userEvent.setup();
    const store = makeStore({
      auth: {
        isLoginDrawerOpen: false,
        user: {
          email: 'user@example.com',
        },
      },
    });

    render(
      <Provider store={store}>
        <NftDetailPage nft={nft} />
      </Provider>,
    );

    fireEvent.change(screen.getByLabelText('Quantidade selecionada'), {
      target: { value: '3' },
    });
    await user.click(screen.getByRole('button', { name: 'Adicionar ao carrinho' }));

    expect(store.getState().cart.items).toEqual([{ ...nft, quantity: 3 }]);
    expect(store.getState().cart.isOpen).toBe(true);
    expect(store.getState().cart.currentStep).toBe('items');
    expect(screen.getByLabelText('Quantidade selecionada')).toHaveValue(1);
  });

  it('abre o resumo quando o usuario escolhe comprar', async () => {
    const user = userEvent.setup();
    const store = makeStore({
      auth: {
        isLoginDrawerOpen: false,
        user: {
          email: 'user@example.com',
        },
      },
    });

    render(
      <Provider store={store}>
        <NftDetailPage nft={nft} />
      </Provider>,
    );

    await user.click(screen.getByRole('button', { name: 'Comprar' }));

    expect(store.getState().cart.items).toEqual([{ ...nft, quantity: 1 }]);
    expect(store.getState().cart.isOpen).toBe(true);
    expect(store.getState().cart.currentStep).toBe('summary');
    expect(screen.getByLabelText('Quantidade selecionada')).toHaveValue(1);
  });

  it('abre o drawer de login e nao adiciona item quando o usuario nao esta autenticado', async () => {
    const user = userEvent.setup();
    const store = makeStore();

    render(
      <Provider store={store}>
        <NftDetailPage nft={nft} />
      </Provider>,
    );

    await user.click(screen.getByRole('button', { name: 'Adicionar ao carrinho' }));

    expect(store.getState().auth.isLoginDrawerOpen).toBe(true);
    expect(store.getState().cart.items).toHaveLength(0);
    expect(store.getState().cart.isOpen).toBe(false);
  });
});
