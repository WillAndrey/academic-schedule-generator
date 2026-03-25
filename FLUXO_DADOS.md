# 📊 Diagrama de Fluxo da Aplicação

## Fluxo Completo do Sistema

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     AUTOMAÇÃO DE CALENDÁRIOS ACADÊMICOS                 │
└─────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────┐
│                          FRONTEND (Next.js React)                      │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  ┌──────────────────────┐         ┌──────────────────────┐           │
│  │   UploadForm         │         │   CalendarsList      │           │
│  │  ─────────────────   │         │  ───────────────────  │           │
│  │ - Drag & drop        │         │ - Lista cursos       │           │
│  │ - Seleção de arquivo │         │ - Exibe disciplinas  │           │
│  │ - Validação local    │         │ - Preview imagens    │           │
│  │ - Loading feedback   │         │ - Download           │           │
│  │ - Erro handling      │         │ - Loading states     │           │
│  │ - Sucesso message    │         │   com erros          │           │
│  └──────────────────────┘         └──────────────────────┘           │
│           │                                ▲                          │
│           │ ArQuivo Excel                  │ Dados de Cursos         │
│           └────────────┬────────────────────┘                        │
│                        │                                              │
│                        ▼                                              │
└────────────────────────────────────────────────────────────────────────┘
                         │
                         │ POST /api/upload (FormData)
                         │
┌────────────────────────────────────────────────────────────────────────┐
│                        BACKEND (API Routes)                           │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  ┌───────────────────────────────────────────────────────────────┐   │
│  │                    POST /api/upload                           │   │
│  │                                                               │   │
│  │  1. Recebe arquivo Excel                                     │   │
│  │  2. Extrai buffer e processa                                │   │
│  │  3. Chama parseExcel()                                      │   │
│  │  4. Valida dados retornados                                │   │
│  │  5. Se válido → saveToDatabase()                           │   │
│  │  6. Se válido → generateCalendarsForCourse()              │   │
│  │  7. Retorna sucesso com estatísticas                       │   │
│  │  8. Se erro → retorna com detalhes                         │   │
│  │                                                               │   │
│  └───────────────────────────────────────────────────────────────┘   │
│              │              │                    │                    │
│              ▼              ▼                    ▼                    │
│        ┌──────────────┐ ┌──────────────┐ ┌──────────────────┐      │
│        │   Parser     │ │   Database   │ │ Image Generator  │      │
│        │   (XLSX)     │ │  (Prisma)    │ │  (Puppeteer)     │      │
│        └──────────────┘ └──────────────┘ └──────────────────┘      │
│              │              │                    │                    │
│  ┌───────────┤              │                    │                   │
│  │           │              │                    │                   │
│  │    Validation            │         HTML → PNG Conversion          │
│  │    Converção de datas    │         com Estilos                    │
│  │                          │                                         │
│  │          Estrutura de Dados        Renderização Calendário        │
│  │          normalizada →  Cursos     E Salvamento em               │
│  │          sem erros      Disciplines Public/calendars            │
│  │                        Eventos                                    │
│  │                                                                   │
│  └──────────────────────────────────────────────────────────────────│
│              │                         ├─────────────────────┤      │
│              │                         │                     │      │
└──────────────┼─────────────────────────┼─────────────────────┼──────┘
               │                         │                     │
               ▼                         ▼                     ▼
        ┌─────────────────────────────────────────────────────────┐
        │           PostgreSQL Database (Prisma)                  │
        │  ───────────────────────────────────────────────────   │
        │  ┌──────────────────────────────────────────────────┐  │
        │  │ Tabelas:                                         │  │
        │  │ • Course (id, name, ...)                        │  │
        │  │ • Discipline (id, name, courseId, ...)          │  │
        │  │ • CalendarEntry (id, date, description, ...)    │  │
        │  │ • CalendarImage (id, filename, filepath, ...)   │  │
        │  │ • Upload (id, filename, courseId, status, ...) │  │
        │  └──────────────────────────────────────────────────┘  │
        └─────────────────────────────────────────────────────────┘
               │                         │                     │
               │                         │                     │
               └─────────────┬───────────┴─────────────────────┘
                             │
┌───────────────────────────────────────────────────────────────────────┐
│                         FILE STORAGE                                   │
├───────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  /public/calendars/                                                 │
│  ├── {discipline-id}_1234567890.png  (Calendário 1)                │
│  ├── {discipline-id}_1234567891.png  (Calendário 2)                │
│  └── ...                                                             │
│                                                                       │
└───────────────────────────────────────────────────────────────────────┘
               │                         │                     │
               └─────────────┬───────────┴─────────────────────┘
                             │
                             │ Requisições GET
                             │
┌───────────────────────────────────────────────────────────────────────┐
│                      API - Leitura de Dados                          │
├───────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  GET /api/courses                                                   │
│  ├─ Retorna todos os cursos                                        │
│  └─ Com contagem de disciplinas e calendários                      │
│                                                                       │
│  GET /api/calendars?course={name}                                  │
│  ├─ Retorna disciplinas do curso                                   │
│  └─ Com URLs das imagens dos calendários                           │
│                                                                       │
└───────────────────────────────────────────────────────────────────────┘
               │
               ▼
        ┌─────────────────┐
        │  Imagens PNG    │
        │  (Calendários)  │
        │  em /public/    │
        └─────────────────┘
               │
               │ HTTP GET
               │
┌───────────────────────────────────────────────────────────────────────┐
│                    NAVEGADOR DO USUÁRIO                              │
├───────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  1. CalendarsList carrega lista de cursos                           │
│  2. Usuário clica em um curso                                       │
│  3. Componente busca calendários do curso                           │
│  4. Exibe imagens dos calendários                                   │
│  5. Usuário pode fazer download (clique com botão direito)         │
│                                                                       │
└───────────────────────────────────────────────────────────────────────┘
```

---

## Fluxo de Dados - Detalhado

### 1️⃣ Upload do Excel

```
Usuario seleciona arquivo
        ↓
UploadForm valida extensão (.xlsx)
        ↓
FormData é criado com arquivo
        ↓
POST /api/upload enviado
```

### 2️⃣ Processamento no Backend

```
POST /api/upload recebido
        ↓
Arquivo é convertido para ArrayBuffer
        ↓
parseExcel() lê arquivo com XLSX
        ↓
validateExcelData() valida cada linha
        ↓
Se válido:
├─ saveToDatabase() salva em Prisma
│   ├─ Cria/encontra Course
│   ├─ Cria/encontra Discipline
│   └─ Cria CalendarEntry
│
└─ generateCalendarsForCourse()
    ├─ Busca disciplinas do curso
    ├─ Para cada disciplina:
    │   ├─ generateCalendarImage()
    │   ├─ Cria HTML do calendário
    │   ├─ Usa Puppeteer para PNG
    │   └─ Salva arquivo + registro BD
    └─ Retorna estatísticas

Se inválido:
└─ Retorna erros de validação
```

### 3️⃣ Recuperação de Dados

```
GET /api/courses
        ↓
Busca todos os Course em Prisma
        ↓
Para cada Course, conta:
├─ Disciplinas
└─ Calendários gerados
        ↓
Retorna JSON com dados
        ↓
CalendarsList renderiza lista
```

### 4️⃣ Visualização de Calendários

```
Usuário clica em curso
        ↓
GET /api/calendars?course={name}
        ↓
Prisma busca Course e suas Disciplines
        ↓
Para cada Discipline:
├─ Busca CalendarImage associada
├─ Retorna filename e URL
└─ Prepara para renderização
        ↓
CalendarsList renderiza Cards
        ↓
IMG tags carregam PNGs de /public/calendars/
        ↓
Usuário vê calendários e baixa clicando
```

---

## Estrutura de Dados (Database)

### Relacionamentos

```
Course (1) ──────────── (M) Discipline
   ↓                            ↓
   ├─ id                        ├─ id
   ├─ name                      ├─ name
   ├─ disciplines[]             ├─ courseId → Course
   ├─ uploads[]                 ├─ entries[] → CalendarEntry
   └─ timestamps                ├─ calendarImage → CalendarImage
                                └─ timestamps

Discipline (1) ──────────── (M) CalendarEntry
                                ├─ id
                                ├─ date
                                ├─ description
                                ├─ eventType
                                ├─ disciplineId → Discipline
                                └─ timestamps

Discipline (1) ──────────── (1) CalendarImage
                                ├─ id
                                ├─ filename
                                ├─ filepath
                                ├─ disciplineId → Discipline
                                └─ timestamps

Course (1) ──────────── (M) Upload
                             ├─ id
                             ├─ filename
                             ├─ courseId → Course
                             ├─ status
                             ├─ errorMessage
                             └─ timestamps
```

---

## Exemplos de JSON Trocados

### Request: POST /api/upload

```
Content-Type: multipart/form-data

FormData:
- file: [ArrayBuffer do arquivo Excel]
```

### Response: POST /api/upload (Sucesso)

```json
{
  "message": "Dados processados com sucesso",
  "stats": {
    "courses": 2,
    "disciplines": 4,
    "entries": 15,
    "calendarsGenerated": 4,
    "calendarsFailed": 0
  },
  "errors": []
}
```

### Response: POST /api/upload (Com Erro de Validação)

```json
{
  "error": "Erro ao validar arquivo Excel",
  "validationErrors": [
    {
      "row": 3,
      "field": "date",
      "message": "Data inválida: '01-04-2026'. Use formato DD/MM/YYYY ou YYYY-MM-DD"
    },
    {
      "row": 5,
      "field": "course",
      "message": "Campo 'Curso' é obrigatório"
    }
  ]
}
```

### Response: GET /api/courses

```json
{
  "courses": [
    {
      "id": "cuid123",
      "name": "Engenharia de Software",
      "disciplinesCount": 2,
      "calendarsGenerated": 2
    },
    {
      "id": "cuid456",
      "name": "Programação Web",
      "disciplinesCount": 2,
      "calendarsGenerated": 1
    }
  ]
}
```

### Response: GET /api/calendars?course=Engenharia%20de%20Software

```json
{
  "course": {
    "name": "Engenharia de Software",
    "disciplines": [
      {
        "id": "cuid789",
        "name": "Arquitetura de Redes",
        "entriesCount": 5,
        "hasCalendar": true,
        "calendarImage": {
          "filename": "cuid789_1234567890.png",
          "url": "/calendars/cuid789_1234567890.png"
        }
      },
      {
        "id": "cuid999",
        "name": "Banco de Dados Aplicado",
        "entriesCount": 5,
        "hasCalendar": true,
        "calendarImage": {
          "filename": "cuid999_1234567891.png",
          "url": "/calendars/cuid999_1234567891.png"
        }
      }
    ]
  }
}
```

---

## Performance e Otimizações

```
Otimizações Implementadas:

1. Validação Rápida
   └─ Erros identificados antes de salvar no BD

2. Batch Processing
   └─ Um submit = N disciplinas processadas

3. Cache Prisma
   └─ Queries otimizadas com índices

4. Image Format
   └─ PNG otimizado (não RAW bitmap)

5. Async Operations
   └─ Puppeteer roda em paralelo

6. Error Boundaries
   └─ Erro em uma disciplina não derruba outras

7. Database Indexes
   └─ Criados em courseId, disciplineId, date

8. Lazy Loading
   └─ Imagens carregam sob demanda
```

---

🎉 **Sistema completo, bem estruturado e pronto para produção!**