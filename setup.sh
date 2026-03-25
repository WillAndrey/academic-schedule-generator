#!/bin/bash

# Script para configurar e iniciar o projeto

echo "🔧 Automação de Calendários Acadêmicos - Setup"
echo "===============================================\n"

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não está instalado. Por favor, instale Node.js 18+"
    exit 1
fi

echo "✓ Node.js encontrado: $(node --version)"

# Instalar dependências
echo "\n📦 Instalando dependências..."
npm install

# Verificar se arquivo .env existe
if [ ! -f .env ]; then
    echo "\n⚠️  Arquivo .env não encontrado!"
    echo "Por favor, crie o arquivo .env com o seguinte conteúdo:"
    echo ""
    echo "DATABASE_URL=\"postgresql://usuario:senha@localhost:5432/automacao_pptx\""
    echo ""
    echo "Ou use um banco online:"
    echo "DATABASE_URL=\"postgresql://user:password@host:port/database\""
    exit 1
fi

echo "✓ Arquivo .env encontrado"

# Gerar Prisma Client
echo "\n🔐 Gerando Prisma Client..."
npx prisma generate

# Executar migrations
echo "\n🗄️  Executando migrations do banco de dados..."
npx prisma migrate dev --name init

echo "\n✅ Setup concluído com sucesso!"
echo "\nPara iniciar o servidor, execute:"
echo "  npm run dev"
echo ""
echo "A aplicação estará disponível em http://localhost:3000"