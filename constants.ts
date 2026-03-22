import { NewsItem, EventItem, Task, OKR, Module, Invention } from './types';

// :BACKEND_INTEGRATION_POINT: Fetch from CMS/Database
export const MOCK_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'Nova Regulamentação de IA no Brasil',
    summary: 'Entenda os impactos do PL 2338/2023 para startups jurídicas e como se preparar.',
    date: '12 Out, 2023',
    category: 'Regulação'
  },
  {
    id: '2',
    title: 'Hackathon Jurídico 2024',
    summary: 'Inscrições abertas para o maior evento de inovação do laboratório.',
    date: '10 Out, 2023',
    category: 'Eventos'
  }
];

// :BACKEND_INTEGRATION_POINT: Fetch from Google Calendar API or DB
export const MOCK_EVENTS: EventItem[] = [
  {
    id: '1',
    title: 'Mentoria com Dr. Silva',
    date: '15 Out',
    time: '14:00',
    location: 'Sala de Reuniões 3'
  },
  {
    id: '2',
    title: 'Workshop de Design Thinking',
    date: '18 Out',
    time: '09:00',
    location: 'Auditório Principal'
  }
];

// :BACKEND_INTEGRATION_POINT: Fetch from Project Management Tool (Jira/Trello/DB)
export const MOCK_TASKS: Task[] = [
  { id: '1', title: 'Definir persona do projeto', assignee: 'Ana', status: 'done', priority: 'high' },
  { id: '2', title: 'Prototipar tela de login', assignee: 'Carlos', status: 'doing', priority: 'medium' },
  { id: '3', title: 'Entrevistar stakeholders', assignee: 'Beatriz', status: 'todo', priority: 'high' },
  { id: '4', title: 'Revisar jurisprudência', assignee: 'João', status: 'todo', priority: 'low' },
];

export const MOCK_OKRS: OKR[] = [
  {
    id: '1',
    objective: 'Validar o MVP com 5 escritórios parceiros',
    keyResults: [
      { id: 'kr1', title: 'Realizar 20 entrevistas de profundidade', progress: 80 },
      { id: 'kr2', title: 'Obter 5 cartas de intenção', progress: 40 },
    ]
  }
];

export const MOCK_MODULES_BUSINESS: Module[] = [
  { id: '1', title: 'Lean Startup para Juristas', duration: '15 min', completed: true, type: 'article' },
  { id: '2', title: 'Business Model Canvas', duration: '25 min', completed: false, type: 'video' },
  { id: '3', title: 'Pitch Deck Perfeito', duration: '40 min', completed: false, type: 'video' },
];

export const MOCK_MODULES_TECH: Module[] = [
  { id: '1', title: 'Fundamentos de Python', duration: '20 min', completed: true, type: 'article' },
  { id: '2', title: 'APIs e Integrações', duration: '30 min', completed: true, type: 'video' },
  { id: '3', title: 'Introdução a NLP', duration: '45 min', completed: false, type: 'article' },
];

export const MOCK_INVENTIONS: Invention[] = [
  {
    id: '1',
    title: 'Smart Contract Auditor',
    shortDescription: 'Ferramenta de análise automática de vulnerabilidades em contratos inteligentes na rede Ethereum.',
    fullDescription: 'O Smart Contract Auditor utiliza uma combinação de análise estática e aprendizado de máquina para identificar brechas de segurança comuns, como Reentrancy Attacks e Integer Overflows. Desenvolvido para auxiliar advogados e desenvolvedores na auditoria preliminar de código Solidity.',
    tags: ['Blockchain', 'IA', 'Segurança', 'Solidity'],
    ownerSquad: 'Squad Beta',
    ownerSquadId: 'beta',
    links: [
      { label: 'Repositório GitHub', url: '#' },
      { label: 'Documentação Técnica', url: '#' }
    ]
  },
  {
    id: '2',
    title: 'Jurimetria Preditiva Trabalhista',
    shortDescription: 'Modelo estatístico para previsão de sentenças em varas trabalhistas de São Paulo.',
    fullDescription: 'Baseado em um dataset de mais de 50.000 processos públicos, este modelo utiliza NLP para categorizar pedidos e prever a probabilidade de procedência parcial ou total, ajudando na definição de provisões financeiras.',
    tags: ['Data Science', 'Trabalhista', 'NLP', 'Jurimetria'],
    ownerSquad: 'Squad Gamma',
    ownerSquadId: 'gamma',
    links: [
      { label: 'Dashboard PowerBI', url: '#' },
      { label: 'Dataset (Anonimizado)', url: '#' }
    ]
  },
  {
    id: '3',
    title: 'Visual Law Generator',
    shortDescription: 'Plugin para Word que transforma cláusulas contratuais complexas em ícones e fluxogramas.',
    fullDescription: 'Facilite a compreensão de documentos jurídicos. O plugin lê o texto selecionado e sugere representações visuais baseadas em uma biblioteca proprietária de ícones jurídicos.',
    tags: ['Design', 'Visual Law', 'Produtividade'],
    ownerSquad: 'Squad Alpha', // Same as current user (for demo)
    ownerSquadId: 'alpha',
    links: [
      { label: 'Download Plugin', url: '#' }
    ]
  },
  {
    id: '4',
    title: 'IA Generativa para Contratos',
    shortDescription: 'Ferramenta para auxiliar na redação e revisão de contratos usando IA generativa',
    fullDescription: 'Uma solução avançada que utiliza LLMs para sugerir cláusulas, revisar consistência terminológica e automatizar a criação de minutas contratuais baseadas em parâmetros pré-definidos.',
    tags: ['IA', 'Contratos Inteligentes', 'Produtividade'],
    ownerSquad: 'Squad Alpha',
    ownerSquadId: 'alpha',
    links: [
      { label: 'Demonstração', url: '#' }
    ]
  }
];