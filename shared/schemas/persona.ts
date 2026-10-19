import { z } from 'zod'

/** Valor de um campo: texto, número, lista de chips ou vazio */
export const fieldValueSchema = z.union([z.string().max(5000), z.number(), z.array(z.string().max(200)).max(50), z.null()])

export const sectionDataSchema = z.record(z.string().max(60), fieldValueSchema)

const sectionIds = ['cliente', 'persona', 'dores', 'digital', 'jornada', 'comunicacao', 'ads', 'site'] as const

export const personaDataSchema = z.object(
  Object.fromEntries(sectionIds.map(id => [id, sectionDataSchema.optional()])) as Record<(typeof sectionIds)[number], z.ZodOptional<typeof sectionDataSchema>>,
).strict()

/** Formato do arquivo de backup exportado/importado */
export const personaBackupSchema = z.object({
  app: z.literal('personadoc'),
  schema_version: z.number().int().positive(),
  exportado_em: z.string(),
  cliente_nome: z.string().min(1).max(200),
  nicho: z.string().max(200).nullable(),
  status: z.enum(['rascunho', 'validada']),
  dados: personaDataSchema,
})

export type PersonaBackup = z.infer<typeof personaBackupSchema>
