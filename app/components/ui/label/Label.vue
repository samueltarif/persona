<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '~/lib/utils'

defineProps<{ class?: HTMLAttributes['class'], for?: string }>()
</script>

<template>
  <label data-slot="label" :for="$props.for" :class="cn('field-label', $props.class)">
    <slot />
  </label>
</template>
