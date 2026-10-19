<script setup lang="ts">
const { login, loading, error } = useAuth()
const email = ref('')
const password = ref('')

async function submit(): Promise<void> {
  if (await login(email.value.trim(), password.value)) await navigateTo('/', { replace: true })
}
</script>

<template>
  <main class="flex min-h-screen items-center justify-center px-4">
    <form class="w-full max-w-sm space-y-6 rounded-2xl border border-border bg-surface p-8" @submit.prevent="submit">
      <div>
        <AppLogo />
        <p class="mt-2 text-sm text-muted-foreground">Personas e briefings de Google Ads para os seus clientes.</p>
      </div>
      <div class="space-y-2">
        <Label for="email">E-mail</Label>
        <Input id="email" v-model="email" type="email" autocomplete="email" required />
      </div>
      <div class="space-y-2">
        <Label for="senha">Senha</Label>
        <Input id="senha" v-model="password" type="password" autocomplete="current-password" required />
      </div>
      <p v-if="error" class="text-sm text-red-400" role="alert">{{ error }}</p>
      <Button type="submit" class="w-full" :disabled="loading">{{ loading ? 'Entrando...' : 'Entrar' }}</Button>
      <p class="text-xs text-muted-foreground">Sem cadastro pela tela: o acesso é criado no painel do Supabase.</p>
    </form>
  </main>
</template>
