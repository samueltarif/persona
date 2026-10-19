import { personaBackupSchema, type PersonaBackup } from '~~/shared/schemas/persona'
import { SCHEMA_VERSION } from '~/config/persona'
import type { PersonaRecord } from '~/types/persona'
import { slugify } from './personaValues'

/** Baixa a persona como JSON (backup / levar para outra conta) */
export function downloadBackup(persona: PersonaRecord): void {
  const payload: PersonaBackup = {
    app: 'personadoc',
    schema_version: SCHEMA_VERSION,
    exportado_em: new Date().toISOString(),
    cliente_nome: persona.cliente_nome,
    nicho: persona.nicho,
    status: persona.status,
    dados: persona.dados as PersonaBackup['dados'],
  }
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `persona-${slugify(persona.cliente_nome)}.json`
  a.click()
  URL.revokeObjectURL(url)
}

export type ParseResult =
  | { ok: true, backup: PersonaBackup }
  | { ok: false, error: string }

/** Lê e valida um arquivo de backup. Nunca grava nada: só devolve o conteúdo. */
export async function parseBackupFile(file: File): Promise<ParseResult> {
  if (file.size > 1_000_000) return { ok: false, error: 'Arquivo grande demais (máx. 1 MB).' }
  let json: unknown
  try {
    json = JSON.parse(await file.text())
  }
  catch {
    return { ok: false, error: 'O arquivo não é um JSON válido.' }
  }
  const parsed = personaBackupSchema.safeParse(json)
  if (!parsed.success) return { ok: false, error: 'O arquivo não é um backup do PersonaDoc ou está corrompido.' }
  if (parsed.data.schema_version > SCHEMA_VERSION) {
    return { ok: false, error: 'Backup feito numa versão mais nova do PersonaDoc.' }
  }
  return { ok: true, backup: parsed.data }
}
