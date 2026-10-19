<script setup lang="ts">
import { Search } from '@lucide/vue'
import type { FieldRef } from '~/config/persona'
import { searchFields } from '~/utils/personaSearch'

const open = defineModel<boolean>('open', { default: false })
const emit = defineEmits<{ pick: [ref: FieldRef] }>()

const query = ref('')
const results = computed(() => searchFields(query.value))

watch(open, (v) => { if (v) query.value = '' })

function pick(ref: FieldRef): void {
  open.value = false
  emit('pick', ref)
}
</script>

<template>
  <AppDialog v-model:open="open" title="Buscar perguntas" description="Digite parte da pergunta, como &quot;dor&quot;, &quot;negativas&quot; ou &quot;cores&quot;.">
    <div class="relative">
      <Search class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
      <Input v-model="query" class="pl-9" placeholder="Buscar..." aria-label="Buscar perguntas" autofocus />
    </div>

    <ul v-if="results.length" class="mt-4 max-h-[50vh] space-y-1 overflow-y-auto">
      <li v-for="r in results" :key="`${r.section.id}-${r.field.key}`">
        <button type="button" class="w-full rounded-lg px-3 py-2.5 text-left hover:bg-surface-2" @click="pick(r)">
          <span class="block text-sm font-medium">{{ r.field.label }}</span>
          <span class="block text-xs text-gold">{{ r.section.label }}</span>
        </button>
      </li>
    </ul>
    <p v-else-if="query.trim()" class="mt-4 text-sm text-muted-foreground">Nenhuma pergunta encontrada.</p>
  </AppDialog>
</template>
