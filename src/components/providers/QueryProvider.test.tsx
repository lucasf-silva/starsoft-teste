import { render, screen } from '@testing-library/react';
import { useQueryClient } from '@tanstack/react-query';
import { QueryProvider } from './QueryProvider';

function TestChild() {
  const queryClient = useQueryClient();

  return <span>{queryClient ? 'provider-ok' : 'provider-fail'}</span>;
}

describe('QueryProvider', () => {
  it('disponibiliza o QueryClient para os children', () => {
    render(
      <QueryProvider>
        <TestChild />
      </QueryProvider>,
    );

    expect(screen.getByText('provider-ok')).toBeInTheDocument();
  });
});
