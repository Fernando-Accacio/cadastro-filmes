# 🎬 Projeto API Streaming

Este projeto foi desenvolvido como atividade da trilha **Node.js + Banco de Dados (CREATE/READ)**.
O objetivo é construir uma **API RESTful em Node.js** com banco de dados **MySQL**, permitindo operações de **CRUD** — com foco em CREATE, READ e DELETE como bônus.

Tema escolhido: **Streaming de Filmes e Séries**, com interface inspirada no estilo visual da **Netflix**.

---

## ✨ Funcionalidades

- ✅ Página inicial de navegação
- ✅ Cadastro de filmes e séries (CREATE)
- ✅ Listagem dos conteúdos cadastrados (READ)
- ✅ Exclusão de registros (DELETE — funcionalidade bônus)
- ✅ Interface dark e responsiva
- ✅ Variáveis de ambiente para proteger credenciais (.env)

---

## 💻 Tecnologias Utilizadas

### Backend
- Node.js  
- Express.js  
- mysql2  
- dotenv  
- cors  
- nodemon  

### Frontend
- HTML5  
- CSS3  
- JavaScript (Fetch API)

### Banco de Dados
- MySQL

---

## 🚀 Como Rodar o Projeto em Outra Máquina

### ✅ Pré-requisitos
- Node.js 18+
- MySQL (Workbench ou outro cliente)
- VS Code

---

### 1️⃣ Baixar o Projeto
Clone ou faça download deste repositório.

```bash
git clone https://github.com/seu-repo-aqui
````

---

### 2️⃣ Configurar o Banco de Dados

Abra o **MySQL Workbench** e crie conexão com:

| Configuração | Valor                      |
| ------------ | -------------------------- |
| Host         | `benserverplex.ddns.net`   |
| Porta        | `3306`                     |
| Usuário      | `alunos`                   |
| Senha        | *fornecida pelo professor* |

> ⚠️ Se der erro, pode ser firewall da rede. Tente hotspot do celular.

Depois:

* Abra o schema `api_crud`
* Execute o arquivo **tabelas.sql**
* Verifique ✅ na execução

---

### 3️⃣ Instalar Dependências

No terminal, dentro da pasta do projeto:

```bash
npm install
```

---

### 4️⃣ Criar o Arquivo `.env`

Crie o arquivo `.env` na raiz e preencha com:

```env
DB_HOST="benserverplex.ddns.net"
DB_USER="alunos"
DB_PASS="COLOQUE_A_SENHA_FORNECIDA_PELO_PROFESSOR_AQUI"
DB_NAME="api_crud"
DB_PORT=3306
```

---

### 5️⃣ Rodar a API

```bash
npm start
```

Você verá:

```
Servidor rodando em http://localhost:3000
```

---

### 6️⃣ Acessar o Projeto

Abra no navegador:

👉 [http://localhost:3000](http://localhost:3000)

---

## 📁 Estrutura do Projeto

```
/projeto-streaming
├── styles/
│   └── style.css
├── .env            # Criar manualmente
├── acessaBancoNoServidor.js
├── cadastro.html
├── cadastro.js
├── index.html
├── lista.html
├── lista.js
├── rodarAPI.js
├── tabelas.sql
├── package.json
└── README.md
```

---

## 👥 Integrantes do Grupo

* Andressa Rodrigues Accacio
* Bruna Marques
* Myria Vitoria
* Nicole Barros
* Rayssa Cruz