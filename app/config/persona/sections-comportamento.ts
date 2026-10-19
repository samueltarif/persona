import type { SectionDef } from '~/types/persona'
import { DISPOSITIVO, FORMATOS, FREQUENCIA, GATILHOS, REDES, TEMPO_DECISAO } from './options'

/** Seções 3, 4 e 5: Dores & desejos, Comportamento digital e Jornada de compra */

export const secaoDores: SectionDef = {
  id: 'dores',
  label: 'Dores & desejos',
  eyebrow: 'Psicologia',
  icon: 'HeartCrack',
  title: 'Dores & Desejos',
  description: 'O coração da persona: entender o que ela sofre e o que sonha é o que torna os anúncios relevantes.',
  groups: [
    {
      title: 'Dores principais',
      fields: [
        { key: 'principal', label: 'Principal dor / problema que o produto resolve', type: 'textarea', required: true, placeholder: 'ex: Não consigo emagrecer mesmo tentando várias dietas, me sinto perdida...', span: 6 },
        { key: 'secundarias', label: 'Outras dores secundárias', type: 'textarea', placeholder: 'Liste outras dores, frustrações ou obstáculos que ela enfrenta...', span: 6 },
        { key: 'ja_tentou', label: 'O que ela já tentou antes (e não funcionou)?', type: 'textarea', placeholder: 'ex: Já tentou academia, remédio, dieta por conta própria...', span: 6 },
        { key: 'custo_emocional', label: 'Qual é o custo emocional desse problema?', type: 'textarea', rows: 3, placeholder: 'ex: Vergonha, ansiedade, baixa autoestima, isolamento social...', span: 6 },
        { key: 'medos', label: 'Medos e riscos que ela quer evitar', type: 'textarea', rows: 3, placeholder: 'ex: ser enganada, perder dinheiro, ser responsabilizada...', span: 6, enrichment: true },
      ],
    },
    {
      title: 'Desejos e objeções',
      fields: [
        { key: 'desejos', label: 'Desejos e sonhos', type: 'textarea', rows: 3, placeholder: 'O que ela quer conquistar?', span: 3, enrichment: true },
        { key: 'transformacao', label: 'Transformação esperada', type: 'textarea', rows: 3, placeholder: 'Como é a vida dela depois de resolver o problema?', span: 3, enrichment: true },
        { key: 'objecoes', label: 'Objeções de compra', type: 'textarea', rows: 3, placeholder: 'ex: é caro, não confio, não tenho tempo...', span: 6, enrichment: true },
      ],
    },
  ],
}

export const secaoDigital: SectionDef = {
  id: 'digital',
  label: 'Comportamento digital',
  eyebrow: 'Digital',
  icon: 'ChartColumn',
  title: 'Comportamento Digital',
  description: 'Como a persona navega na internet, quais plataformas usa e como consome conteúdo.',
  groups: [
    {
      title: 'Redes sociais e plataformas',
      fields: [
        { key: 'redes', label: 'Principais redes sociais utilizadas', type: 'chips', multiple: true, options: REDES, span: 6 },
        { key: 'dispositivo', label: 'Dispositivo mais usado', type: 'chips', multiple: false, options: DISPOSITIVO, span: 3 },
        { key: 'frequencia', label: 'Frequência de uso de internet', type: 'chips', multiple: false, options: FREQUENCIA, span: 3 },
      ],
    },
    {
      title: 'Consumo de conteúdo',
      fields: [
        { key: 'formatos', label: 'Formatos de conteúdo preferidos', type: 'chips', multiple: true, options: FORMATOS, span: 3 },
        { key: 'referencias', label: 'Perfis / canais que segue (referências)', type: 'textarea', rows: 3, placeholder: 'ex: perfis, canais, grupos, portais do setor...', span: 3 },
        { key: 'pesquisa', label: 'Hábitos de pesquisa', type: 'textarea', rows: 3, placeholder: 'ex: pesquisa no Google pelo celular, pede indicação em grupos...', span: 6, enrichment: true },
      ],
    },
  ],
}

export const secaoJornada: SectionDef = {
  id: 'jornada',
  label: 'Jornada de compra',
  eyebrow: 'Jornada',
  icon: 'Route',
  title: 'Jornada de Compra',
  description: 'Como a persona passa do problema à decisão de compra.',
  groups: [
    {
      title: 'Processo de decisão',
      fields: [
        { key: 'consciencia', label: 'Como ela descobre soluções (fase de consciência)?', type: 'textarea', placeholder: 'ex: Google, indicação de amigos, redes sociais, médico...', span: 6 },
        { key: 'consideracao', label: 'O que ela pesquisa antes de comprar (fase de consideração)?', type: 'textarea', placeholder: 'ex: Compara preços, assiste reviews, procura depoimentos...', span: 6 },
        { key: 'clique', label: 'O que a faz clicar em um anúncio?', type: 'textarea', placeholder: 'ex: Promessa clara, prazo, depoimento real...', span: 6 },
        { key: 'gatilhos', label: 'O que a faz tomar a decisão de compra (gatilhos)?', type: 'chips', multiple: true, options: GATILHOS, span: 6, help: 'Use só gatilhos verdadeiros: urgência e escassez inventadas violam as políticas de anúncio.' },
        { key: 'duvidas', label: 'Objeções e dúvidas antes de decidir', type: 'textarea', rows: 3, placeholder: 'O que ela pergunta antes de fechar?', span: 6, enrichment: true },
      ],
    },
    {
      title: 'Momentos de compra',
      note: 'A mesma persona pode comprar de jeitos diferentes (ex.: urgência x planejado).',
      fields: [
        { key: 'momentos', label: 'Momentos em que ela compra', type: 'textarea', rows: 3, placeholder: 'ex: 1) emergência: decide em minutos; 2) contrato: decide em semanas', span: 3, enrichment: true },
        { key: 'tempo_decisao', label: 'Tempo típico de decisão', type: 'select', options: TEMPO_DECISAO, span: 3, enrichment: true },
      ],
    },
  ],
}
