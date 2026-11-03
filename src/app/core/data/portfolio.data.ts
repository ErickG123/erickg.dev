import { Project } from '../models/project.interface';
import {
  AuthorProfile,
  CareerEntry,
  HeroContent,
  ChapterNav,
  MethodPillar,
  FieldNote
} from '../models/portfolio.interface';

export type {
  AuthorProfile,
  CareerEntry,
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
  volumeId: 'DESENVOLVEDOR FULL-STACK',
  chapterId: 'BRASIL · SOFTWARE & PRODUTO',
  tagline: 'TECNOLOGIA COM PROPÓSITO.',
  description: 'Transformo problemas complexos em soluções de software claras, estruturadas e úteis.',
  primaryCtaText: 'EXPLORAR PROJETOS',
  primaryCtaLink: '#projects',
  secondaryCtaText: 'CONHECER O AUTOR',
  secondaryCtaLink: '#about',
  scrollHintText: 'CONHEÇA MEU TRABALHO',
  illustration: {
    src: '/assets/images/profile/erick-gabriel.png',
    alt: 'Retrato de Erick Gabriel usando óculos e camisa escura.',
    caption: ''
  }
};

/* ==========================================================================
   CONTEÚDO REAL E TIPADO DO AUTOR E SEÇÕES
   ========================================================================== */

export const AUTHOR_DATA: AuthorProfile = {
  name: 'Erick Gabriel',
  alias: 'Erick G.',
  role: 'Desenvolvedor Full-Stack',
  headline: 'Desenvolvimento de software, aplicações web e ferramentas com foco em soluções úteis e bem estruturadas.',
  bio: 'Desenvolvedor Full-Stack com experiência em aplicações web, APIs e automação. Trabalho principalmente com Angular, .NET, Node.js, Python e bancos de dados SQL, participando da análise de requisitos, implementação e evolução de sistemas.',
  journeySummary: 'Minha trajetória inclui desenvolvimento de software na SIALOG Software Solutions e na Compu Informática, além de projetos freelance e atuação atual na Zella Sistemas. Também desenvolvo projetos próprios, como o YomiFlow, ferramenta desktop offline-first para estudo de japonês.',
  currentFocus: 'Angular, .NET e arquitetura de software',
  contactIntro: 'Para conversar sobre desenvolvimento de software, produtos ou oportunidades de colaboração, escolha um dos meus canais profissionais.',
  contactIntroEn: 'For conversations about software development, products, or collaboration, choose one of my professional channels.',
  location: 'Brasil',
  careerPeriod: '2021 – Presente',
  avatarUrl: '/assets/images/profile/erick-gabriel.png',
  skills: [
    {
      category: 'Interfaces e aplicações web',
      description: 'Construção de interfaces consistentes, acessíveis e preparadas para evoluir.',
      mark: '01',
      items: ['Angular', 'TypeScript', 'RxJS', 'SCSS e design systems', 'PWA']
    },
    {
      category: 'Serviços e dados',
      description: 'Implementação de APIs e integração com persistência relacional.',
      mark: '02',
      items: ['.NET e C#', 'Node.js', 'Python', 'PostgreSQL', 'APIs REST']
    },
    {
      category: 'Arquitetura e entrega',
      description: 'Organização do código e automação para manter qualidade no fluxo de entrega.',
      mark: '03',
      items: ['Clean Architecture', 'SOLID', 'Jest e testes', 'GitHub Actions', 'Docker e CI/CD']
    }
  ],
  socialLinks: [
    { name: 'GitHub', url: 'https://github.com/ErickG123', iconLabel: 'GH' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/erickgdev/', iconLabel: 'IN' },
    { name: 'Dev.to', url: 'https://dev.to/erickg123', iconLabel: 'DEV' }
  ],
  pendingNotes: 'Engenharia de software com atenção a arquitetura, clareza e qualidade.'
};

export const CAREER_HISTORY: CareerEntry[] = [
  {
    period: 'Julho de 2026 – atual',
    title: 'Programador Pleno I',
    company: 'Zella Sistemas · YMS',
    summary: 'Atuação atual em desenvolvimento e evolução de software.',
    technologies: ['Angular', '.NET', 'TypeScript']
  },
  {
    period: 'Novembro de 2025 – julho de 2026',
    title: 'Desenvolvedor',
    company: 'Zella Sistemas · YMS',
    summary: 'Desenvolvimento de sistemas e funcionalidades para os produtos da empresa.',
    technologies: ['Aplicações web', 'APIs']
  },
  {
    period: 'Dezembro de 2023 – novembro de 2025',
    title: 'Desenvolvedor de Software',
    company: 'Compu Informática',
    summary: 'Desenvolvimento e manutenção de funcionalidades, contribuindo para a evolução de aplicações utilizadas no dia a dia da empresa.',
    technologies: ['Desenvolvimento web', 'APIs', 'Bancos relacionais']
  },
  {
    period: 'Abril de 2021 – maio de 2023',
    title: 'Desenvolvedor de Software Júnior',
    company: 'SIALOG Software Solutions',
    summary: 'Início da trajetória profissional em desenvolvimento de software, trabalhando na implementação e manutenção de aplicações.',
    technologies: ['Desenvolvimento de software']
  },
  {
    period: 'Em andamento',
    title: 'Projetos independentes',
    company: 'Produtos autorais',
    summary: 'Desenvolvimento de ferramentas e produtos próprios, incluindo o YomiFlow, aplicativo desktop offline-first para estudo de japonês.',
    technologies: ['YomiFlow', 'Angular', 'Tauri', 'Rust']
  }
];

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
    title: 'YomiFlow',
    description: 'Espaço desktop offline-first para estudar japonês por imersão: leitura de mangá, vídeos e áudio, caderno linguístico e revisão espaçada em um só lugar.',
    problem: 'Ferramentas de estudo costumam separar leitura, escuta, anotações e revisão. YomiFlow reúne esses fluxos e mantém os dados de estudo no dispositivo.',
    role: 'Criador & Engenheiro principal — aplicação desktop com Angular, Tauri e núcleo local em Rust.',
    techStack: ['Angular 22', 'TypeScript', 'Tauri 2', 'Rust', 'SQLite', 'FSRS'],
    status: 'Em desenvolvimento ativo',
    url: 'https://github.com/ErickG123/yomiflow',
    repositoryUrl: 'https://github.com/ErickG123/yomiflow',
    demoUrl: 'https://yomiflow-landing.vercel.app/',
    image: '/assets/images/projects/project-yomiflow.jpg',
    imageAlt: 'Captura da interface do YomiFlow durante uma sessão de estudo de japonês.',
    poster: { character: '読む', reading: 'よむ', meaning: 'LEITURA · IMERSÃO', meaningEn: 'READING · IMMERSION', credit: 'YOMIFLOW / IMMERSION', style: 'quiet' },
    highlight: 'Leitura, áudio e revisão japonesa com suporte offline',
    previewSteps: [
      { id: 'reading', label: 'Leitura', labelEn: 'Reading', description: 'Leia mangás em um espaço dedicado ao estudo de japonês por imersão.', descriptionEn: 'Read manga in a workspace dedicated to immersive Japanese study.' },
      { id: 'listening', label: 'Áudio', labelEn: 'Listening', description: 'Estude com áudio e vídeo dentro do mesmo espaço de imersão.', descriptionEn: 'Study with audio and video in the same immersion workspace.' },
      { id: 'review', label: 'Revisão', labelEn: 'Review', description: 'Reúna anotações no caderno linguístico e retome os estudos com revisão espaçada.', descriptionEn: 'Collect notes in the language notebook and revisit them with spaced review.' }
    ],
    year: 2026,
    featured: true,
    layoutSpan: 'col-12'
  },
  {
    id: '2',
    title: 'SchemaLens',
    description: 'Ferramenta desktop para inspecionar e comparar estruturas de bancos Microsoft SQL Server, analisar diferenças e gerar scripts de ajuste.',
    problem: 'Diferenças entre ambientes podem passar despercebidas. O SchemaLens reúne comparação, análise de impacto e histórico em uma interface local.',
    role: 'Criador e engenheiro principal.',
    techStack: ['Angular', 'Tauri 2', 'Rust', 'SQL Server', 'SQLite'],
    status: 'Repositório público',
    url: 'https://github.com/ErickG123/schema-lens',
    repositoryUrl: 'https://github.com/ErickG123/schema-lens',
    image: '/assets/images/projects/schema-lens-architecture.svg',
    imageAlt: 'Diagrama da arquitetura SchemaLens com Angular, Tauri, Rust e SQL Server.',
    poster: { character: '図解', reading: 'ずかい', meaning: 'DIAGRAMA · ARQUITETURA', meaningEn: 'DIAGRAM · ARCHITECTURE', credit: 'SCHEMALENS / DATA TOOLS', style: 'technical' },
    highlight: 'Comparação de esquemas e análise de risco',
    year: 2026,
    featured: true,
    layoutSpan: 'col-6',
    caseStudyUrl: '/case-studies/schema-lens',
    previewSteps: [
      { id: 'architecture', label: 'Arquitetura', labelEn: 'Architecture', description: 'Interface em Angular, runtime desktop em Tauri e módulos de domínio e infraestrutura em Rust.', descriptionEn: 'Angular interface, Tauri desktop runtime, and domain and infrastructure modules in Rust.' },
      { id: 'connection', label: 'Conexões', labelEn: 'Connections', description: 'A documentação registra a escolha do driver Tiberius e compara a alternativa ODBC.', descriptionEn: 'The documentation records the Tiberius driver choice and compares the ODBC alternative.' },
      { id: 'security', label: 'Segurança', labelEn: 'Security', description: 'O projeto documenta armazenamento de credenciais no Windows Credential Manager, sanitização de logs e permissões mínimas.', descriptionEn: 'The project documents Windows Credential Manager storage, sanitized logs, and least privilege.' }
    ]
  },
  {
    id: '3',
    title: 'FlowBI',
    description: 'Plataforma de Business Intelligence com dashboards dinâmicos e automação de regras de processos em fluxos baseados em nós.',
    role: 'Desenvolvimento full-stack da plataforma.',
    techStack: ['Angular', 'NestJS', 'TypeORM', 'PostgreSQL'],
    status: 'Repositório público',
    url: 'https://github.com/ErickG123/FlowBI',
    repositoryUrl: 'https://github.com/ErickG123/FlowBI',
    image: '/assets/images/projects/flowbi-poster.svg',
    imageAlt: 'Ilustração autoral de fluxos conectando dados em um painel FlowBI.',
    poster: { character: '流れ', reading: 'ながれ', meaning: 'FLUXO · DADOS E PROCESSOS', meaningEn: 'FLOW · DATA AND PROCESS', credit: 'FLOWBI / VISUAL SYSTEMS', style: 'flow' },
    highlight: 'Dashboards e regras de processos visuais',
    year: 2026,
    featured: true,
    layoutSpan: 'col-6'
  },
  {
    id: '4',
    title: 'ForensicLab',
    description: 'Aplicação web de documentação interativa para um toolkit modular de análise forense digital.',
    role: 'Desenvolvimento da experiência web e da documentação do projeto.',
    techStack: ['TypeScript', 'Angular', 'Documentação interativa'],
    status: 'Online',
    url: 'https://github.com/ErickG123/forensiclab-spa',
    repositoryUrl: 'https://github.com/ErickG123/forensiclab-spa',
    demoUrl: 'https://forensiclab-spa.vercel.app/',
    image: '/assets/images/projects/forensiclab-poster.svg',
    imageAlt: 'Ilustração autoral de uma linha de evidências para o ForensicLab.',
    poster: { character: '証跡', reading: 'しょうせき', meaning: 'VESTÍGIOS · ANÁLISE DIGITAL', meaningEn: 'TRACES · DIGITAL ANALYSIS', credit: 'FORENSICLAB / FIELD NOTES', style: 'forensic' },
    highlight: 'Documentação acessível para um toolkit modular de perícia digital',
    year: 2026,
    featured: true,
    layoutSpan: 'col-6'
  },
  {
    id: '5',
    title: 'Angular Smart Interceptor',
    description: 'Biblioteca HTTP para Angular que organiza retentativas, tratamento de falhas de rede, deduplicação e renovação de tokens com RxJS.',
    role: 'Criador e mantenedor open source.',
    techStack: ['Angular', 'RxJS', 'TypeScript'],
    status: 'Open source',
    url: 'https://github.com/ErickG123/ngx-smart-interceptor',
    repositoryUrl: 'https://github.com/ErickG123/ngx-smart-interceptor',
    demoUrl: 'https://erickg123.github.io/ngx-smart-interceptor/',
    image: '/assets/images/projects/interceptor-poster.svg',
    imageAlt: 'Ilustração autoral de rotas HTTP protegidas pelo Angular Smart Interceptor.',
    poster: { character: '守る', reading: 'まもる', meaning: 'RESILIÊNCIA · REDE', meaningEn: 'NETWORK RESILIENCE', credit: 'SMART INTERCEPTOR / HTTP', style: 'resilience' },
    highlight: 'Resiliência de rede e controle de requisições',
    year: 2026,
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
