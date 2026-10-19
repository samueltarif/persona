// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: false, // ferramenta interna: roda só no navegador, sem SEO

  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/supabase'],

  tailwindcss: { cssPath: '~/assets/css/main.css' },

  app: {
    head: {
      title: 'PersonaDoc',
      htmlAttrs: { lang: 'pt-BR' },
      meta: [{ name: 'robots', content: 'noindex, nofollow' }],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Syne:wght@700;800&display=swap' },
      ],
    },
  },

  // Login obrigatório: tudo exige sessão, exceto /login
  supabase: {
    types: false,
    redirect: true,
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: [],
    },
  },

  components: [
    { path: '~/components/ui', extensions: ['.vue'], pathPrefix: false },
    { path: '~/components', extensions: ['.vue'], pathPrefix: false },
  ],
})
