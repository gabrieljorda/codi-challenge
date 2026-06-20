# Meu Estoque 

## Sobre o Projeto

Olá! Este projeto foi desenvolvido como parte de um processo para participação da cadi challenge, um desafio onde eu pude colocar em prática meus conhecimentos em React e construir uma aplicação completa.

A ideia é bem direta: criar um sistema onde você possa gerenciar seus produtos de forma fácil e intuitiva. Imagine que você tem uma lojinha, um estoque ou só quer organizar seus itens - este sistema te ajuda com isso.

Com ele você consegue ver todos os produtos cadastrados, adicionar novos, editar informações, controlar a quantidade em estoque e até deletar itens que não são mais necessários. Tudo isso com uma interface limpa e que funciona tanto no computador quanto no celular.

---

## O que você pode fazer

**Ver todos os produtos**
Na página inicial, você encontra uma lista com todos os produtos cadastrados. Cada um mostra o nome, o preço e quantas unidades estão disponíveis. É bem prático para ter uma visão geral do seu estoque.

**Adicionar um novo produto**
Quando você clica no botão "Criar Novo Produto", é aberto um formulário onde você preenche as informações do produto: nome, preço, quantidade e uma descrição opcional. Depois de salvar, o produto já aparece na lista.

**Ver os detalhes de um produto**
Clicando em qualquer produto da lista, você é levado para uma página com todas as informações dele. Lá você também encontra os controles para mexer no estoque.

**Controlar o estoque**
Na página de detalhes, você pode aumentar ou diminuir a quantidade em estoque usando os botões de mais e menos. Também tem um campo onde você pode digitar um valor específico para adicionar de uma vez.

**Editar um produto**
Se você precisa mudar alguma informação, é só clicar no botão "Editar" na página de detalhes. Você vai para um formulário com os dados já preenchidos, faz as alterações e salva.

**Deletar um produto**
Quando um produto não faz mais sentido no seu estoque, você pode removê-lo com o botão "Deletar". O sistema pede uma confirmação antes de apagar, para evitar acidentes.

---

## Como tudo foi construído

### No frontend (a parte que você vê e interage)

Usei React como base da aplicação, que é uma biblioteca muito popular para construir interfaces. Para deixar a navegação entre as páginas mais fluida, utilizei o React Router.

Para conversar com o servidor, escolhi o Axios, que facilita bastante as requisições HTTP. Já para gerenciar os dados que vêm do servidor, usei o React Query, que ajuda a manter tudo sincronizado e ainda cuida dos estados de carregamento e erro.

Os formulários foram feitos com React Hook Form, que torna a validação muito mais simples. E para as notificações de sucesso ou erro, usei o React Hot Toast, que exibe mensagens bonitinhas no canto da tela.

Para a estilização, optei pelo Tailwind CSS, que permite escrever CSS de forma mais rápida e mantém o visual consistente em toda a aplicação.

### No backend (a parte que processa os dados)

O servidor foi construído com Node.js e Express, que são ferramentas leves e eficientes para criar APIs. O banco de dados usado é o SQLite, que não precisa de instalação separada e guarda os dados em um arquivo simples.

A comunicação entre o frontend e o backend é feita através de uma API REST, que segue os padrões HTTP para cada operação.

---

## Como está organizado o código

A estrutura do projeto foi pensada para ser fácil de entender e manter:

**Pasta api**
Guarda todo o código do backend. Dentro dela tem a configuração do banco de dados, o servidor e as rotas da API. É lá que os produtos são salvos e consultados.

**Pasta front**
Contém todo o código do frontend. Dentro da pasta src, temos:

- **api**: Configuração do Axios para fazer as requisições
- **hooks**: Lógica de negócio usando React Query
- **pages**: Cada página da aplicação (Dashboard, Criar, Editar, Detalhes)
- **App.jsx**: O componente principal que organiza as rotas
- **main.jsx**: O ponto de entrada da aplicação
- **index.css**: Estilos globais

Essa separação ajuda a manter cada parte focada na sua responsabilidade.

---

## Como rodar o projeto

### O que você precisa ter instalado

Antes de começar, verifique se você tem o Node.js instalado no seu computador. Você pode baixar a versão mais recente no site oficial do Node.js. Recomendo a versão 18 ou superior.

Também é bom ter o pnpm instalado, mas se você prefere usar o npm, funciona também.

### Passo a passo

**Primeiro, baixe o código**

Se você tem acesso ao repositório, pode clonar com o comando:

`git clone https://github.com/seu-usuario/codi-challenge.git`

Depois entre na pasta do projeto:

`cd codi-challenge`

**Segundo, inicie o servidor**

Entre na pasta do backend:

`cd api`

Instale as dependências necessárias:

`npm install`

E inicie o servidor:

`npm run dev`

Você vai ver uma mensagem no terminal dizendo que a API está rodando. Normalmente é em http://localhost:3000.

**Terceiro, inicie o frontend**

Abra um novo terminal (ou saia da pasta api) e entre na pasta do frontend:

`cd front`

Instale as dependências:

`npm install`

Inicie o frontend:

`npm run dev`