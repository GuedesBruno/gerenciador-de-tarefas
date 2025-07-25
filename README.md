# 📝 Gerenciador de Tarefas

Um gerenciador de tarefas moderno e interativo, construído com React, que permite a organização de projetos e tarefas através de um quadro Kanban com funcionalidade de arrastar e soltar.

---

## ✨ Funcionalidades

* **Gerenciamento de Projetos:**
    * Crie, edite, arquive e exclua projetos.
    * Reordene a lista de projetos com a funcionalidade de arrastar e soltar.
* **Gerenciamento de Tarefas:**
    * Crie, edite e exclua tarefas dentro de um projeto específico.
* **Visualização Dupla:**
    * Alterne entre uma visualização de quadro **Kanban** e uma visualização em **Lista**.
* **Quadro Kanban Interativo:**
    * Mova tarefas entre as colunas ("A Fazer", "Em Andamento", "Concluído") com uma interface fluida de arrastar e soltar.
* **Persistência de Dados:**
    * Todos os seus projetos e tarefas são salvos localmente no seu navegador usando `localStorage`, para que você não perca seu trabalho ao recarregar a página.
* **Filtragem e Pesquisa:**
    * Filtre tarefas por status ou pesquise por título e responsável.

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído utilizando as seguintes tecnologias:

* **React:** Biblioteca principal para a construção da interface.
* **Vite:** Ferramenta de build e servidor de desenvolvimento extremamente rápido.
* **Tailwind CSS:** Framework de CSS para uma estilização rápida e moderna.
* **React Context API:** Para gerenciamento de estado global da aplicação.
* **@dnd-kit:** Biblioteca de arrastar e soltar moderna e acessível para React.
* **Phosphor Icons:** Biblioteca de ícones para uma interface mais limpa.

---

## 🚀 Como Rodar o Projeto

Siga os passos abaixo para executar o projeto em seu ambiente local.

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/GuedesBruno/gerenciador-de-tarefas.git](https://github.com/GuedesBruno/gerenciador-de-tarefas.git)
    cd gerenciador-de-tarefas
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

4.  Abra seu navegador e acesse `http://localhost:5173` (ou o endereço que aparecer no seu terminal).

### Scripts Disponíveis

* `npm run dev`: Inicia o servidor de desenvolvimento.
* `npm run build`: Cria a versão de produção do projeto na pasta `dist`.
* `npm run preview`: Pré-visualiza a versão de produção localmente.

---

## 📝 Estrutura de Pastas

A estrutura de pastas do projeto foi organizada para manter uma clara separação de responsabilidades:

```
/src
├── /components/    # Componentes de UI reutilizáveis (Kanban, Modais, Layout, etc.)
├── /context/       # Gerenciamento de estado global com a Context API
├── /pages/         # Componentes que representam páginas completas
├── /services/      # Lógica de acesso a dados (localStorage)
├── /constants/     # Constantes globais da aplicação
├── index.jsx       # Ponto de entrada principal da aplicação React
└── styles.css      # Estilos globais e importações do Tailwind CSS
```