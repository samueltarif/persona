<script setup lang="ts">
import { FORM_SECTIONS } from '~/config/persona'

const open = defineModel<boolean>('open', { default: false })
</script>

<template>
  <AppDialog v-model:open="open" title="Ajuda" description="Como usar o PersonaDoc com seus clientes." wide>
    <div class="space-y-6 text-sm leading-relaxed">
      <section>
        <h3 class="mb-2 font-semibold text-gold">Público-alvo x persona</h3>
        <p class="text-muted-foreground">
          <strong class="text-foreground">Público-alvo</strong> é um grupo amplo (ex.: "síndicos de 40 a 65 anos em SP").
          <strong class="text-foreground">Persona</strong> é um retrato de UMA pessoa típica desse grupo, com dores, medos e jeito de decidir.
          É a persona que guia anúncio, landing page e atendimento.
        </p>
      </section>

      <section>
        <h3 class="mb-2 font-semibold text-gold">Para que serve cada seção</h3>
        <ul class="space-y-1.5 text-muted-foreground">
          <li v-for="s in FORM_SECTIONS" :key="s.id"><strong class="text-foreground">{{ s.label }}:</strong> {{ s.description }}</li>
          <li><strong class="text-foreground">Resumo final:</strong> tudo consolidado, pronto para revisar e exportar.</li>
        </ul>
      </section>

      <section>
        <h3 class="mb-2 font-semibold text-gold">Hipótese x validada</h3>
        <p class="text-muted-foreground">
          Toda persona nasce como <strong class="text-foreground">hipótese</strong>. Só marque <strong class="text-foreground">validada</strong>
          depois de confirmar com o cliente, com o CRM ou com dados reais de campanha. Nunca invente volume de busca, CPC, depoimentos, garantias ou números.
        </p>
      </section>

      <section>
        <h3 class="mb-2 font-semibold text-gold">Termos básicos</h3>
        <ul class="space-y-1.5 text-muted-foreground">
          <li><strong class="text-foreground">Palavra-chave negativa:</strong> termo que impede o anúncio de aparecer (ex.: "curso", "grátis").</li>
          <li><strong class="text-foreground">Intenção transacional:</strong> quem busca já quer contratar ou comprar agora.</li>
          <li><strong class="text-foreground">Big Idea:</strong> a promessa central que diferencia a marca, em uma ou duas frases.</li>
          <li><strong class="text-foreground">CTA:</strong> chamada para ação, como "Fale no WhatsApp".</li>
        </ul>
      </section>

      <section>
        <h3 class="mb-2 font-semibold text-gold">Salvar, progresso e exportar</h3>
        <ul class="list-disc space-y-1.5 pl-5 text-muted-foreground">
          <li>Tudo é <strong class="text-foreground">salvo sozinho na nuvem</strong> (Supabase) segundos depois de você parar de digitar. Funciona em qualquer computador com o seu login.</li>
          <li>O <strong class="text-foreground">progresso</strong> soma 50% dos 3 campos obrigatórios (marcados com *) e 50% dos opcionais. Só visitar a aba não conta.</li>
          <li><strong class="text-foreground">Exportar PDF</strong> abre a janela de impressão do navegador: escolha "Salvar como PDF".</li>
          <li><strong class="text-foreground">Backup JSON</strong> baixa um arquivo que pode ser importado de volta na lista de clientes.</li>
          <li>Campos marcados como complemento não aparecem no vídeo da aula: foram adicionados para Google Ads e negócios B2B.</li>
        </ul>
      </section>
    </div>
  </AppDialog>
</template>
