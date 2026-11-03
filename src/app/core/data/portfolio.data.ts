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
  volumeIdEn: 'FULL-STACK DEVELOPER',
  chapterId: 'BRASIL · SOFTWARE & PRODUTO',
  chapterIdEn: 'BRAZIL · SOFTWARE & PRODUCT',
  tagline: 'TECNOLOGIA COM PROPÓSITO.',
  taglineEn: 'SOFTWARE WITH PURPOSE.',
  description: 'Transformo problemas complexos em soluções de software claras, estruturadas e úteis.',
  descriptionEn: 'I turn complex problems into clear, well-structured, and useful software.',
  primaryCtaText: 'EXPLORAR PROJETOS',
  primaryCtaTextEn: 'EXPLORE PROJECTS',
  primaryCtaLink: '#projects',
  secondaryCtaText: 'CONHECER O AUTOR',
  secondaryCtaTextEn: 'ABOUT ME',
  secondaryCtaLink: '#about',
  scrollHintText: 'CONHEÇA MEU TRABALHO',
  illustration: {
    src: '/assets/images/profile/erick-gabriel.png',
    alt: 'Retrato de Erick Gabriel usando óculos e camisa escura.',
    altEn: 'Portrait of Erick Gabriel wearing glasses and a dark shirt.',
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
  roleEn: 'Full-Stack Developer',
  headline: 'Desenvolvimento de software, aplicações web e ferramentas com foco em soluções úteis e bem estruturadas.',
  headlineEn: 'I build software, web applications, and tools focused on useful, well-structured solutions.',
  bio: 'Desenvolvedor Full-Stack com experiência em aplicações web, APIs e automação. Trabalho principalmente com Angular, .NET, Node.js, Python e bancos de dados SQL, participando da análise de requisitos, implementação e evolução de sistemas.',
  bioEn: 'Full-Stack Developer experienced in web applications, APIs, and automation. I work mainly with Angular, .NET, Node.js, Python, and SQL databases, contributing to requirements analysis, implementation, and continuous product development.',
  journeySummary: 'Minha trajetória inclui desenvolvimento de software na SIALOG Software Solutions e na Compu Informática, além de projetos freelance e atuação atual na Zella Sistemas. Também desenvolvo projetos próprios, como o YomiFlow, ferramenta desktop offline-first para estudo de japonês.',
  journeySummaryEn: 'My career includes software development at SIALOG Software Solutions and Compu Informática, freelance projects, and my current role at Zella Sistemas. I also build independent projects such as YomiFlow, an offline-first desktop app for learning Japanese.',
  currentFocus: 'Angular, .NET e arquitetura de software',
  currentFocusEn: 'Angular, .NET, and software architecture',
  contactIntro: 'Para conversar sobre desenvolvimento de software, produtos ou oportunidades de colaboração, escolha um dos meus canais profissionais.',
  contactIntroEn: 'For conversations about software development, products, or collaboration, choose one of my professional channels.',
  location: 'Brasil',
  careerPeriod: '2021 – Presente',
  careerPeriodEn: '2021 – Present',
  avatarUrl: '/assets/images/profile/erick-gabriel.png',
  skills: [
    {
      category: 'Interfaces e aplicações web',
      categoryEn: 'Web interfaces and applications',
      description: 'Construção de interfaces consistentes, acessíveis e preparadas para evoluir.',
      descriptionEn: 'Building consistent, accessible interfaces that are ready to evolve.',
      mark: '01',
      items: ['Angular', 'TypeScript', 'RxJS', 'SCSS e design systems', 'PWA'],
      itemsEn: ['Angular', 'TypeScript', 'RxJS', 'SCSS and design systems', 'PWA']
    },
    {
      category: 'Serviços e dados',
      categoryEn: 'Services and data',
      description: 'Implementação de APIs e integração com persistência relacional.',
      descriptionEn: 'Implementing APIs and integrating relational persistence.',
      mark: '02',
      items: ['.NET e C#', 'Node.js', 'Python', 'PostgreSQL', 'APIs REST'],
      itemsEn: ['.NET and C#', 'Node.js', 'Python', 'PostgreSQL', 'REST APIs']
    },
    {
      category: 'Arquitetura e entrega',
      categoryEn: 'Architecture and delivery',
      description: 'Organização do código e automação para manter qualidade no fluxo de entrega.',
      descriptionEn: 'Structuring code and automating workflows to maintain delivery quality.',
      mark: '03',
      items: ['Clean Architecture', 'SOLID', 'Jest e testes', 'GitHub Actions', 'Docker e CI/CD'],
      itemsEn: ['Clean Architecture', 'SOLID', 'Jest and testing', 'GitHub Actions', 'Docker and CI/CD']
    }
  ],
  socialLinks: [
    { name: 'GitHub', url: 'https://github.com/ErickG123', iconLabel: 'GH' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/erickgdev/', iconLabel: 'IN' },
    { name: 'Dev.to', url: 'https://dev.to/erickg123', iconLabel: 'DEV' }
  ],
  pendingNotes: 'Engenharia de software com atenção a arquitetura, clareza e qualidade.',
  pendingNotesEn: 'Software engineering with attention to architecture, clarity, and quality.'
};

export const CAREER_HISTORY: CareerEntry[] = [
  {
    period: 'Julho de 2026 – atual',
    periodEn: 'July 2026 – present',
    title: 'Programador Pleno I',
    titleEn: 'Mid-Level Programmer I',
    company: 'Zella Sistemas · YMS',
    summary: 'Atuação atual em desenvolvimento e evolução de software.',
    summaryEn: 'Currently contributing to software development and ongoing product improvements.',
    technologies: ['Angular', '.NET', 'TypeScript']
  },
  {
    period: 'Novembro de 2025 – julho de 2026',
    periodEn: 'November 2025 – July 2026',
    title: 'Desenvolvedor',
    titleEn: 'Software Developer',
    company: 'Zella Sistemas · YMS',
    summary: 'Desenvolvimento de sistemas e funcionalidades para os produtos da empresa.',
    summaryEn: 'Developed systems and features for the company’s products.',
    technologies: ['Aplicações web', 'APIs']
  },
  {
    period: 'Dezembro de 2023 – novembro de 2025',
    periodEn: 'December 2023 – November 2025',
    title: 'Desenvolvedor de Software',
    titleEn: 'Software Developer',
    company: 'Compu Informática',
    summary: 'Desenvolvimento e manutenção de funcionalidades, contribuindo para a evolução de aplicações utilizadas no dia a dia da empresa.',
    summaryEn: 'Developed and maintained features, contributing to the evolution of applications used in the company’s daily operations.',
    technologies: ['Desenvolvimento web', 'APIs', 'Bancos relacionais']
  },
  {
    period: 'Abril de 2021 – maio de 2023',
    periodEn: 'April 2021 – May 2023',
    title: 'Desenvolvedor de Software Júnior',
    titleEn: 'Junior Software Developer',
    company: 'SIALOG Software Solutions',
    summary: 'Início da trajetória profissional em desenvolvimento de software, trabalhando na implementação e manutenção de aplicações.',
    summaryEn: 'Started my professional software development career, working on application implementation and maintenance.',
    technologies: ['Desenvolvimento de software']
  },
  {
    period: 'Em andamento',
    periodEn: 'Ongoing',
    title: 'Projetos independentes',
    titleEn: 'Independent projects',
    company: 'Produtos autorais',
    companyEn: 'Independent products',
    summary: 'Desenvolvimento de ferramentas e produtos próprios, incluindo o YomiFlow, aplicativo desktop offline-first para estudo de japonês.',
    summaryEn: 'Building independent tools and products, including YomiFlow, an offline-first desktop app for learning Japanese.',
    technologies: ['YomiFlow', 'Angular', 'Tauri', 'Rust'],
    technologiesEn: ['YomiFlow', 'Angular', 'Tauri', 'Rust']
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
    descriptionEn: 'An offline-first desktop space for immersive Japanese study, combining manga, video and audio, a language notebook, and spaced repetition.',
    problem: 'Ferramentas de estudo costumam separar leitura, escuta, anotações e revisão. YomiFlow reúne esses fluxos e mantém os dados de estudo no dispositivo.',
    problemEn: 'Study tools often separate reading, listening, notes, and review. YomiFlow brings these workflows together and keeps study data on the device.',
    role: 'Criador & Engenheiro principal — aplicação desktop com Angular, Tauri e núcleo local em Rust.',
    roleEn: 'Creator and lead engineer — desktop application built with Angular, Tauri, and a local Rust core.',
    techStack: ['Angular 22', 'TypeScript', 'Tauri 2', 'Rust', 'SQLite', 'FSRS'],
    status: 'Em desenvolvimento ativo',
    statusEn: 'Actively developed',
    url: 'https://github.com/ErickG123/yomiflow',
    repositoryUrl: 'https://github.com/ErickG123/yomiflow',
    demoUrl: 'https://yomiflow-landing.vercel.app/',
    image: '/assets/images/projects/project-yomiflow.jpg',
    imageAlt: 'Captura da interface do YomiFlow durante uma sessão de estudo de japonês.',
    imageAltEn: 'YomiFlow interface screenshot during a Japanese study session.',
    poster: { character: '読む', furigana: [{ text: '読', kana: 'よ' }, { text: 'む' }], reading: 'よむ', romaji: 'yomu', translation: 'ler', translationEn: 'to read', meaning: 'LEITURA · IMERSÃO', meaningEn: 'READING · IMMERSION', credit: 'YOMIFLOW / IMMERSION', style: 'quiet' },
    highlight: 'Leitura, áudio e revisão japonesa com suporte offline',
    highlightEn: 'Japanese reading, audio, and review with offline support',
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
    descriptionEn: 'A desktop tool for inspecting and comparing Microsoft SQL Server database schemas, analyzing differences, and generating migration scripts.',
    problem: 'Diferenças entre ambientes podem passar despercebidas. O SchemaLens reúne comparação, análise de impacto e histórico em uma interface local.',
    problemEn: 'Differences between environments can go unnoticed. SchemaLens brings comparison, impact analysis, and history together in a local interface.',
    role: 'Criador e engenheiro principal.',
    roleEn: 'Creator and lead engineer.',
    techStack: ['Angular', 'Tauri 2', 'Rust', 'SQL Server', 'SQLite'],
    status: 'Repositório público',
    statusEn: 'Public repository',
    url: 'https://github.com/ErickG123/schema-lens',
    repositoryUrl: 'https://github.com/ErickG123/schema-lens',
    image: '/assets/images/projects/schema-lens-architecture.svg',
    imageAlt: 'Diagrama da arquitetura SchemaLens com Angular, Tauri, Rust e SQL Server.',
    imageAltEn: 'SchemaLens architecture diagram showing Angular, Tauri, Rust, and SQL Server.',
    poster: { character: '図解', furigana: [{ text: '図', kana: 'ず' }, { text: '解', kana: 'かい' }], reading: 'ずかい', romaji: 'zukai', translation: 'diagrama explicativo', translationEn: 'illustrated diagram', meaning: 'DIAGRAMA · ARQUITETURA', meaningEn: 'DIAGRAM · ARCHITECTURE', credit: 'SCHEMALENS / DATA TOOLS', style: 'technical' },
    highlight: 'Comparação de esquemas e análise de risco',
    highlightEn: 'Schema comparison and risk analysis',
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
    descriptionEn: 'A Business Intelligence platform with dynamic dashboards and process rule automation through node-based workflows.',
    role: 'Desenvolvimento full-stack da plataforma.',
    roleEn: 'Full-stack development of the platform.',
    techStack: ['Angular', 'NestJS', 'TypeORM', 'PostgreSQL'],
    status: 'Repositório público',
    statusEn: 'Public repository',
    url: 'https://github.com/ErickG123/FlowBI',
    repositoryUrl: 'https://github.com/ErickG123/FlowBI',
    image: '/assets/images/projects/flowbi-poster.svg',
    imageAlt: 'Ilustração autoral de fluxos conectando dados em um painel FlowBI.',
    imageAltEn: 'Original illustration of data flows connected in a FlowBI dashboard.',
    poster: { character: '流れ', furigana: [{ text: '流', kana: 'なが' }, { text: 'れ' }], reading: 'ながれ', romaji: 'nagare', translation: 'fluxo', translationEn: 'flow', meaning: 'FLUXO · DADOS E PROCESSOS', meaningEn: 'FLOW · DATA AND PROCESS', credit: 'FLOWBI / VISUAL SYSTEMS', style: 'flow' },
    highlight: 'Dashboards e regras de processos visuais',
    highlightEn: 'Dashboards and visual process rules',
    year: 2026,
    featured: true,
    layoutSpan: 'col-6'
  },
  {
    id: '4',
    title: 'ForensicLab',
    description: 'Aplicação web de documentação interativa para um toolkit modular de análise forense digital.',
    descriptionEn: 'An interactive web documentation app for a modular digital forensics toolkit.',
    role: 'Desenvolvimento da experiência web e da documentação do projeto.',
    roleEn: 'Developed the web experience and project documentation.',
    techStack: ['TypeScript', 'Angular', 'Documentação interativa'],
    status: 'Online',
    statusEn: 'Online',
    url: 'https://github.com/ErickG123/forensiclab-spa',
    repositoryUrl: 'https://github.com/ErickG123/forensiclab-spa',
    demoUrl: 'https://forensiclab-spa.vercel.app/',
    image: '/assets/images/projects/forensiclab-poster.svg',
    imageAlt: 'Ilustração autoral de uma linha de evidências para o ForensicLab.',
    imageAltEn: 'Original illustration of an evidence trail for ForensicLab.',
    poster: { character: '証跡', furigana: [{ text: '証', kana: 'しょう' }, { text: '跡', kana: 'せき' }], reading: 'しょうせき', romaji: 'shōseki', translation: 'trilha de evidências', translationEn: 'evidence trail', meaning: 'VESTÍGIOS · ANÁLISE DIGITAL', meaningEn: 'TRACES · DIGITAL ANALYSIS', credit: 'FORENSICLAB / FIELD NOTES', style: 'forensic' },
    highlight: 'Documentação acessível para um toolkit modular de perícia digital',
    highlightEn: 'Accessible documentation for a modular digital forensics toolkit',
    year: 2026,
    featured: true,
    layoutSpan: 'col-6'
  },
  {
    id: '5',
    title: 'Angular Smart Interceptor',
    description: 'Biblioteca HTTP para Angular que organiza retentativas, tratamento de falhas de rede, deduplicação e renovação de tokens com RxJS.',
    descriptionEn: 'An Angular HTTP library for retries, network failure handling, request deduplication, and token refresh with RxJS.',
    role: 'Criador e mantenedor open source.',
    roleEn: 'Creator and open-source maintainer.',
    techStack: ['Angular', 'RxJS', 'TypeScript'],
    status: 'Open source',
    statusEn: 'Open source',
    url: 'https://github.com/ErickG123/ngx-smart-interceptor',
    repositoryUrl: 'https://github.com/ErickG123/ngx-smart-interceptor',
    demoUrl: 'https://erickg123.github.io/ngx-smart-interceptor/',
    image: '/assets/images/projects/interceptor-poster.svg',
    imageAlt: 'Ilustração autoral de rotas HTTP protegidas pelo Angular Smart Interceptor.',
    imageAltEn: 'Original illustration of HTTP routes protected by Angular Smart Interceptor.',
    poster: { character: '守る', furigana: [{ text: '守', kana: 'まも' }, { text: 'る' }], reading: 'まもる', romaji: 'mamoru', translation: 'proteger', translationEn: 'to protect', meaning: 'RESILIÊNCIA · REDE', meaningEn: 'NETWORK RESILIENCE', credit: 'SMART INTERCEPTOR / HTTP', style: 'resilience' },
    highlight: 'Resiliência de rede e controle de requisições',
    highlightEn: 'Network resilience and request control',
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
