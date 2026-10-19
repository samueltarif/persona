# Como usar o PersonaDoc no Windows

## 1. Criar o Supabase (uma vez)

1. Entre em https://supabase.com e crie um **projeto novo** (ex.: `personadoc`). Guarde a senha do banco.
2. Vá em **SQL Editor → New query**, cole todo o conteúdo de `supabase/migrations/20261019_001_personas.sql` e clique em **Run**. Deve aparecer "Success".
3. Vá em **Authentication → Sign In / Providers** e **desligue "Allow new users to sign up"**. Assim ninguém se cadastra sozinho.
4. Vá em **Authentication → Users → Add user → Create new user**, informe seu e-mail e uma senha e marque **Auto Confirm User**.
5. Vá em **Project Settings → API** (ou **API Keys**) e copie a **Project URL** e a chave **anon / publishable**. **Nunca** use a `service_role`.

## 2. Configurar e rodar o projeto

No PowerShell, dentro de `D:\personadoc`:

```
copy .env.example .env
notepad .env
```

Cole a URL em `SUPABASE_URL` e a chave publicável em `SUPABASE_KEY`. Salve e feche.

```
npm install
npm run dev
```

Abra **http://localhost:3000**, entre com o e-mail e a senha criados no passo 1.4.

## 3. Usar

- **Nova persona:** informe o cliente e o nicho; o editor abre na hora.
- **Preencher:** use o menu da esquerda. Tudo é salvo sozinho ("Salvo na nuvem" no topo).
- **Buscar perguntas:** encontra qualquer pergunta e leva até ela.
- **Status:** deixe em "Hipótese" até confirmar com o cliente ou com dados reais; depois marque "Validada".
- **Exportar PDF:** abre a impressão; escolha **Salvar como PDF**.
- **Backup JSON:** baixa um arquivo da persona; na lista, **Importar JSON** cria uma cópia nova (nunca sobrescreve).
- **Modelo para outro cliente do mesmo nicho:** na lista, **Duplicar** e depois edite.

## 4. Persona pronta da A Portamóvel

Na lista, clique em **Importar JSON** e escolha `docs\exemplos\persona-a-portamovel.json`. Ela vem com a pesquisa feita para a campanha (síndico, zelador, administradora, emergência x contrato). Está como **Hipótese**: revise com o cliente antes de validar.

## 5. Publicar na internet (opcional)

Pode subir na Vercel como o site da Portamóvel: importe a pasta, defina `SUPABASE_URL` e `SUPABASE_KEY` nas variáveis de ambiente e, no Supabase, em **Authentication → URL Configuration**, adicione o endereço publicado em **Site URL** e **Redirect URLs**.

## Problemas comuns

| Mensagem | O que fazer |
|---|---|
| "Não foi possível carregar as personas. A tabela foi criada no Supabase?" | Rode o SQL do passo 1.2 no projeto certo |
| "E-mail ou senha inválidos." | Confira o usuário em Authentication → Users e se está confirmado |
| Erro no `npm install` com "edgesOut" ou "peer" | Rode `npm install --legacy-peer-deps` |
| "Erro ao salvar" no topo | Internet caiu ou a sessão expirou: recarregue a página e entre de novo |
