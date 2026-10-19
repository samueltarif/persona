<script setup lang="ts">
import type { FieldValue, GroupDef, PersonaData, SectionId } from '~/types/persona'
import { readValue } from '~/utils/personaValues'

defineProps<{
  sectionId: SectionId
  group: GroupDef
  data: PersonaData
}>()

const emit = defineEmits<{ change: [key: string, value: FieldValue] }>()
</script>

<template>
  <section class="rounded-2xl border border-border bg-surface p-6 md:p-8">
    <h2 class="flex items-center gap-2.5 text-base font-semibold">
      <span class="h-2 w-2 rounded-full bg-gold" aria-hidden="true" />
      {{ group.title }}
    </h2>
    <p v-if="group.note" class="mt-1.5 pl-[18px] text-sm text-muted-foreground">{{ group.note }}</p>

    <div class="mt-6 grid grid-cols-6 gap-x-6 gap-y-6">
      <FieldRenderer
        v-for="field in group.fields"
        :key="field.key"
        :section-id="sectionId"
        :field="field"
        :model-value="readValue(data, sectionId, field.key)"
        @update:model-value="v => emit('change', field.key, v)"
      />
    </div>
  </section>
</template>
