# 🎥 Play Vídeo

A "Aplicação Play Vídeos" é um projeto desenvolvido com Next.js, permitindo aos usuários buscar, visualizar e favoritar vídeos do YouTube de forma intuitiva e eficiente. A interface responsiva proporciona uma experiência fluida e acessível para explorar conteúdos audiovisuais.

Este projeto foi desenvolvido como parte do teste técnico para a vaga de desenvolvedor front-end.

## ✨ Funcionalidades

- 🔍 **Busca de vídeos**: Pesquise vídeos do YouTube com base no título do vídeo.
- ▶️ **Visualização de vídeos**: Assista aos vídeos diretamente na aplicação.
- ❤️ **Favoritos**: Adicione vídeos aos favoritos para acessá-los posteriormente.
- 📄 **Paginação**: Navegue entre os resultados de busca com facilidade.

## 🛠️ Tecnologias Utilizadas

- ⚡ **Next.js** (15.2.3): Framework para desenvolvimento web com React.
- 📦 **Tanstack Query** (5.69.0): Gerenciamento de estado assíncrono e cache de dados.
- 🗂️ **Tanstack Store** (0.7.0): Gerenciamento de estado global para vídeos favoritos.
- 🎨 **Tailwind CSS** (4): Estilização da interface com classes utilitárias.
- 🖼️ **React Icons** (5.5.0): Biblioteca de ícones para React.
- 🛠️ **Shadcn/ui**: Componentes acessíveis e estilizados.
- 🌐 **Axios** (1.8.4): Cliente HTTP para requisições à API do YouTube.

## 🚀 Como Rodar a Aplicação

### Pré-requisitos

Certifique-se de ter instalado:

- 🖥️ [Node.js](https://nodejs.org/)
- 📦 [npm](https://www.npmjs.com/) ou outro gerenciador de pacotes como `yarn`, `pnpm` ou `bun`.

### Passos para rodar localmente

1. 🛠️ Clone o repositório:

   ```bash
   git clone git@github.com:IagoPuzer/teste-opa-games.git
   cd teste-opa-games
   ```

2. 🔑 Configure as variáveis de ambiente:
   Crie um arquivo `.env.local` na raiz do projeto e adicione a seguinte variável:

   ```env
   NEXT_PUBLIC_YOUTUBE_API_KEY=AIzaSyCA1pLbPkJy7TCzNdUfQhBIwCTLJNZ6Jew
   ```

   ⚠️ **Nota**: Caso a chave de API apresente erro de expiração ou exceda o limite de solicitações, será necessário gerar uma nova chave. Entre em contato para solicitar uma nova chave de API.

3. 📦 Instale as dependências:

   ```bash
   npm install
   # ou
   yarn install
   # ou
   pnpm install
   # ou
   bun install
   ```

4. ▶️ Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   # ou
   yarn dev
   # ou
   pnpm dev
   # ou
   bun dev
   ```

5. 🌐 Abra [http://localhost:3000](http://localhost:3000) no navegador para acessar a aplicação.

## 🖥️ Usabilidade

- 🏠 **Página Inicial**: Exibe uma lista de vídeos com base em uma busca padrão. Você pode realizar buscas personalizadas utilizando o campo de pesquisa.
- 🎬 **Modal de Vídeo**: Ao clicar em um vídeo, um modal é aberto para exibição do conteúdo.
- ❤️ **Favoritos**: Acesse a página de favoritos para visualizar os vídeos que você marcou como favoritos.
- 📄 **Paginação**: Navegue entre os resultados de busca utilizando os botões de paginação.

## 🌍 Deploy

Este projeto está hospedado na plataforma Vercel e pode ser acessado através do seguinte link:

👉 [https://teste-opa-games.vercel.app/](https://teste-opa-games.vercel.app/)
