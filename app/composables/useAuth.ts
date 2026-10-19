/**
 * Login por e-mail e senha (Supabase Auth).
 * Não há cadastro pela tela: os usuários são criados no painel do Supabase.
 */
export function useAuth() {
  const supabase = useSupabaseClient()
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function login(email: string, password: string): Promise<boolean> {
    loading.value = true
    error.value = null
    try {
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
      if (authError) {
        error.value = 'E-mail ou senha inválidos.' // nunca revela qual dos dois
        return false
      }
      return true
    }
    catch {
      error.value = 'Não foi possível entrar. Verifique a conexão e tente de novo.'
      return false
    }
    finally {
      loading.value = false
    }
  }

  async function logout(): Promise<void> {
    await supabase.auth.signOut()
    await navigateTo('/login', { replace: true })
  }

  return { login, logout, loading, error }
}
