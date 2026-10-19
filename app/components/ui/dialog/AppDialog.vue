<script setup lang="ts">
import { DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogRoot, DialogTitle } from 'reka-ui'
import { X } from '@lucide/vue'

const open = defineModel<boolean>('open', { default: false })

defineProps<{
  title: string
  description?: string
  wide?: boolean
}>()
</script>

<template>
  <DialogRoot v-model:open="open">
    <DialogPortal>
      <DialogOverlay class="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" />
      <DialogContent
        class="fixed left-1/2 top-[8vh] z-50 max-h-[84vh] w-[calc(100vw-2rem)] -translate-x-1/2 overflow-y-auto rounded-2xl border border-border bg-surface p-6 shadow-2xl"
        :class="wide ? 'max-w-3xl' : 'max-w-lg'"
      >
        <div class="mb-4 flex items-start justify-between gap-4">
          <div>
            <DialogTitle class="font-display text-xl font-extrabold">{{ title }}</DialogTitle>
            <DialogDescription v-if="description" class="mt-1 text-sm text-muted-foreground">
              {{ description }}
            </DialogDescription>
          </div>
          <DialogClose class="rounded-md p-1 text-muted-foreground hover:bg-surface-2 hover:text-foreground" aria-label="Fechar">
            <X class="h-5 w-5" />
          </DialogClose>
        </div>
        <slot />
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
