<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useVModel } from '@vueuse/core'
import { cn } from '~/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
  modelValue?: string
  placeholder?: string
  id?: string
  rows?: number
}>()

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
const modelValue = useVModel(props, 'modelValue', emit)
</script>

<template>
  <textarea
    v-bind="$attrs"
    :id="id"
    v-model="modelValue"
    data-slot="textarea"
    :rows="rows ?? 4"
    :placeholder="placeholder"
    :class="cn(
      'flex w-full resize-y rounded-lg border border-input bg-surface-2 px-3.5 py-3 text-sm text-foreground',
      'placeholder:text-muted-foreground/70',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-transparent',
      props.class,
    )"
  />
</template>
