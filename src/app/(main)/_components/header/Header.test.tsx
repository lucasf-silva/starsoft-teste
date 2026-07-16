import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { makeStore } from '@/store/store';
import { addItem } from '@/store';
import { Header } from './Header';

const nft = {
  id: 2,
  name: 'Solar Crown',
  description: 'Descricao',
  image: 'https://example.com/solar-crown.png',
  price: '8',
  createdAt: '2024-01-01',
};

describe('Header', () => {
  it('abre o drawer do carrinho ao clicar no icone', async () => {
    const user = userEvent.setup();
    const store = makeStore();

    render(
      <Provider store={store}>
        <Header />
      </Provider>,
    );

    await user.click(screen.getByRole('button', { name: 'Abrir Carrinho' }));

    expect(screen.getByLabelText('Carrinho lateral')).toBeInTheDocument();
    expect(screen.getByText('Seu carrinho está vazio')).toBeInTheDocument();
  });

  it('mostra badge com a quantidade total de itens no carrinho', () => {
    const store = makeStore();

    store.dispatch(addItem({ nft, quantity: 3 }));

    render(
      <Provider store={store}>
        <Header />
      </Provider>,
    );

    expect(screen.getByText('3')).toBeInTheDocument();
  });
});
