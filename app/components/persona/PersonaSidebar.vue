<script setup lang="ts">
import { ALL_SECTIONS } from '~/config/persona'
import type { PersonaData, PersonaStatus, SectionId } from '~/types/persona'
import { sectionFillCount } from '~/utils/personaProgress'
import { sectionIcon } from '~/utils/sectionIcons'

defineProps<{
  active: SectionId
  progress: number
  data: PersonaData
  status: PersonaStatus
}>()

const emit = defineEmits<{
  select: [id: SectionId]
  status: [value: PersonaStatus]
}>()
</script>

<template>
  <nav class="flex h-full flex-col gap-6 p-5" aria-label="Seções da persona">
    <div>
      <div class="h-1.5 w-full overflow-hidden rounded-full bg-surface-2" role="progressbar" :aria-valuenow="progress" aria-valuemin="0" aria-valuemax="100" aria-label="Progresso de preenchimento">
        <div class="h-full rounded-full bg-gold transition-all" :style="{ width: `${progress}%` }" />
      </div>
      <p class="mt-2 text-xs text-muted-foreground">{{ progress }}% preenchido</p>
    </div>

    <div>
      <p class="mb-2 px-2 text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">Seções</p>
      <ul class="space-y-1">
        <li v-for="section in ALL_SECTIONS" :key="section.id">
          <button
            type="button"
            class="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors"
            :class="active === section.id ? 'bg-gold-soft font-semibold text-gold' : 'text-muted-foreground hover:bg-surface-2 hover:text-foreground'"
            :aria-current="active === section.id ? 'page' : undefined"
            @click="emit('select', section.id)"
          >
            <component :is="sectionIcon(section.icon)" class="h-4 w-4 shrink-0" aria-hidden="true" />
            <span class="flex-1">{{ section.label }}</span>
            <span v-if="section.id !== 'resumo'" class="text-[10px] tabular-nums opacity-70">
              {{ sectionFillCount(data, section.id).filled }}/{{ sectionFillCount(data, section.id).total }}
            </span>
          </button>
        </li>
      </ul>
    </div>

    <div class="mt-auto rounded-xl border border-border bg-surface-2 p-3">
      <p class="field-label mb-2">Status da persona</p>
      <div class="grid grid-cols-2 gap-1.5">
        <button
          v-for="opt in (['rascunho', 'validada'] as const)"
          :key="opt"
          type="button"
          :aria-pressed="status === opt"
          class="rounded-md px-2 py-1.5 text-xs font-semibold capitalize"
          :class="status === opt ? 'bg-gold text-gold-foreground' : 'text-muted-foreground hover:text-foreground'"
          @click="emit('status', opt)"
        >
          {{ opt === 'rascunho' ? 'Hipótese' : 'Validada' }}
        </button>
      </div>
      <p class="mt-2 text-[11px] leading-snug text-muted-foreground">
        Marque "Validada" só depois de confirmar com o cliente ou com dados reais.
      </p>
    </div>
  </nav>
</template>
