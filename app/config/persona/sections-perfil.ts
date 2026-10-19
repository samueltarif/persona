import type { SectionDef } from '~/types/persona'
import { CLASSE, ESCOLARIDADE, ESTADO_CIVIL, FAIXA_ETARIA, FILHOS, GENERO, RENDA } from './options'

/** Seções 1 e 2: Dados do cliente e Perfil da persona */

export const secaoCliente: SectionDef = {
  id: 'cliente',
  label: 'Dados do cliente',
  eyebrow: 'Início',
  icon: 'House',
  title: 'Dados do Cliente',
  description: 'Informações básicas sobre o cliente e o negócio. Esses dados são a base de todo o documento.',
  groups: [
    {
      title: 'Identificação do projeto',
      fields: [
        { key: 'empresa', label: 'Nome da empresa / cliente', type: 'text', required: true, placeholder: 'ex: Clínica Bem Estar', span: 3 },
        { key: 'responsavel', label: 'Nome do responsável', type: 'text', placeholder: 'ex: Dr. Ana Lima', span: 3 },
        { key: 'segmento', label: 'Segmento / nicho', type: 'text', placeholder: 'ex: Saúde e bem-estar, Educação...', span: 3 },
        { key: 'produto', label: 'Produto ou serviço principal', type: 'text', placeholder: 'ex: Consultas de nutrição online', span: 3 },
        { key: 'ticket', label: 'Ticket médio (R$)', type: 'number', placeholder: 'ex: 297', span: 3 },
        { key: 'localizacao', label: 'Localização do negócio', type: 'text', placeholder: 'ex: Brasil, São Paulo...', span: 3 },
        { key: 'descricao', label: 'Descrição resumida do negócio', type: 'textarea', placeholder: 'Em poucas linhas, o que o cliente faz e para quem...', span: 6 },
        { key: 'concorrentes', label: 'Principal(is) concorrente(s)', type: 'textarea', rows: 3, placeholder: 'ex: NutriFácil, Dieta+, nutricionistas locais...', span: 6 },
        { key: 'diferencial', label: 'Diferencial competitivo', type: 'textarea', rows: 3, placeholder: 'O que só esse cliente oferece e pode provar?', span: 6 },
      ],
    },
    {
      title: 'Oferta e operação',
      note: 'O que pode e o que não pode ser prometido em anúncios.',
      fields: [
        { key: 'site', label: 'Site / landing page', type: 'text', placeholder: 'https://...', span: 3, enrichment: true },
        { key: 'area', label: 'Área realmente atendida', type: 'text', placeholder: 'ex: São Paulo capital, raio de 15 km', span: 3, enrichment: true },
        { key: 'nao_oferece', label: 'O que NÃO oferece', type: 'textarea', rows: 3, placeholder: 'Serviços, públicos ou regiões que não atende', span: 3, enrichment: true },
        { key: 'horarios', label: 'Horários e tempo de resposta', type: 'textarea', rows: 3, placeholder: 'ex: seg–sex 8h–18h; plantão 24h; responde no WhatsApp em 5 min', span: 3, enrichment: true },
        { key: 'garantia', label: 'Garantia, condições e provas reais', type: 'textarea', rows: 3, placeholder: 'Só o que for verdade e puder ser mostrado', span: 3, enrichment: true },
        { key: 'verba', label: 'Verba de mídia aprovada', type: 'text', placeholder: 'ex: R$ 100/semana', span: 3, enrichment: true },
      ],
    },
  ],
}

export const secaoPersona: SectionDef = {
  id: 'persona',
  label: 'Perfil da persona',
  eyebrow: 'Persona',
  icon: 'User',
  title: 'Perfil da Persona',
  description: 'Características demográficas e psicográficas do cliente ideal.',
  groups: [
    {
      title: 'Dados demográficos',
      fields: [
        { key: 'nome', label: 'Nome fictício da persona', type: 'text', placeholder: 'ex: Mariana', span: 2 },
        { key: 'faixa_etaria', label: 'Faixa etária', type: 'select', options: FAIXA_ETARIA, span: 2 },
        { key: 'genero', label: 'Gênero predominante', type: 'select', options: GENERO, span: 2 },
        { key: 'estado_civil', label: 'Estado civil', type: 'select', options: ESTADO_CIVIL, span: 2 },
        { key: 'filhos', label: 'Tem filhos?', type: 'select', options: FILHOS, span: 2 },
        { key: 'regiao', label: 'Região geográfica', type: 'text', placeholder: 'ex: Sudeste, Brasil todo...', span: 2 },
        { key: 'escolaridade', label: 'Escolaridade', type: 'select', options: ESCOLARIDADE, span: 3 },
        { key: 'renda', label: 'Renda mensal aproximada', type: 'select', options: RENDA, span: 3 },
        { key: 'ocupacao', label: 'Ocupação / profissão', type: 'text', placeholder: 'ex: Funcionário CLT, autônomo, empresário...', span: 3 },
        { key: 'classe', label: 'Classe social', type: 'select', options: CLASSE, span: 3 },
      ],
    },
    {
      title: 'Estilo de vida & interesses',
      fields: [
        { key: 'hobbies', label: 'Hobbies e interesses', type: 'textarea', rows: 3, placeholder: 'O que faz no tempo livre, o que consome...', span: 6 },
        { key: 'valores', label: 'Valores e crenças', type: 'textarea', rows: 3, placeholder: 'O que é importante para ela na hora de escolher?', span: 3, enrichment: true },
        { key: 'rotina', label: 'Rotina típica', type: 'textarea', rows: 3, placeholder: 'Como é um dia normal? Quando tem tempo para pesquisar?', span: 3, enrichment: true },
      ],
    },
    {
      title: 'Contexto de compra B2B (se o cliente vende para empresas)',
      note: 'Deixe em branco se a venda for para pessoa física.',
      fields: [
        { key: 'cargo_decisor', label: 'Cargo de quem decide', type: 'text', placeholder: 'ex: síndico, gerente de compras, sócio', span: 3, enrichment: true },
        { key: 'influenciadores', label: 'Quem mais participa da decisão', type: 'text', placeholder: 'ex: conselho, administradora, zelador', span: 3, enrichment: true },
        { key: 'processo_compra', label: 'Como a empresa compra', type: 'textarea', rows: 3, placeholder: 'ex: pede 3 orçamentos, aprova em reunião, exige nota e contrato', span: 6, enrichment: true },
      ],
    },
  ],
}
