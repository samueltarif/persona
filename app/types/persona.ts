/** Tipos centrais do PersonaDoc. A estrutura do formulário vem de app/config/persona. */

export type FieldType = 'text' | 'textarea' | 'number' | 'select' | 'chips'

export interface FieldDef {
  key: string
  label: string
  type: FieldType
  placeholder?: string
  help?: string
  required?: boolean
  options?: readonly string[]
  /** chips: true = várias escolhas; false = escolha única */
  multiple?: boolean
  rows?: number
  /** largura no grid de 6 colunas: 2 = 1/3, 3 = 1/2, 6 = linha inteira */
  span?: 2 | 3 | 6
  /** true = campo extra proposto pelo kit, não visível nas capturas da aula */
  enrichment?: boolean
}

export interface GroupDef {
  title: string
  note?: string
  fields: FieldDef[]
}

export type SectionId =
  | 'cliente' | 'persona' | 'dores' | 'digital' | 'jornada'
  | 'comunicacao' | 'ads' | 'site' | 'resumo'

export interface SectionDef {
  id: SectionId
  label: string
  eyebrow: string
  icon: string
  title: string
  description: string
  groups: GroupDef[]
}

export type FieldValue = string | number | string[] | null
export type SectionData = Record<string, FieldValue>
export type PersonaData = Partial<Record<SectionId, SectionData>>

export type PersonaStatus = 'rascunho' | 'validada'

/** Linha da tabela public.personas no Supabase */
export interface PersonaRecord {
  id: string
  owner_id: string
  cliente_nome: string
  nicho: string | null
  status: PersonaStatus
  dados: PersonaData
  progresso: number
  schema_version: number
  created_at: string
  updated_at: string
}

export type SaveState = 'idle' | 'saving' | 'saved' | 'error'
