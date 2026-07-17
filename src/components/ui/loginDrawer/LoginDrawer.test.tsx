import { Provider } from 'react-redux';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { makeStore, openLoginDrawer } from '@/store';
import { LoginDrawer } from './LoginDrawer';

describe('LoginDrawer', () => {
  it('valida email e senha com Zod', async () => {
    const user = userEvent.setup();
    const store = makeStore();

    store.dispatch(openLoginDrawer());

    render(
      <Provider store={store}>
        <LoginDrawer />
      </Provider>,
    );

    fireEvent.change(screen.getByLabelText('E-mail'), {
      target: { value: 'email-invalido' },
    });
    fireEvent.change(screen.getByLabelText('Senha'), {
      target: { value: '123' },
    });
    await user.click(screen.getByRole('button', { name: 'Entrar' }));

    expect(screen.getByText('Informe um e-mail valido.')).toBeInTheDocument();
    expect(screen.getByText('A senha deve ter no minimo 6 caracteres.')).toBeInTheDocument();
    expect(store.getState().auth.user).toBeNull();
  });

  it('autentica o usuario com dados validos', async () => {
    const user = userEvent.setup();
    const store = makeStore();

    store.dispatch(openLoginDrawer());

    render(
      <Provider store={store}>
        <LoginDrawer />
      </Provider>,
    );

    fireEvent.change(screen.getByLabelText('E-mail'), {
      target: { value: 'user@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Senha'), {
      target: { value: '123456' },
    });
    await user.click(screen.getByRole('button', { name: 'Entrar' }));

    await waitFor(() => {
      expect(store.getState().auth.user).toEqual({ email: 'user@example.com' });
      expect(store.getState().auth.isLoginDrawerOpen).toBe(false);
    });
  });
});
