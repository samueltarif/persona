import type { SectionDef } from '~/types/persona'
import { ESTILO_VISUAL, FORMALIDADE, INTENCAO, PROVA_SOCIAL, SECOES_SITE, TOM } from './options'

/** Seções 6, 7 e 8: Comunicação, Google Ads Search e Site & landing page */

export const secaoComunicacao: SectionDef = {
  id: 'comunicacao',
  label: 'Comunicação & tom',
  eyebrow: 'Tom de voz',
  icon: 'MessageCircle',
  title: 'Comunicação & Tom de Voz',
  description: 'Como falar com a persona para criar conexão e gerar confiança.',
  groups: [
    {
      title: 'Linguagem e tom',
      fields: [
        { key: 'tom', label: 'Tom de comunicação ideal', type: 'chips', multiple: true, options: TOM, span: 3 },
        { key: 'formalidade', label: 'Nível de formalidade', type: 'chips', multiple: false, options: FORMALIDADE, span: 3 },
        { key: 'ressoam', label: 'Palavras-chave que ressoam com a persona', type: 'text', placeholder: 'ex: "resultado comprovado", "sem sofrimento", "do seu jeito"...', span: 6 },
        { key: 'evitar', label: 'Palavras / termos para evitar', type: 'text', placeholder: 'ex: evitar jargões muito técnicos, termos negativos...', span: 6 },
        { key: 'big_idea', label: 'Mensagem principal (Big Idea da comunicação)', type: 'textarea', rows: 3, placeholder: 'Em 1–2 frases: qual a promessa central que diferencia a marca?', span: 6 },
      ],
    },
  ],
}

export const secaoAds: SectionDef = {
  id: 'ads',
  label: 'Google Ads Search',
  eyebrow: 'Google Ads',
  icon: 'Search',
  title: 'Google Ads — Rede de Pesquisa',
  description: 'Informações específicas para estruturar as campanhas de Search.',
  groups: [
    {
      title: 'Intenção de busca',
      note: 'Hipóteses: confirme volume e lance no Planejador de Palavras-chave antes de criar a campanha.',
      fields: [
        { key: 'palavras', label: 'Palavras-chave principais que a persona usaria no Google', type: 'textarea', required: true, placeholder: 'ex: nutricionista online, como emagrecer rápido, dieta para emagrecer...', help: 'Liste pelo menos 10 termos que seu cliente ideal digitaria.', span: 6 },
        { key: 'negativas', label: 'Palavras-chave negativas (irrelevantes)', type: 'textarea', placeholder: 'ex: grátis, receita, nutricionista veterinário, bula...', help: 'Cuidado: não negative "preço", "orçamento" ou bairros atendidos sem olhar os dados.', span: 6 },
        { key: 'intencao', label: 'Intenção de busca predominante', type: 'chips', multiple: true, options: INTENCAO, span: 6 },
      ],
    },
    {
      title: 'Segmentação e mensagem',
      fields: [
        { key: 'geo', label: 'Área geográfica dos anúncios', type: 'text', placeholder: 'ex: raios de 5 km nos bairros X, Y', span: 3, enrichment: true },
        { key: 'horarios_busca', label: 'Dias e horários de maior procura', type: 'text', placeholder: 'ex: seg–sáb 7h–20h; emergência à noite', span: 3, enrichment: true },
        { key: 'proposta', label: 'Proposta de valor para o anúncio', type: 'textarea', rows: 3, placeholder: 'O benefício que faz a persona escolher este anúncio e não o do lado', span: 6, enrichment: true },
        { key: 'titulos', label: 'Ideias de títulos (até 30 caracteres)', type: 'textarea', rows: 4, placeholder: 'Um por linha', span: 3, enrichment: true },
        { key: 'descricoes', label: 'Ideias de descrições (até 90 caracteres)', type: 'textarea', rows: 4, placeholder: 'Uma por linha', span: 3, enrichment: true },
        { key: 'ctas', label: 'Chamadas para ação', type: 'text', placeholder: 'ex: Peça orçamento, Fale no WhatsApp, Ligue agora', span: 3, enrichment: true },
        { key: 'concorrentes_ads', label: 'Concorrentes que anunciam', type: 'text', placeholder: 'Quem aparece nas buscas e com qual promessa', span: 3, enrichment: true },
      ],
    },
  ],
}

export const secaoSite: SectionDef = {
  id: 'site',
  label: 'Site & landing page',
  eyebrow: 'Site',
  icon: 'Globe',
  title: 'Site & Landing Page',
  description: 'Informações para criação do site profissional e landing pages de conversão.',
  groups: [
    {
      title: 'Identidade visual e conteúdo',
      fields: [
        { key: 'cores', label: 'Cores preferidas da marca', type: 'text', placeholder: 'ex: azul marinho + dourado, verde + branco...', span: 3 },
        { key: 'estilo', label: 'Estilo visual de referência', type: 'chips', multiple: true, options: ESTILO_VISUAL, span: 3 },
        { key: 'secoes', label: 'Seções essenciais do site', type: 'chips', multiple: true, options: SECOES_SITE, span: 3 },
        { key: 'refs_sites', label: 'Concorrentes com sites que podem servir de referência', type: 'text', placeholder: 'ex: site A, site B...', span: 3 },
        { key: 'cta', label: 'Principal CTA do site / landing page', type: 'text', placeholder: 'ex: Agendar consulta grátis, Baixar e-book, Falar no WhatsApp...', span: 6 },
        { key: 'prova_social', label: 'Prova social disponível', type: 'chips', multiple: true, options: PROVA_SOCIAL, span: 6, help: 'Só marque o que existe e tem autorização de uso. Nunca crie depoimentos.' },
        { key: 'recursos', label: 'Materiais que o cliente pode fornecer', type: 'textarea', rows: 3, placeholder: 'ex: logo em alta, fotos reais da equipe e dos serviços, vídeos, certificados', span: 6, enrichment: true },
      ],
    },
  ],
}
