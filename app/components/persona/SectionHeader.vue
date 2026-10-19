<script setup lang="ts">
import type { SectionDef } from '~/types/persona'
import { sectionIcon } from '~/utils/sectionIcons'

defineProps<{ section: SectionDef }>()
</script>

<template>
  <header class="mb-8">
    <span class="eyebrow">
      <component :is="sectionIcon(section.icon)" class="h-3.5 w-3.5" aria-hidden="true" />
      {{ section.eyebrow }}
    </span>
    <h1 class="mt-4 font-display text-3xl font-extrabold md:text-4xl">{{ section.title }}</h1>
    <p class="mt-3 max-w-2xl text-muted-foreground">{{ section.description }}</p>
  </header>
</template>
