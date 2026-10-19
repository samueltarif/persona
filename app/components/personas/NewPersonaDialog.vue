<script setup lang="ts">
const open = defineModel<boolean>('open', { default: false })
const props = defineProps<{ busy?: boolean }>()
const emit = defineEmits<{ create: [cliente: string, nicho: string | null] }>()

const cliente = ref('')
const nicho = ref('')
const touched = ref(false)

const invalid = computed(() => !cliente.value.trim())

watch(open, (v) => {
  if (v) {
    cliente.value = ''
    nicho.value = ''
    touched.value = false
  }
})

function submit(): void {
  touched.value = true
  if (invalid.value || props.busy) return
  emit('create', cliente.value.trim(), nicho.value.trim() || null)
}
</script>

<template>
  <AppDialog v-model:open="open" title="Nova persona" description="Comece pelo cliente. O resto você preenche no editor.">
    <form class="space-y-5" @submit.prevent="submit">
      <div class="space-y-2">
        <Label for="np-cliente">Nome do cliente / empresa *</Label>
        <Input id="np-cliente" v-model="cliente" placeholder="ex: A Portamóvel" autofocus :aria-invalid="touched && invalid" />
        <p v-if="touched && invalid" class="text-xs text-red-400">Informe o nome do cliente.</p>
      </div>
      <div class="space-y-2">
        <Label for="np-nicho">Segmento / nicho</Label>
        <Input id="np-nicho" v-model="nicho" placeholder="ex: Manutenção de portões para condomínios" />
      </div>
      <div class="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" @click="open = false">Cancelar</Button>
        <Button type="submit" :disabled="busy">{{ busy ? 'Criando...' : 'Criar e abrir' }}</Button>
      </div>
    </form>
  </AppDialog>
</template>
