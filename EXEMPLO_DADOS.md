# Exemplo de Dados para Teste

Este arquivo serve como referência para estruturar seu arquivo Excel antes de fazer upload.

## Formato do Excel (exemplo_cronograma.xlsx)

Copie estes dados em um arquivo Excel com o nome `exemplo_cronograma.xlsx`:

### Linha 1 (Headers)
```
Curso | Disciplina | Data | Descrição | Tipo
```

### Dados de Exemplo

| Curso | Disciplina | Data | Descrição | Tipo |
|-------|-----------|------|-----------|------|
| Engenharia de Software | Arquitetura de Redes | 01/04/2026 | Aula Inaugural - Conceitos Básicos | aula |
| Engenharia de Software | Arquitetura de Redes | 08/04/2026 | Aula: Topologias de Rede | aula |
| Engenharia de Software | Arquitetura de Redes | 15/04/2026 | Primeira Prova | prova |
| Engenharia de Software | Arquitetura de Redes | 22/04/2026 | Aula: Protocolo TCP/IP | aula |
| Engenharia de Software | Arquitetura de Redes | 29/04/2026 | Entrega do Projeto 1 | entrega |
| Engenharia de Software | Banco de Dados Aplicado | 03/04/2026 | Aula Inaugural - Introdução BD | aula |
| Engenharia de Software | Banco de Dados Aplicado | 10/04/2026 | Aula: Modelo Relacional | aula |
| Engenharia de Software | Banco de Dados Aplicado | 17/04/2026 | Aula: SQL Básico | aula |
| Engenharia de Software | Banco de Dados Aplicado | 24/04/2026 | Segunda Prova | prova |
| Engenharia de Software | Banco de Dados Aplicado | 30/04/2026 | Entrega do Projeto Final | entrega |
| Engenharia de Software | Banco de Dados Aplicado | 01/05/2026 | Feriado Nacional | feriado |
| Programação Web | Frontend Avançado | 02/04/2026 | Aula 1: React Hooks | aula |
| Programação Web | Frontend Avançado | 09/04/2026 | Aula 2: State Management | aula |
| Programação Web | Frontend Avançado | 16/04/2026 | Avaliação 1 | prova |
| Programação Web | Backend com Node.js | 04/04/2026 | Aula 1: Express Basics | aula |
| Programação Web | Backend com Node.js | 11/04/2026 | Aula 2: Express Avançado | aula |
| Programação Web | Backend com Node.js | 18/04/2026 | Avaliação 1 | prova |
| Programação Web | Backend com Node.js | 25/04/2026 | Entrega Projeto Final | entrega |

---

## Variações de Nomes de Colunas Aceitas

O sistema é flexível e aceita diferentes nomes de colunas:

### Coluna: Curso
Aceita: `Curso`, `Course`, `Nome do Curso`, `Cursos`

### Coluna: Disciplina  
Aceita: `Disciplina`, `Discipline`, `Nome da Disciplina`, `Disciplinas`

### Coluna: Data
Aceita: `Data`, `Date`, `Data do Evento`, `Data da Aula`

### Coluna: Descrição
Aceita: `Descrição`, `Description`, `Evento`, `Event`, `Aula`

### Coluna: Tipo (Opcional)
Aceita: `Tipo`, `Type`, `Tipo de Evento`, `Categoria`

Valores válidos para Tipo: `aula`, `prova`, `entrega`, `feriado`, `evento`

---

## Instruções para Criar seu Próprio Arquivo

### 1. Abra Excel ou Google Sheets

### 2. Crie uma Tabela com Headers
```
Curso | Disciplina | Data | Descrição | Tipo (opcional)
```

### 3. Preencha com seus dados
- **Datas**: Use formato `DD/MM/YYYY` ou `YYYY-MM-DD`
- **Tipo**: Use valores: `aula`, `prova`, `entrega`, `feriado`
- Deixe em branco ou omita a coluna "Tipo" se não aplicável

### 4. Salve como Excel
- Extensão: `.xlsx` (obrigatório!)
- Não use `.xls` ou outros formatos

### 5. Faça Upload
- Vá para http://localhost:3000
- Arraste o arquivo ou clique para selecionar
- O sistema processará automaticamente

---

## O que Acontece após Upload

1. ✅ Sistema valida os dados
2. ✅ Salva no banco de dados
3. ✅ Gera imagens de calendários (PNG) automaticamente
4. ✅ Você pode visualizar e baixar na seção "Calendários Disponíveis"

---

## Para Usar em Produção

Quando tiver muitos dados:
- Coloque todos os dados em uma única aba do Excel
- Garanta que não há linhas vazias no meio
- Remova formatações desnecessárias (cores, negrito, etc)
- Apenas os dados serão processados