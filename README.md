# NLW Pocket JS Node Backend - in.orbit


Este repositório contém o backend da aplicação **NLW Pocket 1.0 - In Orbit**, desenvolvida utilizando Node.js, NestJS e PostgreSQL. O backend é responsável pela lógica de metas, progresso semanal, oferecendo APIs que o frontend consome.




## Tecnologias Utilizadas


[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=flat&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle%20ORM-29ABE2?style=flat&logo=drizzle-orm&logoColor=white)](https://orm.drizzle.team/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)](https://www.docker.com/)
[![Zod](https://img.shields.io/badge/Zod-E69F66?style=flat&logo=zod&logoColor=white)](https://zod.dev/)
[![Biome](https://img.shields.io/badge/Biome-FFCC00?style=flat&logoColor=black)](https://biomejs.dev/)
[![Fastify](https://img.shields.io/badge/Fastify-000000?style=flat&logo=fastify&logoColor=white)](https://www.fastify.io/)
[![Day.js](https://img.shields.io/badge/Day.js-FFCC00?style=flat&logo=dayjs&logoColor=black)](https://day.js.org/)






## Passos para Configuração


1. Clone o repositório:


   ```bash
   git clone https://github.com/danielstos/nlw-pocket-js-node-in.orbit.git
   ```


2. Acesse a pasta do projeto:


   ```bash
   cd nlw-pocket-js-node-in.orbit
   ```


3. Configure as variáveis de ambiente no arquivo `.env`:


   ```bash
   DATABASE_URL=your_database_url
   ```


4. Instale as dependências:


   ```bash
   npm install
   ```




5. Inicialização do Banco de Dados




    ```bash
      docker-compose up -d
      ```
**Suba o banco de dados PostgreSQL com Docker:**


Caso você ainda não tenha um banco de dados PostgreSQL rodando, utilize o Docker para iniciar um contêiner  




6. Inicie o servidor:


   ```bash
   npm run dev
   ```


A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).


## Estrutura de Pastas


```bash
nlw-pocket-js-node-in.orbit/
├── .migrations/
│   └── meta/
│       ├── 0000_calm_leo.sql             # Migração inicial
│       ├── 0001_silky_blink.sql          # Segunda migração
├── .vscode/
│   └── settings.json                     # Configurações específicas do VSCode
├── assets/                               # Arquivos estáticos
├── src/
│   ├── db/
│   │   ├── index.ts                      # Configuração do Drizzle ORM
│   │   ├── schema.ts                     # Definição do schema do banco de dados
│   │   ├── seed.ts                       # Script para popular o banco de dados
│   ├── functions/
│   │   ├── create-goal.ts                # Função para criar metas
│   │   ├── create-goal-completion.ts     # Função para completar metas
│   │   ├── get-week-summary.ts           # Função para obter o resumo semanal
│   │   ├── get-week-pending-goals.ts     # Função para obter metas pendentes
│   ├── http/
│   │   ├── routes/
│   │   │   ├── create-goal.ts            # Rota para criação de metas
│   │   │   ├── create-completion.ts      # Rota para marcar metas como completas
│   │   │   ├── get-pending-goals.ts      # Rota para metas pendentes
│   │   │   ├── get-week-summary.ts       # Rota para resumo semanal
│   ├── env.ts                            # Arquivo de variáveis de ambiente
├── package.json                          # Dependências e scripts da aplicação
├── .env                                  # Variáveis de ambiente
├── .gitignore                            # Arquivos a serem ignorados pelo Git
├── docker-compose.yml                    # Configuração do Docker
├── drizzle.config.ts                     # Configuração do Drizzle ORM
├── biome.json                            # Configuração do Biome
├── tsconfig.json                         # Configuração do TypeScript
├── tsconfig.build.json                   # Configuração para build do TypeScript
```




A relação apresentada é um diagrama simples de um modelo de banco de dados, onde temos duas tabelas: **Goals** e **Goal Completions**. A tabela **Goal Completions** tem uma chave estrangeira (FK) que referencia a tabela **Goals**.


Aqui está a interpretação do modelo:


- A tabela **Goals** contém as metas que o usuário cria, incluindo o título da meta, a frequência semanal desejada, e a data de criação.
- A tabela **Goal Completions** registra as instâncias em que essas metas foram concluídas, com uma referência (chave estrangeira) à meta associada e a data em que foi completada.


A relação é **um para muitos**:
- **Uma meta** (Goals) pode ter **muitas conclusões** (Goal Completions), mas cada conclusão está associada a **uma única meta**.


### Diagrama relacional de exemplo:


```text
+-----------------------------+        +----------------------------+
|            Goals            |        |    Goal Completions        |
+-----------------------------+        +----------------------------+
| ID (PK)                      |<----+ | ID (PK)                    |
| Title                        |       | Goal ID (FK)               |
| Desired Weekly Frequency     |       | Created At                 |
| Created At                   |       +----------------------------+
+------------------------------+
```


### Descrição dos campos:


- **Goals**:
  - `ID (PK)`: Chave primária da tabela, identificador único de cada meta.
  - `Title`: O título ou descrição da meta.
  - `Desired Weekly Frequency`: A frequência semanal desejada para a meta.
  - `Created At`: A data de criação da meta.


- **Goal Completions**:
  - `ID (PK)`: Chave primária da tabela, identificador único de cada conclusão.
  - `Goal ID (FK)`: Chave estrangeira que referencia a tabela **Goals** (a meta que foi completada).
  - `Created At`: A data em que a meta foi concluída.






## Repositório Frontend


O frontend da aplicação está disponível neste repositório: [nlw-pocket-js-react-in.orbit](https://github.com/danielstos/nlw-pocket-js-react-in.orbit). Certifique-se de rodá-lo para que a aplicação funcione completamente.


## Contribuição


Sinta-se à vontade para contribuir com melhorias ou correções. Para isso, faça um fork do repositório, crie uma nova branch e abra um Pull Request com as alterações.
```
