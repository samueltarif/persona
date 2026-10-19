<script setup lang="ts">
import { FORM_SECTIONS } from '~/config/persona'
import type { PersonaData, PersonaStatus } from '~/types/persona'
import { formatValue, readValue } from '~/utils/personaValues'

defineProps<{
  data: PersonaData
  clienteNome: string
  status: PersonaStatus
  progress: number
}>()

const geradoEm = new Date().toLocaleDateString('pt-BR')
</script>

<!-- Só aparece na impressão (Exportar PDF). Layout claro, A4, sem navegação. -->
<template>
  <div class="print-only text-[11pt] leading-snug text-black">
    <header class="mb-6 border-b-2 border-black pb-3">
      <p class="text-[9pt] font-bold tracking-widest">PERSONADOC</p>
      <h1 class="text-[20pt] font-extrabold">Persona: {{ clienteNome }}</h1>
      <p class="text-[9pt] text-gray-600">
        Gerado em {{ geradoEm }} · {{ progress }}% preenchido ·
        {{ status === 'validada' ? 'Persona validada' : 'Hipótese (ainda não validada)' }}
      </p>
    </header>

    <section v-for="section in FORM_SECTIONS" :key="section.id" class="mb-5">
      <h2 class="print-break mb-2 border-b border-gray-400 pb-1 text-[12pt] font-bold uppercase">{{ section.label }}</h2>
      <template v-for="group in section.groups" :key="group.title">
        <div v-for="field in group.fields" :key="field.key" class="print-break grid grid-cols-[38%_62%] gap-3 py-1">
          <span class="font-semibold text-gray-700">{{ field.label }}</span>
          <span class="whitespace-pre-line break-words">{{ formatValue(field, readValue(data, section.id, field.key)) }}</span>
        </div>
      </template>
    </section>
  </div>
</template>
