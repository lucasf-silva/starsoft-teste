import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { addItem, openCart } from '@/store';
import { makeStore } from '@/store/store';
import { CartDrawer } from './CartDrawer';

const nft = {
  id: 4,
  name: 'Galaxy Blade',
  description: 'Descricao',
  image: 'https://example.com/galaxy-blade.png',
  price: '10',
  createdAt: '2024-01-01',
};

describe('CartDrawer', () => {
  it('mostra estado vazio quando o carrinho esta aberto sem itens', () => {
    const store = makeStore({
      cart: {
        isOpen: true,
        items: [],
      },
    });

    render(
      <Provider store={store}>
        <CartDrawer />
      </Provider>,
    );

    expect(screen.getByText('Seu carrinho está vazio')).toBeInTheDocument();
  });

  it('permite alterar quantidade e remover item', async () => {
    const user = userEvent.setup();
    const store = makeStore();

    store.dispatch(addItem({ nft, quantity: 1 }));
    store.dispatch(openCart());

    render(
      <Provider store={store}>
        <CartDrawer />
      </Provider>,
    );

    await user.click(screen.getByRole('button', { name: 'Aumentar quantidade' }));

    expect(store.getState().cart.items[0].quantity).toBe(2);
    expect(screen.getByText('20.00 ETH')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Finalizar Compra' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: `Remover ${nft.name} do carrinho` }));

    expect(store.getState().cart.items).toHaveLength(0);
    expect(screen.getByText('Seu carrinho está vazio')).toBeInTheDocument();
  });
});
