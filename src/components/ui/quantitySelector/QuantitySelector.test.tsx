import { fireEvent, render, screen } from '@testing-library/react';
import { QuantitySelector } from './QuantitySelector';

describe('QuantitySelector', () => {
  it('renderiza com valor inicial padrao', () => {
    render(<QuantitySelector />);

    expect(screen.getByLabelText('Quantidade selecionada')).toHaveValue(1);
  });

  it('incrementa e decrementa respeitando o callback', () => {
    const onChange = jest.fn();

    render(<QuantitySelector defaultValue={2} onChange={onChange} />);

    fireEvent.click(screen.getByLabelText('Aumentar quantidade'));
    fireEvent.click(screen.getByLabelText('Diminuir quantidade'));

    expect(screen.getByLabelText('Quantidade selecionada')).toHaveValue(2);
    expect(onChange).toHaveBeenNthCalledWith(1, 3);
    expect(onChange).toHaveBeenNthCalledWith(2, 2);
  });

  it('aplica clamp entre min e max', () => {
    render(<QuantitySelector min={1} max={3} defaultValue={3} />);

    fireEvent.click(screen.getByLabelText('Aumentar quantidade'));
    expect(screen.getByLabelText('Quantidade selecionada')).toHaveValue(3);
    expect(screen.getByText('Quantidade maxima: 3.')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Quantidade selecionada'), {
      target: { value: '0' },
    });
    expect(screen.getByLabelText('Quantidade selecionada')).toHaveValue(1);
    expect(screen.getByText('Quantidade minima: 1.')).toBeInTheDocument();
  });

  it('remove a mensagem de erro ao voltar para um valor valido', () => {
    render(<QuantitySelector min={1} max={3} defaultValue={2} />);

    fireEvent.change(screen.getByLabelText('Quantidade selecionada'), {
      target: { value: '4' },
    });

    expect(screen.getByText('Quantidade maxima: 3.')).toBeInTheDocument();
    expect(screen.getByLabelText('Quantidade selecionada')).toHaveValue(3);

    fireEvent.change(screen.getByLabelText('Quantidade selecionada'), {
      target: { value: '2' },
    });

    expect(screen.queryByText('Quantidade maxima: 3.')).not.toBeInTheDocument();
    expect(screen.getByLabelText('Quantidade selecionada')).toHaveValue(2);
  });
});
