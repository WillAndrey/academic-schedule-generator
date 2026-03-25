# 🎓 Automação de Calendários Acadêmicos

Sistema web que automatiza a criação de slides de calendários acadêmicos a partir de dados em planilhas Excel.

## 🚀 Características

- ✅ Upload de arquivos Excel com validação automática
- ✅ Processamento inteligente de dados com suporte a variações de nomes de colunas
- ✅ Geração automática de calendários em imagem (PNG)
- ✅ Interface amigável com drag-and-drop
- ✅ Visualização de calendários gerados
- ✅ Download de imagens para uso em apresentações
- ✅ Suporte para múltiplos cursos e disciplinas

## 🛠️ Stack Tecnológico

- **Frontend**: Next.js 14 (App Router), React, TypeScript, Tailwind CSS
- **Backend**: API Routes do Next.js
- **Banco de dados**: PostgreSQL com Prisma ORM
- **Processamento de Excel**: XLSX (SheetJS)
- **Geração de imagem**: Puppeteer

## 📋 Pré-requisitos

- Node.js 18+ 
- PostgreSQL 12+
- npm ou yarn

## 🔧 Instalação e Setup

### 1. Clonar o repositório
```bash
git clone <repository-url>
cd automacao-pptx
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Configurar banco de dados
Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/automacao_pptx"
```

### 4. Executar migrations
```bash
npm run db:migrate
```

Isso irá criar as tabelas no banco de dados.

### 5. Iniciar servidor de desenvolvimento
```bash
npm run dev
```

Acesse `http://localhost:3000` no navegador.

## 📊 Formato do Excel

O arquivo Excel deve ter as seguintes colunas (mínimo obrigatório):

| Coluna | Variações Aceitas | Tipo | Obrigatório |
|--------|------------------|------|------------|
| Curso | Course, Nome do Curso | String | ✅ |
| Disciplina | Discipline, Nome da Disciplina | String | ✅ |
| Data | Date, Data do Evento | String (DD/MM/YYYY ou YYYY-MM-DD) | ✅ |
| Descrição | Description, Evento | String | ✅ |
| Tipo | Type, Tipo de Evento | String (aula, prova, entrega, feriado) | ❌ |

### Exemplo de formato:

```
Curso                  | Disciplina                | Data       | Descrição           | Tipo
Engenharia de Software | Arquitetura de Redes     | 01/04/2026 | Aula 1              | aula
Engenharia de Software | Arquitetura de Redes     | 15/04/2026 | Primeira Prova      | prova
Engenharia de Software | Banco de Dados Aplicado  | 03/04/2026 | Introdução ao BD    | aula
```

## 📖 Como Usar

### 1. **Preparar arquivo Excel**
   - Crie um arquivo Excel com os dados dos cursos e disciplinas
   - Garanta que as colunas existam e tenham nomes reconhecidos pelo sistema

### 2. **Upload**
   - Acesse a página inicial do sistema
   - Clique na área de upload ou arraste o arquivo Excel
   - Clique em "Enviar"

### 3. **Processamento**
   - O sistema valida os dados
   - Salva as informações no banco de dados
   - Gera automaticamente imagens dos calendários

### 4. **Download**
   - Na seção "Calendários Disponíveis", selecione o curso desejado
   - Visualize os calendários gerados
   - Baixe as imagens para usar em suas apresentações

## 📁 Estrutura do Projeto

```
automacao-pptx/
├── src/
│   ├── app/
│   │   ├── api/                  # API Routes
│   │   │   ├── upload/           # Processo de upload
│   │   │   ├── calendars/        # Obter calendários
│   │   │   └── courses/          # Listar cursos
│   │   ├── layout.tsx
│   │   ├── page.tsx              # Página principal
│   │   └── globals.css
│   ├── components/               # Componentes React
│   │   ├── UploadForm.tsx
│   │   ├── Calendar.tsx
│   │   └── CalendarsList.tsx
│   ├── services/                 # Serviços
│   │   ├── excelParser.ts        # Parsing do Excel
│   │   ├── databaseService.ts    # Operações DB
│   │   └── imageGenerator.ts     # Geração de imagens
│   ├── utils/
│   │   └── validation.ts         # Validações
│   └── lib/                      # Utilidades
├── prisma/
│   ├── schema.prisma             # Schema do banco
│   └── migrations/               # Histórico de migrations
├── public/
│   └── calendars/                # Calendários gerados
├── package.json
├── tsconfig.json
└── README.md
```

## 🗄️ Modelo de Dados

### Course (Curso)
- `id`: Identificador único
- `name`: Nome do curso (único)
- `disciplines`: Disciplinas do curso
- `uploads`: Uploads relacionados
- `createdAt`, `updatedAt`: Timestamps

### Discipline (Disciplina)
- `id`: Identificador único
- `name`: Nome da disciplina
- `courseId`: ID do curso
- `entries`: Eventos/datas da disciplina
- `calendarImage`: Imagem do calendário gerado
- `createdAt`, `updatedAt`: Timestamps

### CalendarEntry (Evento do Calendário)
- `id`: Identificador único
- `date`: Data do evento
- `description`: Descrição do evento
- `eventType`: Tipo de evento (aula, prova, entrega, feriado)
- `disciplineId`: ID da disciplina
- `createdAt`, `updatedAt`: Timestamps

### CalendarImage (Imagem do Calendário)
- `id`: Identificador único
- `discipline`: Disciplina relacionada
- `filename`: Nome do arquivo de imagem
- `filepath`: Caminho do arquivo
- `createdAt`, `updatedAt`: Timestamps

## 🐛 Troubleshooting

### Erro de conexão com banco de dados
- Verifique se PostgreSQL está rodando
- Confirme a `DATABASE_URL` no arquivo `.env`
- Execute `npm run db:migrate` para criar as tabelas

### Erro ao processar Excel
- Verifique o formato das datas (DD/MM/YYYY ou YYYY-MM-DD)
- Garanta que os nomes de colunas estão corretos
- Verifique se não há linhas vazias no arquivo

### Erro ao gerar imagens
- Verifique se Puppeteer foi instalado corretamente
- Em alguns sistemas, pode ser necessário instalar dependências do Chrome/Chromium
- No Linux: `sudo apt-get install chromium-browser`

## 📝 Scripts Disponíveis

```bash
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Compila para produção
npm run start        # Inicia servidor de produção
npm run lint         # Executa linter
npm run db:migrate   # Cria/atualiza banco de dados
npm run db:push      # Sincroniza schema com banco (desenvolvimento)
npm run db:generate  # Regenera Prisma Client
```

## 🚀 Deploy

### Usando Vercel
```bash
npm install -g vercel
vercel
```

### Usando Docker
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

## 📄 Licença

MIT

## 👨‍💻 Autor

Sistema desenvolvido para automação de calendários acadêmicos em instituições de ensino a distância (EAD).

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor, abra uma issue ou envie um pull request.