<script setup lang="ts">
import { findSection, type FieldRef } from '~/config/persona'
import type { SectionId } from '~/types/persona'
import { downloadBackup } from '~/utils/personaBackup'

const route = useRoute()
const router = useRouter()
const id = String(route.params.id)

const editor = usePersonaEditor(id)
const { record, data, loading, notFound, saveState, progress, clienteNome } = editor

const active = computed<SectionId>(() => findSection((route.query.secao as SectionId) ?? 'cliente').id)
const section = computed(() => findSection(active.value))
const menuAberto = ref(false)
const buscaAberta = ref(false)
const ajudaAberta = ref(false)

useHead(() => ({ title: `${clienteNome.value} · PersonaDoc` }))
onMounted(editor.load)

async function select(secao: SectionId): Promise<void> {
  menuAberto.value = false
  await router.replace({ query: { secao } })
  window.scrollTo({ top: 0 })
}

/** Busca: abre a seção certa e leva o foco até a pergunta */
async function goToField(ref: FieldRef): Promise<void> {
  await select(ref.section.id)
  await nextTick()
  const el = document.querySelector<HTMLElement>(`[data-field="campo-${ref.section.id}-${ref.field.key}"]`)
  el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  el?.querySelector<HTMLElement>('input, textarea, select, button')?.focus({ preventScroll: true })
}

function exportPdf(): void {
  window.print()
}
</script>

<template>
  <div v-if="loading" class="flex min-h-screen items-center justify-center text-sm text-muted-foreground">Carregando persona...</div>

  <div v-else-if="notFound" class="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
    <p class="font-semibold">Persona não encontrada.</p>
    <NuxtLink to="/" class="text-gold underline">Voltar para a lista</NuxtLink>
  </div>

  <div v-else-if="record" class="min-h-screen">
    <PersonaTopbar
      :cliente-nome="clienteNome"
      :save-state="saveState"
      @menu="menuAberto = true"
      @search="buscaAberta = true"
      @help="ajudaAberta = true"
      @pdf="exportPdf"
      @json="downloadBackup({ ...record, cliente_nome: clienteNome, dados: data })"
    />

    <div class="no-print flex">
      <!-- Menu lateral: fixo no desktop, gaveta no celular -->
      <aside class="sticky top-16 hidden h-[calc(100vh-4rem)] w-72 shrink-0 overflow-y-auto border-r border-border lg:block">
        <PersonaSidebar :active="active" :progress="progress" :data="data" :status="record.status" @select="select" @status="editor.setStatus" />
      </aside>
      <div v-if="menuAberto" class="fixed inset-0 z-40 lg:hidden">
        <button type="button" class="absolute inset-0 bg-black/70" aria-label="Fechar menu" @click="menuAberto = false" />
        <aside class="absolute inset-y-0 left-0 w-72 overflow-y-auto border-r border-border bg-background">
          <PersonaSidebar :active="active" :progress="progress" :data="data" :status="record.status" @select="select" @status="editor.setStatus" />
        </aside>
      </div>

      <main class="min-w-0 flex-1 px-4 py-10 md:px-10 lg:px-14">
        <div class="mx-auto max-w-4xl">
          <div class="mb-6 md:hidden"><SaveStatus :state="saveState" /></div>
          <SectionHeader :section="section" />

          <SummaryView v-if="active === 'resumo'" :data="data" />
          <div v-else class="space-y-6">
            <FieldGroupCard
              v-for="group in section.groups"
              :key="group.title"
              :section-id="active"
              :group="group"
              :data="data"
              @change="(key, value) => editor.setField(active, key, value)"
            />
          </div>
        </div>
      </main>
    </div>

    <PrintDocument :data="data" :cliente-nome="clienteNome" :status="record.status" :progress="progress" />
    <SearchDialog v-model:open="buscaAberta" @pick="goToField" />
    <HelpDialog v-model:open="ajudaAberta" />
  </div>
</template>
