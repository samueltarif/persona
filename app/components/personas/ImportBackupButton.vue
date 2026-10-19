<script setup lang="ts">
import { Upload } from '@lucide/vue'
import type { PersonaBackup } from '~~/shared/schemas/persona'
import { parseBackupFile } from '~/utils/personaBackup'

const emit = defineEmits<{ imported: [backup: PersonaBackup], error: [message: string] }>()
const input = ref<HTMLInputElement | null>(null)

async function onFile(e: Event): Promise<void> {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  target.value = '' // permite escolher o mesmo arquivo de novo
  if (!file) return
  const result = await parseBackupFile(file)
  if (result.ok) emit('imported', result.backup)
  else emit('error', result.error)
}
</script>

<template>
  <Button variant="outline" @click="input?.click()">
    <Upload class="h-4 w-4" />Importar JSON
  </Button>
  <input ref="input" type="file" accept="application/json,.json" class="hidden" @change="onFile">
</template>
