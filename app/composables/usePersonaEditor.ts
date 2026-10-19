import { useDebounceFn } from '@vueuse/core'
import type { FieldValue, PersonaData, PersonaRecord, PersonaStatus, SaveState, SectionId } from '~/types/persona'
import { computeProgress } from '~/utils/personaProgress'

const SAVE_DELAY_MS = 900

/**
 * Estado de UMA persona aberta no editor, com salvamento automático no Supabase.
 * As edições ficam na memória e são enviadas em lote após uma pausa na digitação.
 */
export function usePersonaEditor(id: string) {
  const supabase = useSupabaseClient()
  const record = ref<PersonaRecord | null>(null)
  const data = ref<PersonaData>({})
  const loading = ref(true)
  const notFound = ref(false)
  const saveState = ref<SaveState>('idle')
  const lastSavedAt = ref<Date | null>(null)

  const progress = computed(() => computeProgress(data.value))
  const clienteNome = computed(() => {
    const nome = data.value.cliente?.empresa
    return typeof nome === 'string' && nome.trim() ? nome.trim() : (record.value?.cliente_nome ?? 'Sem nome')
  })

  async function load(): Promise<void> {
    loading.value = true
    const { data: row, error } = await supabase.from('personas').select('*').eq('id', id).maybeSingle()
    loading.value = false
    if (error || !row) {
      notFound.value = true
      return
    }
    record.value = row as PersonaRecord
    data.value = structuredClone((row as PersonaRecord).dados ?? {})
  }

  async function persist(): Promise<void> {
    if (!record.value) return
    saveState.value = 'saving'
    const nicho = data.value.cliente?.segmento
    const { error } = await supabase
      .from('personas')
      .update({
        dados: data.value,
        progresso: progress.value,
        cliente_nome: clienteNome.value,
        nicho: typeof nicho === 'string' && nicho.trim() ? nicho.trim() : null,
        status: record.value.status,
      } as never)
      .eq('id', id)
    if (error) {
      saveState.value = 'error'
      return
    }
    saveState.value = 'saved'
    lastSavedAt.value = new Date()
  }

  const scheduleSave = useDebounceFn(persist, SAVE_DELAY_MS)

  function setField(section: SectionId, key: string, value: FieldValue): void {
    const current = data.value[section] ?? {}
    data.value = { ...data.value, [section]: { ...current, [key]: value } }
    saveState.value = 'saving'
    scheduleSave()
  }

  function setStatus(status: PersonaStatus): void {
    if (!record.value) return
    record.value = { ...record.value, status }
    scheduleSave()
  }

  /** Avisa antes de fechar a aba se ainda houver alteração não enviada */
  function guardUnload(e: BeforeUnloadEvent): void {
    if (saveState.value === 'saving') e.preventDefault()
  }
  onMounted(() => window.addEventListener('beforeunload', guardUnload))
  onBeforeUnmount(() => window.removeEventListener('beforeunload', guardUnload))

  return { record, data, loading, notFound, saveState, lastSavedAt, progress, clienteNome, load, setField, setStatus, persist }
}
