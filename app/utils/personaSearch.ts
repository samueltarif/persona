import { ALL_FIELDS, type FieldRef } from '~/config/persona'

function normalize(text: string): string {
  return text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
}

/** Busca perguntas por título, ajuda, placeholder e nome da seção (sem acento) */
export function searchFields(query: string, limit = 12): FieldRef[] {
  const terms = normalize(query).split(/\s+/).filter(Boolean)
  if (!terms.length) return []
  return ALL_FIELDS.filter(({ section, field }) => {
    const haystack = normalize(
      [field.label, field.help, field.placeholder, section.label, section.title].filter(Boolean).join(' '),
    )
    return terms.every(t => haystack.includes(t))
  }).slice(0, limit)
}
