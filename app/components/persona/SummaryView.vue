<script setup lang="ts">
import { TriangleAlert } from '@lucide/vue'
import { FORM_SECTIONS } from '~/config/persona'
import type { PersonaData } from '~/types/persona'
import { missingRequired } from '~/utils/personaProgress'
import { formatValue, readValue } from '~/utils/personaValues'

const props = defineProps<{ data: PersonaData }>()

const missing = computed(() => missingRequired(props.data))
</script>

<template>
  <div class="space-y-6">
    <div v-if="missing.length" class="flex gap-3 rounded-xl border border-gold/40 bg-gold-soft p-4 text-sm">
      <TriangleAlert class="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
      <div>
        <p class="font-semibold text-gold">Faltam campos obrigatórios para um briefing mínimo:</p>
        <ul class="mt-1 list-disc pl-5 text-foreground/80">
          <li v-for="m in missing" :key="m">{{ m }}</li>
        </ul>
      </div>
    </div>

    <section v-for="section in FORM_SECTIONS" :key="section.id" class="overflow-hidden rounded-2xl border border-border bg-surface">
      <h2 class="border-b border-border bg-gold-soft/60 px-6 py-4 text-sm font-bold uppercase tracking-[0.12em] text-gold">
        {{ section.label }}
      </h2>
      <dl class="divide-y divide-border px-6">
        <template v-for="group in section.groups" :key="group.title">
          <div v-for="field in group.fields" :key="field.key" class="grid gap-1 py-3.5 sm:grid-cols-[minmax(0,240px)_1fr] sm:gap-6">
            <dt class="text-sm text-muted-foreground">{{ field.label }}</dt>
            <dd class="whitespace-pre-line break-words text-sm">{{ formatValue(field, readValue(data, section.id, field.key)) }}</dd>
          </div>
        </template>
      </dl>
    </section>
  </div>
</template>
