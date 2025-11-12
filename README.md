# PDM 06 — Feed de Notícias com Arquitetura MVVM

## Sobre a API Utilizada

Este projeto utiliza a **NewsAPI** (https://newsapi.org) como fonte de dados para o feed de notícias.

**Endpoints utilizados:**
- `/v2/top-headlines`: Para exibir as principais notícias do Brasil
- `/v2/everything`: Para buscar notícias por palavra-chave

**Limitações do Plano Gratuito:**
- O plano gratuito da NewsAPI possui algumas limitações de uso.
- No código, o limite está configurado para 20 notícias (`limit: number = 20` no `NewsService`).

## Visão Geral

- Aplicativo React Native com Expo implementando o padrão de arquitetura **MVVM (Model-View-ViewModel)**.
- Feed de notícias dinâmico obtido da API pública NewsAPI.
- Funcionalidades: busca por palavra-chave, pull-to-refresh, tela de detalhes e tratamento de erros.

## Conceitos (Didático)

- **View**: Renderiza UI com base no estado. Não chama serviços nem contém regras de negócio. Componentes: `Home` e `NewsDetail`.
- **ViewModel**: Orquestra chamadas ao serviço, mantém estado e expõe ações para a View. Centraliza tratamento de erros e regras. Hook: `useNews`.
- **Model**: Define entidades e serviços para dados. Não conhece UI. `News` define a estrutura dos dados; `NewsService` acessa HTTP e retorna tipos.

## Funcionalidades Implementadas

✅ Feed de notícias com lista de notícias (título, imagem, fonte, data)  
✅ Campo de busca para filtrar notícias por palavra-chave  
✅ Indicador de carregamento durante requisições  
✅ Tratamento de erros de rede com mensagens amigáveis  
✅ Pull-to-refresh para atualizar o feed  
✅ Tela de detalhes ao clicar em uma notícia  
✅ Exibição de data e fonte de cada notícia  
✅ Cards com imagens, títulos e descrições  

## Explicando cada parte

### View (Components)

- **`source/components/Home.tsx`** (Tela Principal)
  - Usa `useNews` para obter estados e ações (`news`, `loading`, `error`, `search`, `refresh`).
  - Renderiza spinner centralizado quando `loading` é verdadeiro e não há notícias.
  - Exibe mensagem de erro e botão "Recarregar" quando há erro e não há notícias.
  - Lista cards com imagem, título, descrição, fonte e data usando `FlatList`.
  - Campo de busca na parte superior com botão de pesquisa.
  - Implementa `RefreshControl` para pull-to-refresh.
  - Navegação para tela de detalhes ao clicar em uma notícia.

- **`source/components/NewsDetail.tsx`** (Tela de Detalhes)
  - Exibe notícia completa com imagem, título, descrição, fonte, data e URL.
  - Botão "Voltar" para retornar à tela principal.

### ViewModel

- **`source/viewmodel/useNews.ts`**
  - Estados: `news`, `loading`, `error`, `searchTerm`.
  - Ações: `refresh()` para recarregar notícias, `search(term)` para buscar por palavra-chave, `setSearchTerm(term)` para atualizar termo de busca.
  - Efeito inicial: chama `refresh()` ao montar.
  - Trata erros definindo mensagens amigáveis em português.

### Model

- **`source/model/entities/news.ts`**
  - Interface `News` com campos: `title`, `description`, `url`, `urlToImage`, `publishedAt`, `source` (objeto com `id` e `name`), `author`, `content`.

- **`source/model/services/newsService.ts`**
  - Serviço `NewsService.getNews()` usa `axios` para obter dados da NewsAPI.
  - Parâmetros: `search` (opcional), `limit` (padrão: 20).
  - Retorna `Promise<News[]>` tipada.
  - Tratamento de erro deixado para o ViewModel.

## Arquitetura (MVVM)

- **Model**: Define entidades e serviços de dados.
  - `source/model/entities/news.ts`: entidade `News` (tipos/estrutura).
  - `source/model/services/newsService.ts`: acesso HTTP via `axios` e retorno tipado.

- **ViewModel**: Orquestra chamadas ao serviço e expõe estado/ações para a UI.
  - `source/viewmodel/useNews.ts`: estados `news`, `loading`, `error`, `searchTerm` e ações `refresh`, `search`, `setSearchTerm`.

- **View**: Renderiza a interface com base no estado do ViewModel.
  - `source/components/Home.tsx`: exibe loading/erro/dados consumindo `useNews`.
  - `source/components/NewsDetail.tsx`: exibe detalhes completos da notícia.

## Estrutura do Projeto

```
/ (raiz)
├── README.md
├── app.json
├── index.ts
├── package.json
├── source/
│   ├── App.tsx
│   ├── components/
│   │   ├── README.md
│   │   ├── Home.tsx
│   │   ├── NewsDetail.tsx
│   │   └── PostList.tsx
│   ├── model/
│   │   ├── entities/
│   │   │   ├── news.ts
│   │   │   └── post.ts
│   │   ├── services/
│   │   │   ├── newsService.ts
│   │   │   └── postService.ts
│   │   └── README.md
│   └── viewmodel/
│       ├── README.md
│       ├── useNews.ts
│       └── usePosts.ts
└── tsconfig.json
```

## Como Executar (Expo)

Para executar o projeto localmente:

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Iniciar o servidor Expo:**
   ```bash
   npm start
   # ou
   npx expo start
   ```

3. **Executar em plataforma específica:**
   ```bash
   npm run android  # Android
   npm run ios      # iOS
   npm run web      # Web
   ```

## Fluxo de Dados

1. A View (`Home`) consome o ViewModel (`useNews`).
2. O ViewModel chama o serviço `NewsService.getNews()` e atualiza estados.
3. A View reage aos estados (`loading`, `error`, `news`) e renderiza.
4. Ao clicar em uma notícia, navega para `NewsDetail` passando o objeto `News`.
5. Ao buscar, o ViewModel chama `NewsService.getNews()` com o termo de busca.

## Configuração da API

A chave da API está configurada no arquivo `source/model/services/newsService.ts`:

```typescript
const API_KEY = '0e05347ee3924850956ad491ef160c6e';
```

**Nota:** Em produção, o token deveria estar em variável de ambiente (`.env`), mas por questões didáticas está no código.

## Diretrizes e Boas Práticas

- Separação de camadas: sem lógica de negócio em componentes de UI.
- Tipagens explícitas em TypeScript para entidades e props.
- Erros de rede tratados no ViewModel, sem acoplar UI ao transporte.
- Mensagens de erro em português e amigáveis ao usuário.
- Uso de `async/await` (nunca `.then()`).
- Function declarations para hooks e componentes principais.
- Estilos sempre no final com `StyleSheet.create`.

## Dependências Principais

- `expo`: ~54.0.20
- `react`: 19.1.0
- `react-native`: 0.81.5
- `axios`: ^1.13.1
- `typescript`: ~5.9.2

## Padrão de Código

Este projeto segue rigorosamente o padrão definido no arquivo `contexto_pdm.txt`, que estabelece:
- Arquitetura MVVM com separação rigorosa de camadas
- TypeScript com strict mode
- Nomenclatura: camelCase para funções/variáveis, PascalCase para componentes/interfaces
- Function declarations para hooks e componentes principais
- Tratamento de erro no ViewModel
- Textos em português

## Licença

Uso acadêmico/didático.
