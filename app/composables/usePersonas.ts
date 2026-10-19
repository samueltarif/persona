import { SCHEMA_VERSION } from '~/config/persona'
import type { PersonaData, PersonaRecord } from '~/types/persona'
import type { PersonaBackup } from '~~/shared/schemas/persona'
import { computeProgress } from '~/utils/personaProgress'

const COLUMNS = 'id, owner_id, cliente_nome, nicho, status, dados, progresso, schema_version, created_at, updated_at'

/**
 * Lista e CRUD das personas do usuário logado.
 * A segurança é garantida pelo RLS no banco: cada usuário só enxerga as próprias linhas.
 */
export function usePersonas() {
  const supabase = useSupabaseClient()
  const personas = ref<PersonaRecord[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchAll(): Promise<void> {
    loading.value = true
    error.value = null
    const { data, error: e } = await supabase
      .from('personas')
      .select(COLUMNS)
      .order('updated_at', { ascending: false })
    loading.value = false
    if (e) {
      error.value = 'Não foi possível carregar as personas. A tabela foi criada no Supabase?'
      return
    }
    personas.value = (data ?? []) as PersonaRecord[]
  }

  async function create(clienteNome: string, nicho: string | null, dados: PersonaData = {}): Promise<string | null> {
    const base: PersonaData = { ...dados, cliente: { ...(dados.cliente ?? {}), empresa: clienteNome, segmento: dados.cliente?.segmento ?? nicho } }
    const { data, error: e } = await supabase
      .from('personas')
      .insert({
        cliente_nome: clienteNome,
        nicho,
        dados: base,
        progresso: computeProgress(base),
        schema_version: SCHEMA_VERSION,
      } as never)
      .select('id')
      .single()
    if (e || !data) {
      error.value = 'Não foi possível criar a persona.'
      return null
    }
    return (data as { id: string }).id
  }

  async function duplicate(p: PersonaRecord): Promise<string | null> {
    return create(`${p.cliente_nome} (cópia)`, p.nicho, structuredClone(toRaw(p.dados)))
  }

  async function importBackup(b: PersonaBackup): Promise<string | null> {
    return create(b.cliente_nome, b.nicho, b.dados as PersonaData)
  }

  async function remove(id: string): Promise<boolean> {
    const { error: e } = await supabase.from('personas').delete().eq('id', id)
    if (e) {
      error.value = 'Não foi possível excluir.'
      return false
    }
    personas.value = personas.value.filter(p => p.id !== id)
    return true
  }

  return { personas, loading, error, fetchAll, create, duplicate, importBackup, remove }
}
