# Starsoft Teste

Aplicacao web em **Next.js 15** para exibicao de NFTs, com foco em listagem paginada, detalhe de produto e fluxo de compra com carrinho global.

## Visao geral

O projeto hoje combina:

- **SSR com App Router** para a home e para a pagina de detalhe
- **React Query** para hidratacao e lista infinita na home
- **Redux Toolkit** para estado global do carrinho
- **SCSS Modules** para estilizacao isolada por componente
- **Pino** para observabilidade com logs estruturados
- **Jest + React Testing Library** para testes automatizados

## Principais funcionalidades

- Listagem de NFTs com ordenacao
- Carregamento incremental de 8 em 8 itens
- Pagina de detalhe por `id`
- Carrinho global com drawer lateral responsivo
- Fluxo de compra em 3 etapas: `items`, `summary` e `success`
- Observabilidade em services, requests HTTP e React Query

## Stack

### Aplicacao

- `Next.js 15`
- `React 19`
- `TypeScript`

### Dados e estado

- `Axios`
- `@tanstack/react-query`
- `@reduxjs/toolkit`
- `react-redux`
- `zod`

### UI

- `sass`
- `framer-motion`
- `lucide-react`

### Qualidade

- `jest`
- `@testing-library/react`
- `eslint`
- `prettier`
- `husky`
- `lint-staged`
- `commitlint`

## Como rodar

### Requisitos

- `Node.js 22`
- `npm`

### Instalacao

```bash
npm install
```

### Desenvolvimento

```bash
npm run dev
```

A aplicacao ficara disponivel em [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev`: inicia o ambiente de desenvolvimento
- `npm run build`: gera o build de producao
- `npm run start`: sobe a aplicacao ja buildada
- `npm run lint`: executa o ESLint
- `npm run test`: executa os testes
- `npm run test:watch`: executa os testes em modo watch
- `npm run test:coverage`: gera relatorio de cobertura

## Variaveis de ambiente

O projeto usa as variaveis:

- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SITE_NAME`

Se elas nao forem informadas, a aplicacao usa fallbacks para manter a execucao local:

```text
NEXT_PUBLIC_API_URL=https://api-challenge.starsoft.games/api/v1
NEXT_PUBLIC_SITE_URL=https://starsoft-teste-alpha.vercel.app
NEXT_PUBLIC_SITE_NAME=Starsoft NFTs
```

## Arquitetura resumida

### Renderizacao

- A home usa SSR com `dynamic = 'force-dynamic'`
- A primeira pagina e prefetched no servidor com React Query
- O cliente continua a navegacao da lista com `useInfiniteQuery`
- A rota de detalhe resolve o NFT no servidor e usa `notFound()` quando necessario

### Camadas principais

- `src/app`: rotas, layouts e paginas
- `src/services`: regras de carga, normalizacao e orquestracao server-side
- `src/actions`: acesso direto a dados externos e resolucoes pontuais
- `src/store`: estado global do carrinho com Redux Toolkit
- `src/components/ui`: componentes reutilizaveis, como `Drawer` e `QuantitySelector`
- `src/types`: contratos compartilhados e tipos auxiliares

### Carrinho

O carrinho e controlado globalmente com Redux e possui tres etapas:

1. `items`
2. `summary`
3. `success`

Comportamento atual:

- `Adicionar ao carrinho` abre o drawer na etapa de itens
- `Comprar` abre o drawer direto no resumo
- finalizar a compra limpa o carrinho
- o ultimo botao fecha o drawer

## Testes e qualidade

- A configuracao de testes usa `Jest` com `jsdom`
- O projeto possui meta minima global de **75%** de cobertura
- Ha integracao com `Husky`, `lint-staged` e `commitlint`
- O CI roda os testes em pull requests para `main`

## Docker

O projeto possui:

- `Dockerfile`
- `docker-compose.yml`

A configuracao atual esta voltada para **desenvolvimento local**, nao para uma imagem final de producao.

Com Docker em modo dev, o projeto montado em `.:/app` permite que o Next leia o arquivo `.env` diretamente do workspace, enquanto o `.dockerignore` impede que arquivos `.env` sejam copiados para a imagem Docker.

Para rodar o projeto com Docker, basta executar:

```bash
docker-compose up
```

Depois disso, a aplicacao fica disponivel em `http://localhost:3000`.

## Documentacao complementar

- [ANALISE_PROJETO.md](./ANALISE_PROJETO.md)
- [INFRAESTRUTURA.md](./INFRAESTRUTURA.md)
- [AI_USAGE.md](./AI_USAGE.md)

## Observacoes

- A API externa nao possui endpoint dedicado por `id`, por isso o detalhe usa uma estrategia de resolucao com fallback.
- O estado do carrinho atualmente nao possui persistencia entre sessoes.
