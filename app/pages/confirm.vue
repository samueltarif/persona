<script setup lang="ts">
// Retorno do Supabase Auth (link de convite/recuperação). Ao ter sessão, vai para a lista.
const user = useSupabaseUser()
watch(user, (u) => { if (u) navigateTo('/', { replace: true }) }, { immediate: true })
</script>

<template>
  <main class="flex min-h-screen items-center justify-center text-sm text-muted-foreground">Confirmando acesso...</main>
</template>
