import type { FieldDef, FieldValue, PersonaData, SectionId } from '~/types/persona'

/** Campo está preenchido? Listas vazias, texto em branco e null contam como vazio. */
export function isFilled(value: FieldValue | undefined): boolean {
  if (value === null || value === undefined) return false
  if (Array.isArray(value)) return value.length > 0
  if (typeof value === 'number') return Number.isFinite(value)
  return value.trim().length > 0
}

/** Lê o valor de um campo sem quebrar quando a seção ainda não existe */
export function readValue(data: PersonaData, section: SectionId, key: string): FieldValue {
  return data[section]?.[key] ?? null
}

/** Texto legível para resumo e PDF. Vazio vira "—". */
export function formatValue(field: FieldDef, value: FieldValue): string {
  if (!isFilled(value)) return '—'
  if (Array.isArray(value)) return value.join(', ')
  if (field.type === 'number' && typeof value === 'number' && field.key === 'ticket') {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }
  return String(value)
}

/** Nome de arquivo seguro a partir do nome do cliente */
export function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'persona'
}
