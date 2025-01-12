# LiphBank API

Este é o projeto BackEnd do sistema LiphBank construído para fornecer uma API para comunicação entre as aplicações FrontEnd e BackEnd.

## Sumário

- [LiphBank API](#liphbank-api)
  - [Sumário](#sumário)
  - [Stack Utilizada](#stack-utilizada)
  - [Estrutura do Projeto](#estrutura-do-projeto)
  - [Instruções para Execução](#instruções-para-execução)
  - [Funcionalidades da Aplicação](#funcionalidades-da-aplicação)

<div align="right">

[Back To Top ⬆️](#liphbank-api)
</div>

## Stack Utilizada

- **Linguagem de Programação**: Javascript/Typescript, [NodeJS](https://nodejs.org/pt)
- **Frameworks**: [NestJS](https://nestjs.com/)
- **Banco de Dados**: [PostgreSQL](https://www.postgresql.org/), [Redis](https://redis.io/)
- **Ferramentas de Desenvolvimento**: [Docker](https://www.docker.com/), [Postman](https://www.postman.com/)
- **ORM's**: [Prisma](https://www.prisma.io/)

<div align="right">

[Back To Top ⬆️](#liphbank-api)
</div>

## Estrutura do Projeto

A estrutura do projeto foi pensada utilizando os conceitos de Arquitetura DDD (Domain-Driven Design), separando as preocupações em camadas e seguindo um desenvolvimento orientado ao Domínio, como proposto pelo DDD.

```ini
src/
├── application/ # Implementação dos casos de uso e DTO's, fazendo uso das abstrações definidas no domínio
│   ├── common/ # Componentes genéricos reutilizáveis
│   ├── dto/ # Objetos de Transferência de Dados que fornecem um contrato de entrada para os Casos de Uso
│   ├── exceptions/ # Exceções personalizadas utilizada na camada de aplicação
│   ├── jobs/ # Serviços que executam tarefas agendados que utilizam filas (queues) ou são executadas periodicamente (cron jobs)
│   │   ├── queues/ # Serviços que executam tarefas em filas
│   │   └── cron-tabs/ # Serviços de execução periódicas
│   ├── messages/ # Objetos que centralizam as mensagens referentes às entidades do domínio
│   ├── observer/ # Organiza os eventos (events) e os ouvintes (listeners) destes eventos
│   │   ├── events/ # Definição dos eventos
│   │   └── listeners/ # Listeners dos eventos
│   ├── types/ # Definição das tipagens reutilizáveis dentro da camada de aplicação
│   └── use-case/ # Implementação dos casos de uso
├── domain/ # Define as abstrações e entidades da aplicação
│   ├── adapters/ # Abstrações de serviços que se comunicam com bibliotecas externos ou lógica específica
│   ├── entities/ # Representação das entidades da aplicação
│   ├── repositories/ # Abstrações das classes de camada intermediária entre a aplicação e o banco de dados
│   ├── rules/ # Regras relacionadas às entidades que fornecem parâmetros como valores padrão e configurações específicas
│   └── templates/ # Textos de template customizado e parametrizável com base em variáveis dinâmicas
├── infrastructure/ # Implementação das abstrações definidas na camada de domínio
│   ├── adapters/ # Implementação das abstrações de adapters
│   ├── mappers/ # Classes de conversão das entidades para a sua representação do banco de dados (Model) e vice-versa
│   ├── models/ # Tipagens das entidades na sua representação do banco de dados
│   └── repositories/ # Implementação das abstrações dos repositórios
├── presentation/ # Camada de apresentação que controle o ciclo de vida das requisições (Entrada e Saída de dados da requisição)
│   ├── controllers/ # Controllers contendo as rotas da aplicação
│   ├── decorators/ # Param Decorators utilizadas nas rotas para extração de dados da requisição
│   ├── filters/ # Filtros globais de exceções
│   ├── guards/ # Middlewares de rotas que validam se a requisição pode ou não ser prosseguida
│   ├── interceptors/ # Interceptadores de requisição globais para trativa de resposta
│   ├── types/ # Definição das tipagens reutilizáveis dentro da camada de apresentação
│   └── util/ # Classes e funções utils reutilizados dentro da camada de apresentação
├── shared/ # Modulo contendo componentes que podem ser utilizados em qualquer camada
│   ├── dto/ # Definição de DTO's globais e reutilizáveis
│   ├── exceptions/ # Exceções personalizadas que provem a base de todas as outras exceções definidas na aplicação
│   ├── formatters/ # Formatadores globais
│   ├── utils/ # Funções úteis e genéricas
│   └── validators/ # Validadores globais
└── tests/ # Stack de testes da aplicação
    └── unit/ # Testes unitários automatizados
```

<div align="right">

[Back To Top ⬆️](#liphbank-api)
</div>

## Instruções para Execução

- Pré-requisitos:
  - Possuir a CLI do NestJS para rodar o projeto. Para instalá-lo, basta rodar o comando:
    ```bash
    npm i -g @nestjs/cli
    ```

Passo 1: Copiar o arquivo `.env.example` para `.env` (ou apenas renomeá-lo) e preencher cada variável conforme o que se pede

Passo 2: Ter o serviço do **Redis** e **PostgreSQL** rodando. Para usá-los nesta aplicação, é possível utiliza-los via Docker rodando o comando:

```bash
docker compose up -d
```

Passo 3: Instalação das dependências do projeto:

```bash
npm install
```

Passo 4: Realizar as migrações do Prisma para fazer o setup inicial do banco de dados:

```bash
npm run prisma:deploy
```

Passo 5: Execução do projeto:

```bash
npm run start:dev
```

> Alternativamente, é possível executar o script de **setup** do projeto utilizando o comando abaixo:
>
> ```bash
> npm run setup
> ```
> Este comando irá realizar todos os passos de scripts citados a cima, após isso, basta executar a aplicação seguindo o passo 5.

<div align="right">

[Back To Top ⬆️](#liphbank-api)
</div>

## Funcionalidades da Aplicação

//TODO