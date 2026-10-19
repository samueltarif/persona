<script setup lang="ts">
import { ArrowLeft, CircleHelp, Download, FileJson, Menu, Search } from '@lucide/vue'
import type { SaveState } from '~/types/persona'

defineProps<{
  clienteNome: string
  saveState: SaveState
}>()

const emit = defineEmits<{
  search: []
  help: []
  pdf: []
  json: []
  menu: []
}>()
</script>

<template>
  <header class="no-print sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/95 px-4 backdrop-blur md:px-6">
    <Button variant="ghost" size="icon" class="lg:hidden" aria-label="Abrir menu de seções" @click="emit('menu')">
      <Menu class="h-5 w-5" />
    </Button>
    <NuxtLink to="/" class="flex items-center gap-2 rounded-md text-muted-foreground hover:text-foreground" aria-label="Voltar para a lista de clientes">
      <ArrowLeft class="h-4 w-4" />
      <AppLogo class="hidden sm:inline" />
    </NuxtLink>

    <div class="ml-2 hidden min-w-0 flex-col md:flex">
      <span class="truncate text-sm font-semibold">{{ clienteNome }}</span>
      <SaveStatus :state="saveState" />
    </div>

    <div class="ml-auto flex items-center gap-2">
      <Button variant="outline" size="sm" @click="emit('search')">
        <Search class="h-4 w-4" /><span class="hidden sm:inline">Buscar perguntas</span>
      </Button>
      <Button variant="outline" size="sm" @click="emit('help')">
        <CircleHelp class="h-4 w-4 text-red-400" /><span class="hidden sm:inline">Ajuda</span>
      </Button>
      <Button variant="outline" size="sm" title="Baixar backup em JSON" @click="emit('json')">
        <FileJson class="h-4 w-4" /><span class="hidden xl:inline">Backup JSON</span>
      </Button>
      <Button size="sm" @click="emit('pdf')">
        <Download class="h-4 w-4" /><span class="hidden sm:inline">Exportar PDF</span>
      </Button>
    </div>
  </header>
</template>
