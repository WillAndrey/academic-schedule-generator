# 🗄️ Configuração do Banco de Dados

## Opção 1: PostgreSQL Local (Windows/Mac/Linux)

### Windows

1. **Baixar PostgreSQL**
   - Acesse [postgresql.org/download/windows](https://www.postgresql.org/download/windows/)
   - Baixe a versão LTS mais recente

2. **Instalar PostgreSQL**
   - Execute o instalador
   - Configure a senha do usuário `postgres` (guarde bem!)
   - Deixe a porta como 5432 (padrão)

3. **Criar Banco de Dados**
   - Abra pgAdmin (incluído na instalação)
   - Clique com botão direito em "Databases" → "Create" → "Database"
   - Nome: `automacao_pptx`
   - Clique em "Save"

4. **Configurar .env**
   ```env
   DATABASE_URL="postgresql://postgres:sua_senha@localhost:5432/automacao_pptx"
   ```

### Mac

1. **Instalar via Homebrew**
   ```bash
   brew install postgresql@15
   brew services start postgresql@15
   ```

2. **Criar Banco de Dados**
   ```bash
   createdb automacao_pptx
   ```

3. **Configurar .env**
   ```env
   DATABASE_URL="postgresql://localhost:5432/automacao_pptx"
   ```

### Linux (Ubuntu/Debian)

1. **Instalar PostgreSQL**
   ```bash
   sudo apt-get update
   sudo apt-get install postgresql postgresql-contrib
   ```

2. **Criar Banco de Dados**
   ```bash
   sudo -u postgres createdb automacao_pptx
   ```

3. **Configurar .env**
   ```env
   DATABASE_URL="postgresql://postgres@localhost:5432/automacao_pptx"
   ```

---

## Opção 2: Prisma Postgres (Recomendado para Começar)

A forma mais fácil e rápida para começar. Nenhuma instalação local necessária!

### 1. Fazer Login ou Criar Conta

```bash
npx prisma-platform-login
```

Isso abrirá um navegador para você fazer login/criar conta em `https://console.prisma.io`.

### 2. Criar um Banco Prisma Postgres

```bash
npx prisma-postgres-create-database --name automacao_pptx
```

Escolha uma região próxima a você (ex: us-east-1 ou eu-west-3).

### 3. A Connection String será automaticamente copiada

O sistema irá copiar automaticamente a string de conexão para seu `.env`.

### 4. Executar Migrations

```bash
npm run db:migrate
```

---

## Opção 3: Supabase (PostgreSQL Gerenciado)

[Supabase](https://supabase.com) oferece um PostgreSQL gratuito na nuvem.

### 1. Criar Conta no Supabase
- Acesse [supabase.com](https://supabase.com)
- Clique em "Start your project"
- Crie uma conta com GitHub ou email

### 2. Criar Novo Projeto
- Clique em "New Project"
- Nome: `automacao-pptx`
- Configure a senha do banco
- Escolha a região mais próxima
- Aguarde a criação (leva alguns minutos)

### 3. Obter Connection String
- Clique no projeto criado
- Vá para "Settings" → "Database"
- Copie a connection string em "Connection pooling"
- Escolha a opção "URI" (mais fácil)

### 4. Configurar .env
```env
DATABASE_URL="postgresql://postgres.xxxxx:password@db.xxxxx.supabase.co:5432/postgres?schema=public&sslmode=require"
```

### 5. Executar Migrations
```bash
npm run db:migrate
```

---

## Opção 4: Amazon RDS

Para ambientes de produção ou staging.

### 1. Criar Instância RDS
- Acesse AWS Console
- Vá para RDS → Create Database
- Engine: PostgreSQL
- Template: Free tier
- Configure credenciais
- Deixe públeca para desenvolvimento (não para produção!)

### 2. Configurar .env
```env
DATABASE_URL="postgresql://admin:password@your-rds-instance.rds.amazonaws.com:5432/automacao_pptx"
```

### 3. Executar Migrations
```bash
npm run db:migrate
```

---

## Verificar a Conexão

Após configurar o `.env`, execute:

```bash
npx prisma db push
```

Você verá uma mensagem como:
```
✓ Database synced, created 5 tables
```

Se houver erro, verifique:
1. Se o bank está rodando
2. Se a URL do banco está correta
3. Se você consegue conectar manualmente:

```bash
psql postgresql://usuario:senha@localhost:5432/automacao_pptx
```

---

## Próximas Etapas

Após configurar o banco de dados com sucesso:

1. **Executar migrations**
   ```bash
   npm run db:migrate
   ```

2. **Iniciar servidor**
   ```bash
   npm run dev
   ```

3. **Acessar a aplicação**
   - Abra `http://localhost:3000` no navegador
   - Faça upload de um arquivo Excel para testar!

---

## Troubleshooting

### Erro: "Can't reach database server"
- Verifique se o PostgreSQL está rodando
- Verifique os dados de conexão no `.env`

### Erro: "role 'postgres' does not exist"
- Use `sudo -u postgres psql` no terminal primeiro
- Crie um novo role: `CREATE USER seu_usuario WITH PASSWORD 'senha';`

### Erro: "Permission denied"
- Pode ser necessário resetar o banco:
  ```bash
  npm run db:reset
  ```
  (Isso apagará todos os dados - use apenas para desenvolvimento)

### Erro ao conectar no Supabase/Prisma Postgres
- Verifique se a URL está copiada corretamente
- Certifique-se de que a instância está ativa
- Tente reconectar e copiar novamente