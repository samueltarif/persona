import { ALL_FIELDS } from '~/config/persona'
import type { PersonaData, SectionId } from '~/types/persona'
import { isFilled, readValue } from './personaValues'

/**
 * Fórmula do progresso (documentada para o usuário na Ajuda):
 *   progresso = 50% × (obrigatórios preenchidos / obrigatórios)
 *             + 50% × (opcionais preenchidos / opcionais)
 * Assim os 3 campos obrigatórios pesam mais, mas os opcionais não
 * "penalizam" como se todos fossem obrigatórios. Visitar abas não conta.
 */
export function computeProgress(data: PersonaData): number {
  const required = ALL_FIELDS.filter(f => f.field.required)
  const optional = ALL_FIELDS.filter(f => !f.field.required)
  const filled = (list: typeof ALL_FIELDS) =>
    list.filter(f => isFilled(readValue(data, f.section.id, f.field.key))).length

  const reqRatio = required.length ? filled(required) / required.length : 1
  const optRatio = optional.length ? filled(optional) / optional.length : 1
  return Math.round((reqRatio * 0.5 + optRatio * 0.5) * 100)
}

/** Quantos campos de uma seção estão preenchidos (para o menu lateral) */
export function sectionFillCount(data: PersonaData, section: SectionId): { filled: number, total: number } {
  const fields = ALL_FIELDS.filter(f => f.section.id === section)
  const filled = fields.filter(f => isFilled(readValue(data, section, f.field.key))).length
  return { filled, total: fields.length }
}

/** Obrigatórios ainda vazios, para avisar no resumo */
export function missingRequired(data: PersonaData): string[] {
  return ALL_FIELDS
    .filter(f => f.field.required && !isFilled(readValue(data, f.section.id, f.field.key)))
    .map(f => `${f.section.label}: ${f.field.label}`)
}
