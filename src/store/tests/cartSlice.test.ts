import {
  addItem,
  cartSlice,
  closeCart,
  openCart,
  removeItem,
  toggleCart,
  updateQuantity,
} from '../cartSlice';

const nft = {
  id: 10,
  name: 'Nebula Key',
  description: 'NFT de teste',
  image: 'https://example.com/nft.png',
  price: '12.5',
  createdAt: '2024-01-01',
};

describe('cartSlice', () => {
  it('adiciona um novo item ao carrinho', () => {
    const state = cartSlice.reducer(undefined, addItem({ nft, quantity: 2 }));

    expect(state.items).toEqual([{ ...nft, quantity: 2 }]);
  });

  it('soma a quantidade quando o item ja existe no carrinho', () => {
    const initialState = {
      isOpen: false,
      items: [{ ...nft, quantity: 1 }],
    };

    const state = cartSlice.reducer(initialState, addItem({ nft, quantity: 3 }));

    expect(state.items).toEqual([{ ...nft, quantity: 4 }]);
  });

  it('atualiza a quantidade respeitando o minimo de 1', () => {
    const initialState = {
      isOpen: false,
      items: [{ ...nft, quantity: 4 }],
    };

    const state = cartSlice.reducer(initialState, updateQuantity({ id: nft.id, quantity: 0 }));

    expect(state.items[0].quantity).toBe(1);
  });

  it('remove item e controla abertura do drawer', () => {
    const withOpenCart = cartSlice.reducer(undefined, openCart());
    const withItem = cartSlice.reducer(withOpenCart, addItem({ nft, quantity: 1 }));
    const withoutItem = cartSlice.reducer(withItem, removeItem(nft.id));
    const toggled = cartSlice.reducer(withoutItem, toggleCart());
    const closed = cartSlice.reducer(toggled, closeCart());

    expect(withOpenCart.isOpen).toBe(true);
    expect(withoutItem.items).toHaveLength(0);
    expect(toggled.isOpen).toBe(false);
    expect(closed.isOpen).toBe(false);
  });
});
