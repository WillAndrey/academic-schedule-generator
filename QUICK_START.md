# 🚀 Início Rápido

## Resumo do que foi implementado

✅ **Sistema completo** de automação para calendários acadêmicos
✅ **Interface web** moderna com drag-and-drop
✅ **Processamento de Excel** com validação automática
✅ **Geração de imagens** de calendários em PNG de alta qualidade
✅ **Banco de dados** com Prisma e PostgreSQL
✅ **API completa** para upload, processamento e download

---

## 5 Passos para Começar

### 1️⃣ Configurar o Banco de Dados (5 min)

#### Opção A: Mais Fácil - Usar Neon (PostgreSQL Gratuito)
```bash
# 1. Vá para https://neon.tech
# 2. Crie uma conta (grátis)
# 3. Copie a connection string
# 4. Cole no arquivo .env
```

#### Opção B: Usar Supabase (PostgreSQL Gratuito)
```bash
# 1. Vá para https://supabase.com
# 2. Crie um projeto
# 3. Copie a connection string
# 4. Cole no arquivo .env
```

#### Opção C: PostgreSQL Local
```bash
# Veja guia completo em DATABASE_SETUP.md
```

### 2️⃣ Atualizar o Arquivo .env

Abra `c:\Users\013190502\Documents\AutomacaoPPTX\.env` e atualize:

```env
DATABASE_URL="sua_url_de_conexao_aqui"
```

Exemplo para Neon:
```env
DATABASE_URL="postgresql://neon_user:password@ep-xxxxx.neon.tech/automacao_pptx"
```

### 3️⃣ Executar Migrations

No terminal (dentro da pasta do projeto):
```bash
npx prisma migrate dev --name init
```

Isso criará todas as tabelas no banco de dados automaticamente.

### 4️⃣ Iniciar o Servidor

```bash
npm run dev
```

Você verá:
```
✓ Ready in 2.6s
- Local:        http://localhost:3000
```

### 5️⃣ Abrir no Navegador

Acesse: **http://localhost:3000**

---

## Testando o Sistema

### 1. Preparar um arquivo Excel de teste

Crie um arquivo `teste.xlsx` com as seguintes informações:

| Curso | Disciplina | Data | Descrição | Tipo |
|-------|-----------|------|-----------|------|
| Engenharia de Software | Arquitetura de Redes | 01/04/2026 | Aula Inaugural | aula |
| Engenharia de Software | Arquitetura de Redes | 15/04/2026 | Primeira Prova | prova |
| Engenharia de Software | Banco de Dados Aplicado | 03/04/2026 | Introdução ao BD | aula |
| Engenharia de Software | Banco de Dados Aplicado | 20/04/2026 | Entrega de Projeto | entrega |

### 2. Fazer Upload

1. Abra http://localhost:3000
2. Arraste o arquivo ou clique para selecionar
3. Clique em "Enviar"
4. Aguarde o processamento

### 3. Visualizar Resultados

- O sistema criará calendários automaticamente
- Você verá os cursos na seção "Calendários Disponíveis"
- Clique em um curso para ver as disciplinas
- Baixe as imagens dos calendários

---

## Estrutura do Projeto

```
📁 AutomacaoPPTX/
├── 📄 package.json              ← Dependências
├── 📄 .env                       ← Variáveis de ambiente (EDITAR!)
├── 📄 README.md                  ← Documentação completa
├── 📄 DATABASE_SETUP.md          ← Guia de configuração de BD
├── 📁 src/
│   ├── 📁 app/
│   │   ├── 📁 api/              ← APIs (upload, calendars, courses)
│   │   ├── 📄 page.tsx          ← Página principal
│   │   └── 📄 layout.tsx        ← Layout global
│   ├── 📁 components/            ← Componentes React
│   ├── 📁 services/              ← Lógica de negócio
│   ├── 📁 utils/                 ← Funções utilitárias
│   └── 📁 lib/                   ← Bibliotecas
├── 📁 prisma/
│   ├── 📄 schema.prisma         ← Modelo de dados
│   └── 📁 migrations/            ← Histórico de mudanças
├── 📁 public/
│   └── 📁 calendars/             ← Imagens geradas
``` 

---

## Próximos Passos (Opcional)

### Customizar Layout do Calendário
Edite o arquivo: `src/services/imageGenerator.ts`
- Cores, fontes, tamanhos, espaçamento
- Adicione logo da sua instituição
- Mude estilos personalizados

### Adicionar Feriados Fixos
Edite: `src/services/imageGenerator.ts` (função `generateCalendarHTML`)
- Adicione datas de feriados
- Marque-os com cor especial

### Exportar em Lote (ZIP)
Crie endpoint em: `src/app/api/export/route.ts`
- Crie um arquivo ZIP com todos os calendários
- Permita download de uma vez

### Deploy em Produção
Opções:
- **Vercel** (mais fácil, gratuito para Next.js)
- **Railway** (PostgreSQL incluído)
- **Render** (integração simples)
- **Your own server** (Docker + PM2)

---

## Comandos Importantes

```bash
# Desenvolvimento
npm run dev              # Inicia servidor local

# Banco de Dados
npm run db:migrate      # Cria/atualiza tabelas
npm run db:reset        # ⚠️ Apaga e recria (desenvolvimento só)
npm run db:push         # Sincroniza (modo rápido)

# Build
npm run build           # Compila para produção
npm start              # Inicia servidor em produção

# Qualidade de Código
npm run lint           # Verifica code style
```

---

## Troubleshooting Rápido

### ❌ "Can't reach database server"
**Solução**: Verifique se a DATABASE_URL está correta no `.env`

### ❌ "Module not found"
**Solução**: Execute `npm install` novamente

### ❌ "Port 3000 is already in use"
**Solução**: Mude a porta:
```bash
npm run dev -- -p 3001
```

### ❌ "Images not generating"
**Solução**: Verifique se Puppeteer está instalado:
```bash
npm install puppeteer --save
```

---

## Suporte

📚 **Documentação Completa**: `README.md`
🗄️ **Setup de Banco de Dados**: `DATABASE_SETUP.md`
💬 **Dúvidas?**: Consulte os comentários no código

---

## 🎉 Pronto para Usar!

Seu sistema está **100% funcional** e pronto para produção.

Bom trabalho! 🚀