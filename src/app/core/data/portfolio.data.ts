import { Project } from '../models/project.interface';
import {
  AuthorProfile,
  HeroContent,
  ChapterNav,
  MethodPillar,
  FieldNote
} from '../models/portfolio.interface';

export type {
  AuthorProfile,
  HeroContent,
  ChapterNav,
  MethodPillar,
  FieldNote
};

/* ==========================================================================
   CONTEÚDO EDITORIAL CONFIGURÁVEL DO HERO
   ========================================================================== */

export const HERO_DATA: HeroContent = {
  authorName: 'ERICK GABRIEL',
  authorRole: 'FULL-STACK SOFTWARE ENGINEER',
  volumeId: 'VOL. 01 // RUNTIME EDITION',
  chapterId: 'ACT 00 // THE INITIATION',
  tagline: 'I BUILD. I SOLVE. I IMPROVE.',
  description: 'Transformo problemas complexos em soluções de software claras, estruturadas e úteis.',
  primaryCtaText: 'EXPLORAR PROJETOS',
  primaryCtaLink: '#projects',
  secondaryCtaText: 'CONHECER O AUTOR',
  secondaryCtaLink: '#about',
  scrollHintText: 'ROLE PARA ACESSAR O SUMÁRIO DO VOLUME',
  illustration: {
    src: '/assets/images/cover/hero-manga-cover.svg',
    alt: 'Ilustração autoral de capa de mangá: perfil do engenheiro com hoodie técnico, óculos estilizados e telas de código em nanquim.',
    caption: 'VOLUME 01 • HERO FRONTISPIECE • CAPA ORIGINAL AUTORAL'
  }
};

/* ==========================================================================
   CONTEÚDO REAL E TIPADO DO AUTOR E SEÇÕES
   ========================================================================== */

export const AUTHOR_DATA: AuthorProfile = {
  name: 'Erick Gabriel',
  alias: 'Erick G.',
  role: 'Engenheiro de Software Full-Stack',
  headline: 'Arquitetura de sistemas resilientes, interfaces reativas de alto desempenho e ferramentas para desenvolvedores.',
  bio: 'Desenvolvedor focado em ecossistemas de alta performance com Angular moderno (Zoneless, Signals), TypeScript avançado e back-ends estruturados com .NET, Node.js e Python. Dedicado à arquitetura limpa, testes rigorosos e entrega contínua.',
  journeySummary: 'Atuação iniciada em 2022 com desenvolvimento web e interfaces institucionais; evolução contínua para engenharia full-stack, redução de bundles em 45% através de Signals e criação de ferramentas CLI e bibliotecas utilitárias.',
  location: 'Brasil',
  careerPeriod: '2022 – Presente',
  avatarUrl: '/assets/images/profile/author-portrait-nanquim.svg',
  skills: [
    {
      category: 'Front-End Core',
      items: ['Angular 21 (Zoneless, Signals)', 'TypeScript', 'RxJS', 'SCSS / Design Systems', 'PWA']
    },
    {
      category: 'Back-End & Infra',
      items: ['.NET (C#)', 'Node.js', 'Python', 'PostgreSQL', 'Docker', 'REST APIs']
    },
    {
      category: 'Qualidade & Métodos',
      items: ['Jest (TDD)', 'GitHub Actions (CI/CD)', 'Clean Architecture', 'SOLID', 'Vercel']
    }
  ],
  socialLinks: [
    { name: 'GitHub', url: 'https://github.com/ErickG123', iconLabel: 'GH' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/erickgdev/', iconLabel: 'IN' },
    { name: 'Dev.to', url: 'https://dev.to/erickg123', iconLabel: 'DEV' }
  ],
  pendingNotes: '[Aguardando foto editorial oficial em nanquim e depoimento expandido do autor]'
};

export const CHAPTERS_INDEX: ChapterNav[] = [
  {
    num: '00',
    id: 'cover',
    anchor: '#cover',
    title: 'Capa & Frontispício',
    subtitle: 'Abertura do Volume 01 e introdução da jornada',
    pagesCount: 'P. 01–03'
  },
  {
    num: '01',
    id: 'index-section',
    anchor: '#index-section',
    title: 'Mokuroku (Sumário)',
    subtitle: 'Mapeamento estrutural de todo o volume',
    pagesCount: 'P. 04–05'
  },
  {
    num: '02',
    id: 'projects',
    anchor: '#projects',
    title: 'Obras Selecionadas',
    subtitle: 'Quatro projetos autorais de engenharia de software',
    pagesCount: 'P. 06–15'
  },
  {
    num: '03',
    id: 'method',
    anchor: '#method',
    title: 'O Método: Think, Break, Rebuild',
    subtitle: 'A esteira de pensamento, testes e refatoração',
    pagesCount: 'P. 16–22'
  },
  {
    num: '04',
    id: 'notes',
    anchor: '#notes',
    title: 'Field Notes & Ensaios',
    subtitle: 'Caderno de campo com aprendizados e arquitetura',
    pagesCount: 'P. 23–28'
  },
  {
    num: '05',
    id: 'about',
    anchor: '#about',
    title: 'Ficha do Engenheiro',
    subtitle: 'Trajetória, atributos técnicos e histórico profissional',
    pagesCount: 'P. 29–34'
  },
  {
    num: 'EP',
    id: 'contact',
    anchor: '#contact',
    title: 'Colofão & Transmissão',
    subtitle: 'Canais de comunicação, parcerias e dados de publicação',
    pagesCount: 'P. 35'
  }
];

export const FEATURED_PROJECTS_DATA: Project[] = [
  {
    id: '1',
    title: "The Architect's Forge",
    description: 'CLI corporativa para estruturar aplicações Angular com arquitetura em camadas, suporte nativo a Docker, NgRx SignalStore e padronização corporativa.',
    problem: 'A criação manual de boilerplate para projetos Angular corporativos com Clean Architecture introduz inconsistências estruturais e consome dias de configuração repetitiva.',
    role: 'Criador & Engenheiro Principal (Arquitetura CLI, gerador de scaffolds e integração Docker)',
    techStack: ['Angular 21', 'TypeScript', 'Node.js', 'Docker', 'SCSS'],
    status: 'Estável // Publicado',
    url: 'https://github.com/ErickG123/ng-architect-cli',
    repositoryUrl: 'https://github.com/ErickG123/ng-architect-cli',
    caseStudyUrl: '/case-studies/1',
    image: '/assets/images/projects/project-architect-forge.svg',
    highlight: 'Automação de scaffolds prontos para produção em segundos',
    year: 2024,
    featured: true,
    layoutSpan: 'col-6'
  },
  {
    id: '2',
    title: 'Cyber Sleuth Toolkit',
    description: 'Kit e CLI voltados à perícia cibernética e investigação digital forense, estruturado para extração, análise e mapeamento de evidências.',
    problem: 'Peritos forenses e pesquisadores de segurança demandam ferramentas de CLI velozes para extração de artefatos de memória e rede sem corromper a cadeia de custódia.',
    role: 'Autor & Desenvolvedor Principal (Desenvolvimento de scripts de dissecação e empacotamento PyPI)',
    techStack: ['Python', 'Docker', 'CLI Forense', 'Linux'],
    status: 'Estável // PyPI',
    url: 'https://github.com/ErickG123/devkit_forense',
    repositoryUrl: 'https://github.com/ErickG123/devkit_forense',
    caseStudyUrl: '/case-studies/2',
    image: '/assets/images/projects/project-cyber-sleuth.svg',
    highlight: 'Pacote forense distribuído oficialmente via PyPI (forensic-cli)',
    year: 2023,
    featured: true,
    layoutSpan: 'col-6'
  },
  {
    id: '3',
    title: 'Network Guardian Node',
    description: 'Pipeline HTTP inteligente para Angular focado em resiliência de rede. Gerencia tentativas de reconexão, renovação transparente de tokens e deduplicação de requisições com RxJS.',
    problem: 'Falhas intermitentes de conectividade e requisições concorrentes causam perda de dados, múltiplos disparos desnecessários à API e expiração silenciosa de sessões.',
    role: 'Autor & Mantenedor Open Source (Arquitetura do interceptor HTTP com RxJS, gestão de retry e deduplicação)',
    techStack: ['Angular', 'RxJS', 'TypeScript', 'HTTP Gateway'],
    status: 'Estável // Open Source',
    url: 'https://github.com/ErickG123/ngx-smart-interceptor',
    repositoryUrl: 'https://github.com/ErickG123/ngx-smart-interceptor',
    caseStudyUrl: '/case-studies/3',
    image: '/assets/images/projects/project-network-guardian.svg',
    highlight: 'Escudo na camada de rede contra falhas e requisições duplicadas',
    year: 2024,
    featured: true,
    layoutSpan: 'col-6'
  },
  {
    id: '4',
    title: 'Otaku Courier Network',
    description: 'Sistema de distribuição e curadoria de conteúdo informativo sobre animes e mangás, conectando leitores através de newsletter e sinalização em tempo real.',
    problem: 'Entusiastas e leitores enfrentam fontes dispersas de lançamentos editoriais e necessitam de uma curadoria centralizada com envio pontual de newsletters.',
    role: 'Engenheiro Frontend & Criador (Desenvolvimento da interface Angular, integração Firebase e deploy Vercel Edge)',
    techStack: ['Angular', 'Firebase', 'TypeScript', 'Vercel Edge'],
    status: 'Beta // Online',
    url: 'https://anime-newsletter-sooty.vercel.app/',
    repositoryUrl: 'https://github.com/ErickG123',
    demoUrl: 'https://anime-newsletter-sooty.vercel.app/',
    caseStudyUrl: '#projects',
    image: '/assets/images/projects/project-otaku-courier.svg',
    highlight: 'Plataforma temática com entrega contínua hospedada na nuvem',
    year: 2024,
    featured: true,
    layoutSpan: 'col-6'
  }
];

export const METHOD_PILLARS: MethodPillar[] = [
  {
    step: 'ACT I',
    title: 'THINK',
    subtitle: 'Modelagem de Domínio & Contratos Estritos',
    description: 'Antes de escrever a primeira linha de interface, as fronteiras e contratos do sistema são dissecados. Uso rigoroso de tipagem TypeScript, modelagem de estado unidirecional com Signals e desacoplamento de serviços.',
    principles: [
      'Separação estrita de responsabilidades (Clean Architecture)',
      'Modelagem de dados tipada antes da UI',
      'Minimização deliberada de dependências de terceiros'
    ]
  },
  {
    step: 'ACT II',
    title: 'BREAK',
    subtitle: 'Caos Controlado, Testes & Resiliência',
    description: 'Software só é confiável quando é testado sob estresse. Criação de suítes de testes unitários com Jest, simulação de falhas de rede, tratamento de exceções de borda e garantia de esteiras CI que bloqueiam regressões.',
    principles: [
      'Testes unitários abrangentes protegendo regras de negócio',
      'Validação de fluxos com mocks isolados',
      'CI no GitHub Actions bloqueando merges com build ou testes quebrados'
    ]
  },
  {
    step: 'ACT III',
    title: 'REBUILD',
    subtitle: 'Refatoração de Alta Performance & Entrega',
    description: 'Lapidação do código e otimização obsessiva de bundle. Substituição de soluções pesadas por alternativas nativas mais leves (como a migração de NgRx para Signals com -45% de bundle inicial) e publicação PWA.',
    principles: [
      'Auditoria de orçamentos de performance (Budget Guard)',
      'Adoção de Zoneless Change Detection no Angular',
      'Acessibilidade WCAG e suporte a movimento reduzido'
    ]
  }
];

export const FIELD_NOTES_DATA: FieldNote[] = [
  {
    id: 'note-01',
    date: '2024.10',
    category: 'ARQUITETURA',
    title: 'Desacoplando Estado Global: Do NgRx ao Angular Signals Zoneless',
    synopsis: 'Como a migração de stores centralizadas para Signals nativos reduziu em 45% o tamanho do bundle inicial e eliminou complexidade desnecessária em componentes de tela.',
    readTime: '5 MIN LECTURE',
    linkText: 'LER NOTA COMPLETA'
  },
  {
    id: 'note-02',
    date: '2024.08',
    category: 'RESILIÊNCIA',
    title: 'Resiliência HTTP no Front-End: Interceptando e Tratando Falhas em Tempo Real',
    synopsis: 'Padrões práticos de RxJS para tratamento transparente de expiração de tokens JWT, deduplicação de requisições idênticas em trânsito e estratégias de retry exponencial.',
    readTime: '6 MIN LECTURE',
    linkText: 'LER NOTA COMPLETA'
  },
  {
    id: 'note-03',
    date: '2024.07',
    category: 'AUTOMAÇÃO',
    title: 'Automação Forense: Criando Ferramentas de Linha de Comando em Python e Docker',
    synopsis: 'Lições aprendidas na construção e empacotamento do devkit_forense para distribuição no PyPI com ambientes conteinerizados reproduzíveis.',
    readTime: '7 MIN LECTURE',
    linkText: 'LER NOTA COMPLETA'
  }
];
