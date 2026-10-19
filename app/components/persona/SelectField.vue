<script setup lang="ts">
defineProps<{
  id: string
  options: readonly string[]
  modelValue: string | null
}>()

const emit = defineEmits<{ 'update:modelValue': [value: string | null] }>()

function onChange(e: Event): void {
  const value = (e.target as HTMLSelectElement).value
  emit('update:modelValue', value || null)
}
</script>

<template>
  <select
    :id="id"
    :value="modelValue ?? ''"
    class="h-11 w-full rounded-lg border border-input bg-surface-2 px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    @change="onChange"
  >
    <option value="">Selecione...</option>
    <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
  </select>
</template>
