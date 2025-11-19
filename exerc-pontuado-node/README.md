# 📝 To-Do List

[![Node.js](https://img.shields.io/badge/Node.js-16.x-green)](https://nodejs.org/) 
[![MySQL](https://img.shields.io/badge/MySQL-8.0-blue)](https://www.mysql.com/)

Aplicação de gerenciamento de tarefas simples, construída com **Node.js**, **Express**, **MySQL** e **Vanilla JavaScript**.  
Permite criar, visualizar, concluir, excluir e ordenar tarefas por data, mantendo o status (pendente/concluída) atualizado em tempo real.

---

## 🚀 Funcionalidades

- **Criar tarefa:** Adicionar uma nova tarefa com título e data de vencimento.
- **Visualizar tarefas:** Lista todas as tarefas cadastradas, separando pendentes de concluídas.
- **Atualizar status:** Marcar tarefas como concluídas ou pendentes.
- **Excluir tarefa:** Remove tarefas do sistema.
- **Ordenar por data:** Alterna entre ordem crescente e decrescente.
- **Atualização dinâmica:** Alterações aparecem instantaneamente sem recarregar a página.
- **Responsividade:** Interface compatível com diferentes tamanhos de tela.

---

## 💻 Instalação

1. **Clone o repositório:**
```bash
git clone <URL_DO_REPOSITORIO>
cd <NOME_DO_REPOSITORIO>

Instale as dependências do backend:

npm install


Configure as variáveis de ambiente criando um arquivo .env na raiz do projeto:

PORT=5010
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASS=sua_senha
DB_NAME=nome_do_banco


Crie o banco de dados e a tabela tasks:

CREATE DATABASE nome_do_banco;

USE nome_do_banco;

CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    due_date DATE NOT NULL,
    status ENUM('pendente', 'concluida') DEFAULT 'pendente'
);

▶ Como rodar o projeto

Inicie o servidor Node.js:

npm start


O servidor estará disponível em: http://localhost:5010

Acesse a interface web:
Abra o navegador em: http://localhost:5010/

📁 Estrutura do Projeto
/src
  /controllers   -> Lógica das rotas do backend
  /models        -> Operações no banco de dados
  /routes        -> Rotas do Express
  /public
    index.html   -> Página principal
    style.css    -> Estilos da aplicação
    main.js      -> Inicializa scripts
    api.js       -> Chamadas à API
    events.js    -> Eventos de interação
    render.js    -> Renderização das tasks
/config
  db.js          -> Configuração do MySQL

⚠ Observações

Todas as operações (criar, concluir, excluir) atualizam a lista em tempo real sem recarregar a página.

As tarefas são ordenadas por status (pendente primeiro) e data de vencimento, podendo alternar entre ordem crescente e decrescente.

Certifique-se de que o MySQL esteja rodando e que as credenciais no .env estejam corretas.

📷 Exemplos de Uso

Criar uma tarefa:
Digite o título e selecione a data, clique em "Adicionar tarefa". A tarefa aparecerá instantaneamente na lista.

Concluir uma tarefa:
Clique na checkbox ou no botão ✅ "Concluir". A tarefa será marcada como concluída.

Excluir uma tarefa:
Clique no botão 🗑️ "Excluir". Confirme a ação e a tarefa será removida.

Ordenar tarefas por data:
Clique no botão "📅 Ordenar por Data" para alternar entre crescente e decrescente.

✨ Tecnologias Utilizadas

Backend: Node.js, Express, MySQL, dotenv

Frontend: HTML, CSS, Vanilla JavaScript

Comunicação API: Fetch API