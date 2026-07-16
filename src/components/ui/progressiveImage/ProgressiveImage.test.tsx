import { fireEvent, render, screen } from '@testing-library/react';
import { ProgressiveImage } from './ProgressiveImage';

describe('ProgressiveImage', () => {
  it('mantem o placeholder ate carregar e reutiliza o cache visual da mesma imagem', () => {
    const src = 'https://example.com/cache-image.png';
    const { rerender } = render(
      <ProgressiveImage src={src} alt="NFT em cache" width={120} height={120} />,
    );

    const firstWrapper = screen.getByRole('img', { name: 'NFT em cache' }).parentElement;

    expect(firstWrapper).toHaveAttribute('data-loaded', 'false');
    expect(firstWrapper).toHaveAttribute('aria-busy', 'true');

    fireEvent.load(screen.getByRole('img', { name: 'NFT em cache' }));

    expect(firstWrapper).toHaveAttribute('data-loaded', 'true');
    expect(firstWrapper).toHaveAttribute('aria-busy', 'false');

    rerender(
      <ProgressiveImage src={src} alt="NFT em cache reaproveitado" width={120} height={120} />,
    );

    const secondWrapper = screen.getByRole('img', {
      name: 'NFT em cache reaproveitado',
    }).parentElement;

    expect(secondWrapper).toHaveAttribute('data-loaded', 'true');
    expect(secondWrapper).toHaveAttribute('aria-busy', 'false');
  });
});
