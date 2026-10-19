<script setup lang="ts">
const props = defineProps<{
  options: readonly string[]
  modelValue: string | string[] | null
  multiple?: boolean
  labelId?: string
}>()

const emit = defineEmits<{ 'update:modelValue': [value: string | string[] | null] }>()

function isSelected(option: string): boolean {
  return Array.isArray(props.modelValue) ? props.modelValue.includes(option) : props.modelValue === option
}

/** Múltipla: liga/desliga. Única: escolhe uma; clicar de novo desmarca. */
function toggle(option: string): void {
  if (props.multiple) {
    const list = Array.isArray(props.modelValue) ? [...props.modelValue] : []
    const next = list.includes(option) ? list.filter(o => o !== option) : [...list, option]
    emit('update:modelValue', next)
    return
  }
  emit('update:modelValue', props.modelValue === option ? null : option)
}
</script>

<template>
  <div class="flex flex-wrap gap-2" role="group" :aria-labelledby="labelId">
    <button
      v-for="option in options"
      :key="option"
      type="button"
      :aria-pressed="isSelected(option)"
      class="rounded-lg border px-3.5 py-2 text-xs font-semibold uppercase tracking-wide transition-colors"
      :class="isSelected(option)
        ? 'border-gold bg-gold-soft text-gold'
        : 'border-border bg-surface-2 text-muted-foreground hover:border-muted-foreground hover:text-foreground'"
      @click="toggle(option)"
    >
      {{ option }}
    </button>
  </div>
</template>
