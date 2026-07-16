import { formatPrice } from './formatters';

describe('formatPrice', () => {
  it('formata o valor com duas casas decimais', () => {
    expect(formatPrice('12')).toBe('12.00');
    expect(formatPrice('12.5')).toBe('12.50');
  });
});
