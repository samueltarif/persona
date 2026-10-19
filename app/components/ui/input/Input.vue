<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useVModel } from '@vueuse/core'
import { cn } from '~/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
  modelValue?: string | number
  type?: string
  placeholder?: string
  disabled?: boolean
  id?: string
  autocomplete?: string
  required?: boolean
}>()

const emit = defineEmits<{ 'update:modelValue': [value: string | number] }>()
const modelValue = useVModel(props, 'modelValue', emit)
</script>

<template>
  <input
    v-bind="$attrs"
    :id="id"
    v-model="modelValue"
    data-slot="input"
    :type="type ?? 'text'"
    :placeholder="placeholder"
    :disabled="disabled"
    :autocomplete="autocomplete"
    :required="required"
    :class="cn(
      'flex h-11 w-full rounded-lg border border-input bg-surface-2 px-3.5 text-sm text-foreground',
      'placeholder:text-muted-foreground/70',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-transparent',
      'disabled:cursor-not-allowed disabled:opacity-50',
      props.class,
    )"
  >
</template>
