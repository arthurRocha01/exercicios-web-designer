# 📝 To-Do List

Aplicação de gerenciamento de tarefas simples, construída com **Node.js**, **Express**, **MySQL** e **Vanilla JavaScript**.  
Permite criar, visualizar, concluir, excluir e ordenar tarefas por data, mantendo o status atualizado em tempo real.

---

## 🚀 Funcionalidades

- Criar tarefas com título e data de vencimento.
- Visualizar todas as tarefas cadastradas.
- Atualizar status (pendente/concluída) de cada tarefa.
- Excluir tarefas.
- Ordenar tarefas por data de vencimento.
- Atualização dinâmica sem precisar recarregar a página.
- Interface responsiva e intuitiva.

---

## 💻 Como Instalar

1. Clone o repositório:
```bash
git clone <URL_DO_REPOSITORIO>
cd <NOME_DO_REPOSITORIO>
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente criando um arquivo `.env` na raiz do projeto:
```env
PORT=5010
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASS=sua_senha
DB_NAME=nome_do_banco
```

4. Crie o banco de dados e a tabela `tasks`:
```sql
CREATE DATABASE nome_do_banco;

USE nome_do_banco;

CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    due_date DATE NOT NULL,
    status ENUM('pendente', 'concluida') DEFAULT 'pendente'
);
```

---

## ▶ Como Rodar

1. Inicie o servidor Node.js:
```bash
npm start
```

2. Acesse a aplicação no navegador:
```
http://localhost:5010
```
