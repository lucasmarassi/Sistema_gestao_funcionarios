
# Sistema de Gestão de Funcionários- Projeto FullStack

## 📄 Descrição

Sistema web completo para cadastro, visualização e gestão de funcionários, departamentos, perfis e histórico de cargos.  
O projeto utiliza a arquitetura MVC e é dividido em frontend (HTML/CSS/JavaScript puro) e backend (Node.js + Express + MySQL).

---

## 📆 Funcionalidades

- Login com autenticação JWT
- CRUD completo de Funcionários
- CRUD de Perfis e Departamentos
- Consulta e cadastro de Histórico de Cargos
- Relatórios estatísticos com média salarial e de idade por departamento
- Gráficos dinâmicos com Chart.js

---

## 📁 Estrutura do Projeto (MVC)

```bash
projetoWEB/
├── app.js
├── banco.sql
├── README.md
├── router/
│   ├── FuncionarioRouter.js
│   ├── PerfisRouter.js
│   ├── DepartamentoRouter.js
│   └── Historico_cargosRouter.js
├── middleware/
│   ├── FuncionarioMiddleware.js
│   ├── PerfisMiddleware.js
│   ├── DepartamentoMiddleware.js
│   └── Historico_cargosMiddleware.js
├── control/
│   ├── FuncionarioControl.js
│   ├── PerfisControl.js
│   ├── DepartamentoControl.js
│   └── Historico_cargosControl.js
├── model/
│   ├── Funcionario.js
│   ├── Perfis.js
│   ├── Departamento.js
│   └── Historico_cargos.js
├── public/
│   ├── login.html
│   ├── painel.html── sair
│   ├── funcionario.html
│   └── departamento.html
    └── historico_cargos.html
```

---

## 📃 Banco de Dados
- Execute o script `banco.sql` no seu gerenciador MySQL para criar as tabelas (`funcionario`, `departamento`, `perfis`, `historico_cargos`).

### Script de Criação:

```sql
CREATE DATABASE projetoWEB;
USE projetoWEB;

CREATE TABLE departamento(
    id_d INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nome VARCHAR(255),
    orcamento FLOAT NOT NULL,
    localizacao VARCHAR(255),
    data_criacao DATE
);

CREATE TABLE funcionario (
    id_func INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nome VARCHAR(200),
    email VARCHAR(255) UNIQUE,
    cpf VARCHAR(14),
    cargo VARCHAR(50),
    salario DECIMAL(10,2),
    data_contratacao DATE,
    id_departamento INT NOT NULL,
    id_supervisor INT,
    senha VARCHAR(50) NOT NULL,
    FOREIGN KEY (id_departamento) REFERENCES departamento(id_d),
    FOREIGN KEY (id_supervisor) REFERENCES funcionario(id_func)
);

CREATE TABLE perfis(
    id_perfil INT PRIMARY KEY NOT NULL AUTO_INCREMENT, 
    id_funcionario INT,
    idade INT,
    endereco VARCHAR(255) NOT NULL,
    telefone VARCHAR(15) NOT NULL,
    genero VARCHAR(20) NOT NULL,
    estado_civil VARCHAR(50) NOT NULL, 
    FOREIGN KEY (id_funcionario) REFERENCES funcionario(id_func)
);

CREATE TABLE historico_cargos(
    id_h INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    id_funcionario INT,
    cargo_anterior VARCHAR(20),
    cargo_novo VARCHAR(20) NOT NULL,
    data_alteracao DATE,
    FOREIGN KEY (id_funcionario) REFERENCES funcionario(id_func)
);
```

---
## 📥 Instalação e Execução

### ✅ Requisitos
- Node.js 18 ou superior  
- MySQL 8 ou superior

---

### 🛠️ Passo a passo

#### 1. Instale o Node.js
Baixe e instale pelo site oficial:  
🔗 https://nodejs.org/en/download/

---

#### 2. Inicie o projeto e instale dependências

No terminal, dentro da pasta do projeto, execute:

```bash
npm init
```

> Isso cria o `package.json`, que armazena informações sobre o projeto: nome, versão, scripts, autor, etc.  
> Preencha o "formulário" ou pressione Enter para manter os valores padrão.

Em seguida, instale o Express:

```bash
npm install express
```

---

#### 📦 Sobre o `package.json`
O arquivo `package.json` é essencial em projetos Node.js. Ele registra:
- Nome e versão do app
- Scripts de execução
- Dependências (como o Express)
- Autor, licença, descrição etc.

---

#### ⚙️ Framework utilizado: **Express**

O Express simplifica a criação de APIs e servidores com:
- Sistema de rotas
- Uso de middlewares
- Facilidade na criação de APIs REST
- Suporte a requisições HTTP
- Estrutura leve e eficiente

---



#### 3. Inicie o servidor

No terminal , execute:

```bash
node app.js
```

> O servidor será iniciado em:  
🔗 http://localhost:8080

---
```

---

## 🔐 Autenticação
- Utiliza JWT (JSON Web Token)
- Token é salvo no `localStorage` após login
- Requisições protegidas usam:
```http
Authorization: Bearer <token>
```

---

## 🖥️ Rotas da API

### Funcionários:
- `POST /funcionario/login`
- `GET /funcionario`
- `POST /funcionario`
- `PUT /funcionario/:id_func`
- `DELETE /funcionario/:id_func`
- `GET /funcionario/:id_func`
- `GET /funcionario/resumo/estatistico`
- `GET /funcionario/media_salario_departamento`

### Perfis:
- `GET /perfis`
- `POST /perfis`
- `PUT /perfis/:id_funcionario`
- `DELETE /perfis/:id_funcionario`
- `GET /perfis/media_idade_departamento`

### Departamentos:
- `GET /departamento`
- `GET /departamento/:id_d`
- `POST /departamento`
- `DELETE /departamento/:id_d`
- `PUT /departamento/:id_d`

### Histórico de Cargos:
- `GET /historico_cargos`
- `GET /historico_cargos/id_funcionario`
- `POST /historico_cargos`
- `DELETE /historico_cargos/:id_h`

---

## 🌟 Destaques

- ✅ **Validação de dados com Middleware (Tabela Funcionário):**
  - `validar_NomeFuncionario(nome)` → Verifica se o nome tem mais de 3 letras.
  - `validar_EmailFuncionario2` → Permite o mesmo e-mail apenas se for do próprio funcionário (durante update).
  - `validar_EmailFuncionario` → Impede cadastro de e-mails já existentes.
  - `validar_Id_supervisor` → Verifica se o supervisor informado existe.
  - `existe_Id_departamento` → Valida se o departamento informado existe.

  **Validação de dados com Middleware (Tabela Perfis):**
  - `existe_Id_funcionario` → Verifica se existe esse id funcionario na tabela funcionario.
  - `validar_TelefonePerfis` → Verifica se tem 11 digitos.
  - `validar_IdadePerfis` → Verifica se a idade esta na margem correta .
  - `validar_IdFuncionario2` → Permite o mesmo id_funcionario apenas se for do próprio funcionário (durante update).
  - `validar_IdFuncionario` → Impede cadastro de funcionarios já existentes.

  **Validação de dados com Middleware (Tabela Departanmento):**
  - `validar_NomeDepartamento2` → Permite o mesmo departamento apenas se for do próprio.
  - `validar_NomeDepartamento` → Impede um novo cadastro de departamentos já existentes.


  **Validação de dados com Middleware (Tabela Historico_cargos):**
  - `existe_Cargo` → Valida se o cargo informado existe na tabela funcionario.
  - `existe_Id_funcionario` → Valida se o id do funcionario informado existe na tabela funcionario.
  

- 🔐 **Proteção de rotas com JWT**  
  Todas as rotas de manipulação de dados estão protegidas com autenticação por token JWT.
   A razão para isso é que os dados contidos em um token podem ser 
   verificados a qualquer momento devido à sua assinatura digital.


- 📊 **Relatórios dinâmicos com gráficos (Chart.js)**  
  Exibição de dados estatísticos com gráficos interativos diretamente no painel sobre media salarial de cada Departamento e media de idade em cada Departamento.

- 🧪 **Validação visual no Frontend**  
  Campos obrigatórios são destacados com bordas vermelhas quando deixados em branco.


---

## 📋 Autor

**Lucas Marassi**  
Projeto desenvolvido para disciplina de programação Web  
Curso Técnico em Informática – Univap – 2025
# Sistema_gest-o_funcion-rios
