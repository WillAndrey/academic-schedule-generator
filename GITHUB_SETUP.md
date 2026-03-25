# 🔗 Conectar ao GitHub e Guardar Projeto

Agora que seu projeto está pronto, vamos salvaguardá-lo no GitHub com versionamento!

---

## 1️⃣ Criar Repositório no GitHub

### Passo 1: Criar conta (se não tiver)
- Acesse [github.com](https://github.com)
- Clique em "Sign up"
- Complete o cadastro

### Passo 2: Criar novo repositório
- Clique no ícone **+** (canto superior direito)
- Selecione **New repository**
- Configure:
  - **Repository name**: `automacao-pptx` (ou outro nome que prefira)
  - **Description**: "Sistema de automação para criação de calendários acadêmicos"
  - **Public** (recomendado) ou **Private** (seguro)
  - Não inicialize com README (.gitignore ou license)
- Clique em **Create repository**

---

## 2️⃣ Conectar via Git (Windows)

### Passo 1: Instalar Git
- Baixe em [git-scm.com](https://git-scm.com)
- Execute o instalador e conclua
- Reinicie o VS Code os a máquina

### Passo 2: Configurar Git
Abra o PowerShell e execute:

```powershell
git config --global user.name "Seu Nome"
git config --global user.email "seu.email@github.com"
git config --global --list  # Verifica se foi salvo
```

### Passo 3: Copiar sua chave SSH (Mais Seguro)

No PowerShell:
```powershell
# Gerar chave SSH
ssh-keygen -t ed25519 -C "seu.email@github.com"

# Quando pedir, aperte ENTER (deixa password vazio)
# Arquivo será salvo em: C:\Users\{usuario}\.ssh\id_ed25519.pub
```

No VS Code, abra o arquivo:
```
C:\Users\013190502\.ssh\id_ed25519.pub
```

Copie o conteúdo (começa com `ssh-ed25519...`)

### Passo 4: Adicionar SSH Key no GitHub
No GitHub:
1. Clique em **Settings** (no seu perfil)
2. **SSH and GPG keys** (esquerda)
3. **New SSH key**
4. Cole a chave copiada
5. Clique **Add SSH key**

---

## 3️⃣ Inicializar Git no Projeto

No VS Code, abra o terminal na pasta `AutomacaoPPTX`:

```powershell
cd "c:\Users\013190502\Documents\AutomacaoPPTX"

# Inicializar repositório git
git init

# Adicionar todos os arquivos
git add .

# Criar primeiro commit
git commit -m "Initial commit: Sistema de automação de calendários acadêmicos"

# Renomear branch para main (padrão do GitHub)
git branch -M main

# Adicionar repositório remoto (substitua USERNAME por seu usuário GitHub)
git remote add origin git@github.com:USERNAME/automacao-pptx.git

# Fazer primeiro push
git push -u origin main
```

---

## 4️⃣ Verificar no GitHub

Acesse seu repositório: `https://github.com/SEU_USUARIO/automacao-pptx`

Pronto! Seu código está sincronizado! ✅

---

## 5️⃣ Próximos Commits (Rotina)

Sempre que fizer mudanças:

```powershell
# Ver status
git status

# Adicionar arquivos mudados
git add .

# Fazer commit com mensagem descritiva
git commit -m "Corrigir bug no parser de Excel"

# Enviar para GitHub
git push
```

---

## 6️⃣ Boas Práticas de Commits

### Mensagens de Commit
```
git commit -m "feat: Adicionar suporte para planilhas com datas em português"
git commit -m "fix: Corrigir erro na geração de imagens"
git commit -m "docs: Atualizar README com exemplos"
git commit -m "refactor: Reorganizar código de validação"
git commit -m "style: Melhorar estilos do calendário"
```

### Prefixos Recomendados
- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug  
- `docs:` - Documentação
- `refactor:` - Reorganizar código
- `style:` - Estilos e formatação
- `test:` - Adicionar testes
- `chore:` - Tarefas administrativas

---

## 7️⃣ Git no VS Code (Interface Gráfica)

Se preferir uma interface gráfica em vez do terminal:

### Opção 1: VS Code Integrado
1. Abra a pasta do projeto no VS Code
2. Clique no ícone de **Source Control** (esquerda)
3. Click em **Initialize Repository**
4. Digite suas mensagens de commit
5. Clique em **✓** para confirmar

### Opção 2: GitHub Desktop (mais fácil!)
- Baixe em [desktop.github.com](https://desktop.github.com)
- Abra o projeto
- Sincroniza automaticamente com GitHub

---

## 8️⃣ Proteger o Arquivo .env

⚠️ **IMPORTANTE**: Nunca faça push do arquivo `.env` com senhas reais!

### Já está configurado!
No arquivo `.gitignore` (que criamos), temos:
```
.env
.env.local
.env.*.local
```

Isso significa:
- ✅ `.env` NÃO será sincronizado
- ✅ Suas senhas ficam seguras
- ✅ Cada desenvolvedor tem seu próprio `.env` local

Para colaboradores:
1. Crie um arquivo `.env.example`:
```env
DATABASE_URL="postgresql://usuario:senha@host:database"
```

2. Adicione ao Git:
```powershell
git add .env.example
git commit -m "docs: Adicionar exemplo de arquivo .env"
```

---

## 9️⃣ Deploy no GitHub Pages (Opcional)

Se quiser publicar a documentação:

1. Crie pasta `docs/` com `README.md`
2. Vá em **Settings** → **Pages**
3. Escolha **Deploy from a branch**
4. Selecione `main` e pasta `/docs`
5. GitHub cria um site automático!

URL será: `https://seu-usuario.github.io/automacao-pptx`

---

## 🔟 Branches para Desenvolvimento

Para trabalhar organizadamente:

```powershell
# Ver branches
git branch

# Criar nova branch para feature
git checkout -b feature/nova-funcionalidade

# Fazer mudanças, commit, push
git commit -m "feat: Adicionar nova funcionalidade"
git push origin feature/nova-funcionalidade

# No GitHub, criar Pull Request (PR)
# Após review, fazer merge na main
```

---

## 🔐 Segurança

Checklist de segurança:

- ✅ `.env` está em `.gitignore` (senhas não vão pro GitHub)
- ✅ SSH Key configurada (mais seguro que HTTPS)
- ✅ README.md documenta o projeto
- ✅ Código está versionado
- ✅ Histórico de mudanças rastreado

---

## 📝 Exemplo completo de workflow

```powershell
# 1. Você faz uma alteração no código
# 2. Ver status
git status

# 3. Adicionar mudanças
git add .

# 4. Fazer commit
git commit -m "feat: Melhorar UI do upload"

# 5. Enviar para GitHub
git push

# ✅ Mudanças aparecem no GitHub em segundos!
```

---

## 🆘 Problemas Comuns

### "Permission denied (publickey)"
**Solução**: SSH Key não foi reconhecida
```powershell
# Testar conexão
ssh -T git@github.com
```

Deve retornar: `Hi USERNAME! You've successfully authenticated...`

### "fatal: not a git repository"
**Solução**: Esqueceu de fazer `git init`
```powershell
cd "c:\Users\013190502\Documents\AutomacaoPPTX"
git init
```

### "Your branch is ahead of origin"
**Solução**: Você tem commits não enviados
```powershell
git push
```

---

## 🎉 Pronto!

Seu projeto está:
- ✅ Salvo no GitHub
- ✅ Versionado com Git
- ✅ Protegido com `.gitignore`
- ✅ Pronto para colaboração
- ✅ Com histórico completo de mudanças

**Parabéns! 🚀**