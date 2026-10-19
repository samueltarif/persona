# PersonaDoc

Ferramenta interna para criar **personas e briefings de Google Ads** para vários clientes, inspirada no PersonaDoc da aula (método CTR: Contexto, Tarefa e Regras). Mesma stack do site da Portamóvel: **Nuxt 4 + @nuxtjs/supabase + Tailwind + shadcn-vue (reka-ui) + lucide + zod + vueuse**.

## O que tem

- Lista de clientes/personas: criar, filtrar, duplicar (usar como modelo), excluir, importar e baixar backup JSON
- Editor com as 9 seções da aula: Dados do cliente, Perfil, Dores & desejos, Comportamento digital, Jornada, Comunicação & tom, Google Ads Search, Site & landing page e Resumo final
- Campos extras para Google Ads e venda B2B (marcados no código com `enrichment: true`)
- Progresso real (50% obrigatórios + 50% opcionais), buscar perguntas, ajuda, status "Hipótese / Validada"
- Salvamento automático no Supabase (cada usuário só vê as próprias personas, via RLS)
- Exportar PDF (janela de impressão do navegador → "Salvar como PDF", A4)

## Como rodar no Windows

Veja `docs/COMO_USAR.md`.

## Estrutura

```
app/config/persona/   → perguntas de cada seção (edite aqui para mudar o formulário)
app/components/persona/   → editor (campos, menu, resumo, busca, ajuda, PDF)
app/components/personas/  → lista de clientes
app/composables/      → useAuth, usePersonas (lista), usePersonaEditor (autosave)
app/utils/            → progresso, busca, backup JSON, formatação
shared/schemas/       → validação zod do backup
supabase/migrations/  → SQL da tabela personas + RLS
docs/exemplos/        → persona pronta da A Portamóvel para importar
```

Regras do projeto: nenhum arquivo passa de 400 linhas; não inventar dados de clientes; persona nasce como hipótese.
