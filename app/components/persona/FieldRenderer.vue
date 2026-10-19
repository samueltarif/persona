<script setup lang="ts">
import { fieldDomId } from '~/config/persona'
import type { FieldDef, FieldValue, SectionId } from '~/types/persona'

const props = defineProps<{
  sectionId: SectionId
  field: FieldDef
  modelValue: FieldValue
}>()

const emit = defineEmits<{ 'update:modelValue': [value: FieldValue] }>()

const domId = computed(() => fieldDomId(props.sectionId, props.field.key))
const labelId = computed(() => `${domId.value}-label`)

const spanClass = computed(() => ({
  2: 'md:col-span-2',
  3: 'md:col-span-3',
  6: 'md:col-span-6',
}[props.field.span ?? 6]))

const text = computed(() => (typeof props.modelValue === 'string' ? props.modelValue : ''))

function onText(value: string | number): void {
  emit('update:modelValue', String(value))
}

/** Número: vazio vira null; aceita vírgula decimal */
function onNumber(value: string | number): void {
  const raw = String(value).replace(',', '.').trim()
  if (!raw) return emit('update:modelValue', null)
  const n = Number(raw)
  emit('update:modelValue', Number.isFinite(n) && n >= 0 ? n : null)
}
</script>

<template>
  <div :class="['col-span-6 space-y-2 scroll-mt-28', spanClass]" :data-field="domId">
    <Label :id="labelId" :for="field.type === 'chips' ? undefined : domId">
      {{ field.label }}<span v-if="field.required" class="text-gold"> *</span>
    </Label>

    <Textarea
      v-if="field.type === 'textarea'"
      :id="domId"
      :model-value="text"
      :rows="field.rows"
      :placeholder="field.placeholder"
      :aria-required="field.required || undefined"
      @update:model-value="onText"
    />
    <Input
      v-else-if="field.type === 'number'"
      :id="domId"
      type="text"
      inputmode="decimal"
      :model-value="typeof modelValue === 'number' ? modelValue : ''"
      :placeholder="field.placeholder"
      @update:model-value="onNumber"
    />
    <SelectField
      v-else-if="field.type === 'select'"
      :id="domId"
      :options="field.options ?? []"
      :model-value="typeof modelValue === 'string' ? modelValue : null"
      @update:model-value="v => emit('update:modelValue', v)"
    />
    <ChipGroup
      v-else-if="field.type === 'chips'"
      :id="domId"
      :label-id="labelId"
      :options="field.options ?? []"
      :multiple="field.multiple"
      :model-value="Array.isArray(modelValue) || typeof modelValue === 'string' ? modelValue : null"
      @update:model-value="v => emit('update:modelValue', v)"
    />
    <Input
      v-else
      :id="domId"
      :model-value="text"
      :placeholder="field.placeholder"
      :aria-required="field.required || undefined"
      @update:model-value="onText"
    />

    <p v-if="field.help" class="text-xs text-muted-foreground">{{ field.help }}</p>
  </div>
</template>
