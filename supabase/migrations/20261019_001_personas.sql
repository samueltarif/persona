-- ============================================================
-- PersonaDoc — tabela de personas (multi-clientes)
-- Rode UMA vez no projeto Supabase NOVO do PersonaDoc:
-- Supabase > SQL Editor > New query > colar tudo > Run
-- ============================================================

create table if not exists public.personas (
  id             uuid         primary key default gen_random_uuid(),
  owner_id       uuid         not null default auth.uid()
                              references auth.users(id) on delete cascade,
  cliente_nome   text         not null check (char_length(cliente_nome) between 1 and 200),
  nicho          text         check (nicho is null or char_length(nicho) <= 200),
  status         text         not null default 'rascunho'
                              check (status in ('rascunho', 'validada')),
  dados          jsonb        not null default '{}'::jsonb
                              check (jsonb_typeof(dados) = 'object' and pg_column_size(dados) < 1000000),
  progresso      smallint     not null default 0 check (progresso between 0 and 100),
  schema_version smallint     not null default 1,
  created_at     timestamptz  not null default now(),
  updated_at     timestamptz  not null default now()
);

comment on table public.personas is 'PersonaDoc: uma persona/briefing por cliente. Cada usuário só acessa as próprias linhas (RLS).';

create index if not exists personas_owner_updated_idx
  on public.personas (owner_id, updated_at desc);

-- updated_at automático
create or replace function public.personas_set_updated_at()
  returns trigger
  language plpgsql
  security invoker
  set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists personas_updated_at on public.personas;
create trigger personas_updated_at
  before update on public.personas
  for each row execute function public.personas_set_updated_at();

-- Impede trocar o dono de uma persona
create or replace function public.personas_lock_owner()
  returns trigger
  language plpgsql
  security invoker
  set search_path = ''
as $$
begin
  if new.owner_id is distinct from old.owner_id then
    raise exception 'owner_id não pode ser alterado';
  end if;
  return new;
end;
$$;

drop trigger if exists personas_lock_owner on public.personas;
create trigger personas_lock_owner
  before update on public.personas
  for each row execute function public.personas_lock_owner();

-- ------------------------------------------------------------
-- Segurança: Row Level Security
-- ------------------------------------------------------------
alter table public.personas enable row level security;

revoke all on public.personas from anon;
grant select, insert, update, delete on public.personas to authenticated;

drop policy if exists "personas_select_own" on public.personas;
create policy "personas_select_own" on public.personas
  for select to authenticated
  using (owner_id = (select auth.uid()));

drop policy if exists "personas_insert_own" on public.personas;
create policy "personas_insert_own" on public.personas
  for insert to authenticated
  with check (owner_id = (select auth.uid()));

drop policy if exists "personas_update_own" on public.personas;
create policy "personas_update_own" on public.personas
  for update to authenticated
  using (owner_id = (select auth.uid()))
  with check (owner_id = (select auth.uid()));

drop policy if exists "personas_delete_own" on public.personas;
create policy "personas_delete_own" on public.personas
  for delete to authenticated
  using (owner_id = (select auth.uid()));
