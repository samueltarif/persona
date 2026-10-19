<script setup lang="ts">
import { Check, CloudOff, LoaderCircle } from '@lucide/vue'
import type { SaveState } from '~/types/persona'

defineProps<{ state: SaveState }>()
</script>

<template>
  <span class="inline-flex items-center gap-1.5 text-xs" role="status" aria-live="polite">
    <template v-if="state === 'saving'">
      <LoaderCircle class="h-3.5 w-3.5 animate-spin text-muted-foreground" aria-hidden="true" />
      <span class="text-muted-foreground">Salvando...</span>
    </template>
    <template v-else-if="state === 'saved'">
      <Check class="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
      <span class="text-muted-foreground">Salvo na nuvem</span>
    </template>
    <template v-else-if="state === 'error'">
      <CloudOff class="h-3.5 w-3.5 text-red-400" aria-hidden="true" />
      <span class="text-red-400">Erro ao salvar. Verifique a internet.</span>
    </template>
  </span>
</template>
