import { render, screen } from '@testing-library/react';

import { Container } from '../Container';

describe('Container', () => {
  it('renderiza os children dentro do container', () => {
    render(
      <Container>
        <span>Conteudo de teste</span>
      </Container>,
    );

    expect(screen.getByText('Conteudo de teste')).toBeInTheDocument();
  });

  it('aplica a classe base reutilizavel do container', () => {
    const { container } = render(
      <Container>
        <span>Layout base</span>
      </Container>,
    );

    expect(container.firstChild).toHaveClass('container');
  });
});
