<script setup lang="ts">
import { BadgeCheck, Copy, FileJson, Trash2 } from '@lucide/vue'
import type { PersonaRecord } from '~/types/persona'

const props = defineProps<{ persona: PersonaRecord }>()
const emit = defineEmits<{ duplicate: [], backup: [], remove: [] }>()

const atualizado = computed(() =>
  new Date(props.persona.updated_at).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' }),
)
</script>

<template>
  <article class="group flex flex-col rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-gold/50">
    <NuxtLink :to="`/persona/${persona.id}`" class="flex-1 rounded-md">
      <div class="flex items-start justify-between gap-3">
        <h2 class="font-display text-lg font-bold leading-tight group-hover:text-gold">{{ persona.cliente_nome }}</h2>
        <span
          class="inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide"
          :class="persona.status === 'validada' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-surface-2 text-muted-foreground'"
        >
          <BadgeCheck v-if="persona.status === 'validada'" class="h-3 w-3" aria-hidden="true" />
          {{ persona.status === 'validada' ? 'Validada' : 'Hipótese' }}
        </span>
      </div>
      <p class="mt-1 text-sm text-muted-foreground">{{ persona.nicho || 'Nicho não informado' }}</p>

      <div class="mt-5">
        <div class="h-1.5 overflow-hidden rounded-full bg-surface-2">
          <div class="h-full rounded-full bg-gold" :style="{ width: `${persona.progresso}%` }" />
        </div>
        <p class="mt-2 text-xs text-muted-foreground">{{ persona.progresso }}% preenchido · atualizado {{ atualizado }}</p>
      </div>
    </NuxtLink>

    <div class="mt-4 flex gap-1 border-t border-border pt-3">
      <Button variant="ghost" size="sm" title="Duplicar como modelo" @click="emit('duplicate')">
        <Copy class="h-4 w-4" />Duplicar
      </Button>
      <Button variant="ghost" size="sm" title="Baixar backup JSON" @click="emit('backup')">
        <FileJson class="h-4 w-4" />JSON
      </Button>
      <Button variant="ghost" size="sm" class="ml-auto text-red-400 hover:text-red-300" :aria-label="`Excluir ${persona.cliente_nome}`" @click="emit('remove')">
        <Trash2 class="h-4 w-4" />
      </Button>
    </div>
  </article>
</template>
