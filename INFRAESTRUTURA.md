# Infraestrutura do Projeto

## Visao geral

Este projeto possui uma infraestrutura enxuta, voltada principalmente para desenvolvimento local, validacao automatizada e padronizacao basica de qualidade.

Hoje a base de infraestrutura esta apoiada em quatro frentes:

- **runtime Node.js 22**
- **containerizacao com Docker**
- **orquestracao local com docker-compose**
- **CI de testes com GitHub Actions**

## Runtime e dependencias

O projeto roda sobre:

- **Node.js 22**
- **npm** como gerenciador de pacotes
- **Next.js 15** como framework principal

Os scripts expostos em `package.json` sao:

- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`
- `npm run test`
- `npm run test:watch`
- `npm run test:coverage`

## Variaveis de ambiente

### Variavel usada diretamente na aplicacao

O arquivo `src/config/environments.ts` centraliza a URL base da API:

- `NEXT_PUBLIC_API_URL`

Fallback atual:

- `https://api-challenge.starsoft.games/api/v1`

### Variaveis usadas no runtime e containers

No ambiente local com Docker aparecem estas configuracoes:

- `NODE_ENV=development`
- `HOSTNAME=0.0.0.0`
- `PORT=3000`
- `NEXT_TELEMETRY_DISABLED=1`
- `CHOKIDAR_USEPOLLING=true`
- `WATCHPACK_POLLING=true`

Observacoes:

- `HOSTNAME=0.0.0.0` permite expor o servidor para fora do container
- as flags de polling melhoram hot reload em ambientes com volume montado
- `NEXT_TELEMETRY_DISABLED=1` desativa telemetria do Next

## Execucao local sem containers

Fluxo padrao:

1. instalar dependencias com `npm install`
2. iniciar a aplicacao com `npm run dev`
3. acessar `http://localhost:3000`

Comandos complementares:

1. validar lint com `npm run lint`
2. rodar testes com `npm run test`
3. medir cobertura com `npm run test:coverage`

## Docker

O `Dockerfile` atual esta orientado ao desenvolvimento local.

Principais pontos:

- imagem base `node:22-alpine`
- diretorio de trabalho em `/app`
- copia inicial de `package*.json`
- instalacao de dependencias com `npm install`
- copia do restante do projeto
- exposicao da porta `3000`
- comando final em modo dev com `next dev`

Resumo do comportamento:

- a imagem sobe a aplicacao em desenvolvimento
- o servidor escuta em `0.0.0.0`
- o comando final usa `--webpack`

Importante:

- esse `Dockerfile` **nao esta otimizado para producao**
- ele nao separa estagios de build e runtime
- ele nao executa `next build` nem sobe `next start`

## Docker Compose

O `docker-compose.yml` atual sobe um unico servico:

- `app`

Configuracoes relevantes:

- build a partir do `Dockerfile` da raiz
- bind mount do projeto com `.:/app`
- volume dedicado para `node_modules`
- volume dedicado para cache `.next`
- mapeamento de porta `3000:3000`
- comando de dev com hostname explicito

Volumes declarados:

- `node_modules`
- `next_cache`

Beneficios dessa configuracao:

- evita reinstalar dependencias no host a cada execucao dentro do container
- preserva cache de build entre reinicios
- facilita desenvolvimento em maquinas com diferencas de ambiente

## CI com GitHub Actions

O workflow atual fica em `.github/workflows/tests.yml`.

Ele executa em:

- evento de `pull_request` para a branch `main`

Passos do pipeline:

1. checkout do repositorio
2. setup do Node.js 22 com cache de npm
3. instalacao com `npm ci`
4. execucao dos testes com `npm test -- --runInBand`

Pontos positivos:

- pipeline simples e objetivo
- uso de `npm ci` melhora reprodutibilidade
- cache de npm acelera execucoes seguintes

Ponto de atencao:

- como o pipeline usa `npm ci`, o `package-lock.json` precisa ficar sempre sincronizado com o `package.json`
- houve historico de incompatibilidade entre lock gerado com npm 11 e ambiente de CI usando npm 10, entao vale manter atencao ao processo de atualizacao do lockfile

## Qualidade local

A infraestrutura tambem inclui protecoes de qualidade no ciclo de desenvolvimento:

- **ESLint** para analise estatica
- **Prettier** para formatacao
- **Husky** para hooks de git
- **lint-staged** para validar apenas arquivos alterados
- **commitlint** para padronizar mensagens de commit

Na pratica, isso ajuda a reduzir problemas simples antes que eles cheguem ao CI.

## Testes automatizados

O projeto usa:

- **Jest**
- **React Testing Library**
- **jest-environment-jsdom**
- **ts-jest**

O arquivo `jest.config.ts` define:

- ambiente `jsdom`
- setup global em `jest.setup.ts`
- mapeamento de alias `@/`
- cobertura em areas criticas da aplicacao
- threshold minimo global de 75%

Isso coloca a qualidade automatizada como parte real da infraestrutura, e nao apenas como item opcional.

## Observabilidade

A infraestrutura de runtime tambem inclui logging estruturado com **Pino**.

Pontos principais:

- o logger funciona em server e browser
- o nivel de log respeita `NEXT_PUBLIC_LOG_LEVEL` ou `LOG_LEVEL`
- em ambiente de teste o log e silenciado
- a camada HTTP gera logs de request e erro
- o React Query tambem registra falhas de query e mutation

Essa parte melhora a capacidade de diagnostico sem depender apenas do console solto no codigo.

## Limites atuais da infraestrutura

Hoje a infraestrutura cobre bem o desenvolvimento local e a validacao automatica, mas ainda ha espaco para evolucao em producao.

Os principais limites sao:

- Docker preparado para dev, nao para release
- ausencia de workflow de build/deploy
- ausencia de estrategia explicita de gerenciamento de segredos
- ausencia de persistencia de estado do carrinho
- ausencia de monitoramento externo ou agregacao central de logs

## Recomendacoes de evolucao

Se o projeto for seguir para um ambiente mais proximo de producao, os proximos passos mais valiosos sao:

1. criar um `Dockerfile` multi-stage para build e runtime
2. adicionar pipeline de `lint` e `build` alem dos testes
3. documentar um `.env.example`
4. definir estrategia de deploy
5. avaliar persistencia do carrinho e centralizacao de logs

## Conclusao

A infraestrutura atual e suficiente para desenvolver, testar e revisar o projeto com previsibilidade:

- desenvolvimento local em Node ou Docker
- testes automatizados no CI
- padrao de qualidade no fluxo de commit
- logging estruturado para diagnostico

Ela ainda nao e uma esteira completa de producao, mas ja oferece uma base organizada para evoluir o projeto com seguranca.
