@echo off
REM Script para configurar e iniciar o projeto

echo.
echo 🔧 Automacao de Calendarios Academicos - Setup
echo ===============================================

REM Verificar se Node.js está instalado
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js nao esta instalado. Por favor, instale Node.js 18+
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✓ Node.js encontrado: %NODE_VERSION%

REM Instalar dependências
echo.
echo 📦 Instalando dependencias...
call npm install

REM Verificar se arquivo .env existe
if not exist .env (
    echo.
    echo ⚠️  Arquivo .env nao encontrado!
    echo Por favor, crie o arquivo .env com o seguinte conteudo:
    echo.
    echo DATABASE_URL="postgresql://usuario:senha@localhost:5432/automacao_pptx"
    echo.
    echo Ou use um banco online ^(recomendado para desenvolvimento^):
    echo DATABASE_URL="postgresql://user:password@host:port/database"
    echo.
    pause
    exit /b 1
)

echo ✓ Arquivo .env encontrado

REM Gerar Prisma Client
echo.
echo 🔐 Gerando Prisma Client...
call npx prisma generate

REM Executar migrations
echo.
echo 🗄️  Executando migrations do banco de dados...
call npx prisma migrate dev --name init

echo.
echo ✅ Setup concluido com sucesso!
echo.
echo Para iniciar o servidor, execute:
echo   npm run dev
echo.
echo A aplicacao estara disponivel em http://localhost:3000
pause