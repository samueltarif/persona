import type { FieldDef, SectionDef, SectionId } from '~/types/persona'
import { secaoAds, secaoComunicacao, secaoSite } from './sections-marketing'
import { secaoDigital, secaoDores, secaoJornada } from './sections-comportamento'
import { secaoCliente, secaoPersona } from './sections-perfil'

/** Versão do formato dos dados. Suba ao mudar chaves de campos. */
export const SCHEMA_VERSION = 1

export const secaoResumo: SectionDef = {
  id: 'resumo',
  label: 'Resumo final',
  eyebrow: 'Documento',
  icon: 'FileText',
  title: 'Resumo Final da Persona',
  description: 'Visão consolidada de todas as informações preenchidas.',
  groups: [],
}

/** As 8 seções de perguntas, na ordem do menu */
export const FORM_SECTIONS: SectionDef[] = [
  secaoCliente, secaoPersona, secaoDores, secaoDigital,
  secaoJornada, secaoComunicacao, secaoAds, secaoSite,
]

/** Menu completo: 8 seções de perguntas + resumo */
export const ALL_SECTIONS: SectionDef[] = [...FORM_SECTIONS, secaoResumo]

export interface FieldRef {
  section: SectionDef
  field: FieldDef
}

/** Lista achatada de todos os campos, útil para progresso, busca e resumo */
export const ALL_FIELDS: FieldRef[] = FORM_SECTIONS.flatMap(section =>
  section.groups.flatMap(group => group.fields.map(field => ({ section, field }))),
)

export function findSection(id: SectionId): SectionDef {
  return ALL_SECTIONS.find(s => s.id === id) ?? secaoCliente
}

/** id do elemento HTML de um campo, usado pela busca para rolar até ele */
export function fieldDomId(sectionId: SectionId, key: string): string {
  return `campo-${sectionId}-${key}`
}
