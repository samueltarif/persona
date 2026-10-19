<script setup lang="ts">
import { LogOut, Plus } from '@lucide/vue'
import type { PersonaRecord } from '~/types/persona'
import type { PersonaBackup } from '~~/shared/schemas/persona'
import { downloadBackup } from '~/utils/personaBackup'

const { personas, loading, error, fetchAll, create, duplicate, importBackup, remove } = usePersonas()
const { logout } = useAuth()

const busca = ref('')
const novaAberta = ref(false)
const criando = ref(false)
const aExcluir = ref<PersonaRecord | null>(null)
const aviso = ref<string | null>(null)

const filtradas = computed(() => {
  const q = busca.value.trim().toLowerCase()
  if (!q) return personas.value
  return personas.value.filter(p => `${p.cliente_nome} ${p.nicho ?? ''}`.toLowerCase().includes(q))
})

const excluirAberto = computed({
  get: () => aExcluir.value !== null,
  set: (v: boolean) => { if (!v) aExcluir.value = null },
})

onMounted(fetchAll)

async function abrir(id: string | null): Promise<void> {
  if (id) await navigateTo(`/persona/${id}`)
}

async function onCreate(cliente: string, nicho: string | null): Promise<void> {
  criando.value = true
  const id = await create(cliente, nicho)
  criando.value = false
  novaAberta.value = false
  await abrir(id)
}

async function onDuplicate(p: PersonaRecord): Promise<void> {
  if (await duplicate(p)) await fetchAll()
}

async function onImported(b: PersonaBackup): Promise<void> {
  const id = await importBackup(b)
  aviso.value = id ? `Persona "${b.cliente_nome}" importada como nova.` : 'Não foi possível importar.'
  await fetchAll()
}

async function confirmarExclusao(): Promise<void> {
  if (aExcluir.value) await remove(aExcluir.value.id)
  aExcluir.value = null
}
</script>

<template>
  <div class="min-h-screen">
    <header class="flex h-16 items-center border-b border-border px-4 md:px-8">
      <AppLogo />
      <Button variant="ghost" size="sm" class="ml-auto" @click="logout"><LogOut class="h-4 w-4" />Sair</Button>
    </header>

    <main class="mx-auto max-w-6xl px-4 py-10 md:px-8">
      <div class="flex flex-wrap items-end gap-4">
        <div class="mr-auto">
          <span class="eyebrow">Clientes</span>
          <h1 class="mt-3 font-display text-3xl font-extrabold md:text-4xl">Suas personas</h1>
          <p class="mt-2 text-muted-foreground">Uma persona por cliente ou por público. Duplique uma pronta para usar como modelo.</p>
        </div>
        <ImportBackupButton @imported="onImported" @error="m => (aviso = m)" />
        <Button @click="novaAberta = true"><Plus class="h-4 w-4" />Nova persona</Button>
      </div>

      <Input v-model="busca" class="mt-8 max-w-md" placeholder="Filtrar por cliente ou nicho..." aria-label="Filtrar personas" />

      <p v-if="aviso" class="mt-4 rounded-lg border border-border bg-surface px-4 py-3 text-sm" role="status">{{ aviso }}</p>
      <p v-if="error" class="mt-4 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300" role="alert">{{ error }}</p>

      <p v-if="loading" class="mt-10 text-sm text-muted-foreground">Carregando...</p>
      <div v-else-if="!personas.length && !error" class="mt-10 rounded-2xl border border-dashed border-border p-10 text-center">
        <p class="font-semibold">Nenhuma persona ainda.</p>
        <p class="mt-1 text-sm text-muted-foreground">Clique em "Nova persona" para criar a primeira.</p>
      </div>
      <div v-else class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <PersonaCard
          v-for="p in filtradas"
          :key="p.id"
          :persona="p"
          @duplicate="onDuplicate(p)"
          @backup="downloadBackup(p)"
          @remove="aExcluir = p"
        />
      </div>
    </main>

    <NewPersonaDialog v-model:open="novaAberta" :busy="criando" @create="onCreate" />

    <AppDialog v-model:open="excluirAberto" title="Excluir persona?" :description="`A persona de &quot;${aExcluir?.cliente_nome ?? ''}&quot; será apagada para sempre. Baixe o JSON antes se quiser guardar.`">
      <div class="flex justify-end gap-2">
        <Button variant="outline" @click="aExcluir = null">Cancelar</Button>
        <Button variant="destructive" @click="confirmarExclusao">Excluir</Button>
      </div>
    </AppDialog>
  </div>
</template>
