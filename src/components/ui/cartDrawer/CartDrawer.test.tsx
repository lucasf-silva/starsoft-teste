import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { addItem, openCart, setCartStep } from '@/store';
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
        currentStep: 'items',
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
    expect(screen.getByRole('button', { name: 'Ver Resumo' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: `Remover ${nft.name} do carrinho` }));

    expect(store.getState().cart.items).toHaveLength(0);
    expect(screen.getByText('Seu carrinho está vazio')).toBeInTheDocument();
  });

  it('renderiza o resumo quando o drawer abre nesse step e finaliza a compra com sucesso', async () => {
    const user = userEvent.setup();
    const store = makeStore({
      auth: {
        isLoginDrawerOpen: false,
        user: {
          email: 'user@example.com',
        },
      },
    });

    store.dispatch(addItem({ nft, quantity: 2 }));
    store.dispatch(setCartStep('summary'));
    store.dispatch(openCart());

    render(
      <Provider store={store}>
        <CartDrawer />
      </Provider>,
    );

    expect(screen.getByText('Resumo da Compra')).toBeInTheDocument();
    expect(screen.getByText('Galaxy Blade')).toBeInTheDocument();
    expect(screen.getByText('Qtd: 2')).toBeInTheDocument();
    expect(screen.getByText('Preço unitário')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Finalizar Compra' }));

    expect(screen.getByText('Compra finalizada com sucesso')).toBeInTheDocument();
    expect(store.getState().cart.items).toHaveLength(0);

    await user.click(screen.getByRole('button', { name: 'Compra Finalizada!' }));

    expect(store.getState().cart.isOpen).toBe(false);
    expect(store.getState().cart.currentStep).toBe('items');
  });

  it('abre o login ao tentar finalizar compra sem autenticacao', async () => {
    const user = userEvent.setup();
    const store = makeStore();

    store.dispatch(addItem({ nft, quantity: 1 }));
    store.dispatch(setCartStep('summary'));
    store.dispatch(openCart());

    render(
      <Provider store={store}>
        <CartDrawer />
      </Provider>,
    );

    await user.click(screen.getByRole('button', { name: 'Finalizar Compra' }));

    expect(store.getState().auth.isLoginDrawerOpen).toBe(true);
    expect(store.getState().cart.items).toHaveLength(1);
    expect(store.getState().cart.currentStep).toBe('summary');
  });
});
