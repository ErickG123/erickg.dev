import { CaseStudy } from '../models/case-study.model';

export const CASE_STUDIES_DATA: CaseStudy[] = [
  {
    id: 'schema-lens',
    projectId: 'schema-lens',
    caseNumber: 'ESTUDO DE CASO / 01',
    title: 'SchemaLens',
    subtitle: 'Inspeção, comparação estrutural e análise de risco para SQL Server.',
    subtitleEn: 'Schema inspection, comparison, and risk analysis for SQL Server.',
    category: 'Aplicação desktop · Ferramentas de dados',
    categoryEn: 'Desktop application · Data tools',
    date: '2026 · Em desenvolvimento',
    author: 'Erick Gabriel',
    readTime: '5 min de leitura',
    heroIllustration: '/assets/images/projects/schema-lens-architecture.svg',
    githubUrl: 'https://github.com/ErickG123/schema-lens',
    documentationUrl: 'https://github.com/ErickG123/schema-lens/tree/main/docs',
    statusBadge: 'Repositório público',
    statusBadgeEn: 'Public repository',
    techStack: ['Angular', 'Tauri 2', 'Rust', 'SQL Server', 'SQLite'],

    context: {
      title: 'Contexto',
      titleEn: 'Context',
      content: 'SchemaLens é uma ferramenta desktop para inspecionar e comparar estruturas de bancos Microsoft SQL Server. A documentação descreve comparações entre bancos conectados e arquivos SQL, com leitura das estruturas, visualização de diferenças e geração de scripts.',
      contentEn: 'SchemaLens is a desktop tool for inspecting and comparing Microsoft SQL Server database schemas. Its documentation covers comparisons between connected databases and SQL files, including schema inspection, difference views, and script generation.'
    },

    problem: {
      title: 'Problema a resolver',
      titleEn: 'Problem to solve',
      content: 'Diferenças de estrutura entre ambientes podem passar despercebidas até uma publicação. O projeto reúne a comparação em uma interface que também documenta impacto, histórico e opções de correção.',
      contentEn: 'Schema differences between environments can go unnoticed until a release. The project brings comparison into one interface and also documents impact, history, and correction options.',
      highlightBox: {
        title: 'OBJETIVO DO PRODUTO',
        titleEn: 'PRODUCT GOAL',
        text: 'Ajudar a entender o que mudou entre dois esquemas e quais alterações merecem atenção antes de gerar um script.',
        textEn: 'Help users understand what changed between two schemas and which differences need attention before generating a script.',
        type: 'vermilion'
      }
    },

    constraints: {
      title: 'Restrições consideradas',
      titleEn: 'Constraints considered',
      content: 'Os documentos de arquitetura e segurança registram requisitos de conexão, privacidade e operação desktop.',
      contentEn: 'The architecture and security documents record requirements for connections, privacy, and desktop operation.',
      bulletPoints: [
        'Suporte a autenticação SQL Server e autenticação integrada do Windows.',
        'Conexões criptografadas com configuração explícita para certificados.',
        'Credenciais protegidas pelo Windows Credential Manager e logs sanitizados.',
        'Operações demoradas devem informar progresso e permitir cancelamento.'
      ],
      bulletPointsEn: [
        'Support for SQL Server authentication and Windows integrated authentication.',
        'Encrypted connections with explicit certificate configuration.',
        'Credentials protected by Windows Credential Manager and sanitized logs.',
        'Long-running operations report progress and support cancellation.'
      ]
    },

    alternativesConsidered: {
      title: 'Uma decisão documentada: conexão SQL Server',
      titleEn: 'A documented decision: SQL Server connectivity',
      content: 'O ADR-001 compara o driver Tiberius com a alternativa baseada em ODBC e explica a escolha adotada para o backend Rust.',
      contentEn: 'ADR-001 compares the Tiberius driver with the ODBC alternative and explains the choice made for the Rust backend.',
      bulletPoints: [
        'Tiberius com Tokio: integração Rust assíncrona sem exigir instalação adicional de um driver ODBC.',
        'ODBC: aproveita o driver oficial da Microsoft, mas adiciona um pré-requisito no computador e exige cuidado com chamadas bloqueantes.',
        'Escolha registrada: Tiberius, com autenticação integrada do Windows considerada nos requisitos do projeto.'
      ],
      bulletPointsEn: [
        'Tiberius with Tokio: asynchronous Rust integration without requiring an additional ODBC driver installation.',
        'ODBC: uses Microsoft’s official driver, but adds a machine prerequisite and requires care around blocking calls.',
        'Recorded choice: Tiberius, with Windows integrated authentication included in the project requirements.'
      ]
    },

    architectureDecisions: {
      title: 'Arquitetura e decisões',
      titleEn: 'Architecture and decisions',
      content: 'A arquitetura separa a interface Angular, a camada desktop Tauri e o backend Rust em módulos especializados. O documento de arquitetura detalha responsabilidades e fluxo entre essas partes.',
      contentEn: 'The architecture separates the Angular interface, Tauri desktop layer, and Rust backend into specialized modules. The architecture document describes the responsibilities and flow between these parts.',
      bulletPoints: [
        'Angular concentra interface, estado reativo e serviços de domínio.',
        'Tauri fornece a ponte IPC e aplica permissões do aplicativo desktop.',
        'Rust separa casos de uso, domínio, leitura de esquemas, comparação, geração SQL e armazenamento local.',
        'O ADR-004 define eventos de progresso e cancelamento assíncrono por operação.'
      ],
      bulletPointsEn: [
        'Angular handles the interface, reactive state, and domain services.',
        'Tauri provides the IPC bridge and applies desktop application permissions.',
        'Rust separates use cases, domain logic, schema reading, comparison, SQL generation, and local storage.',
        'ADR-004 defines progress events and asynchronous cancellation for each operation.'
      ]
    },

    implementation: {
      title: 'Fluxo de uso',
      titleEn: 'User workflow',
      content: 'O guia do usuário descreve três entradas para a comparação: dois bancos online, um arquivo SQL contra um banco ou dois arquivos SQL. Depois da análise, a interface apresenta diferenças, diagramas, avaliação de risco e histórico local.',
      contentEn: 'The user guide describes three comparison inputs: two online databases, a SQL file against a database, or two SQL files. After analysis, the interface presents differences, diagrams, risk assessment, and local history.'
    },

    testingAndValidation: {
      title: 'Estratégia de validação documentada',
      titleEn: 'Documented validation strategy',
      content: 'A estratégia de testes define camadas para validar as regras do parser, a comparação e geração SQL, integração com SQL Server, contratos IPC e requisitos de segurança.',
      contentEn: 'The test strategy defines layers for validating parser rules, comparison and SQL generation, SQL Server integration, IPC contracts, and security requirements.',
      bulletPoints: [
        'Testes unitários para parser de connection strings, motor de comparação e geração SQL.',
        'Testes de integração com instâncias SQL Server em containers Docker.',
        'Testes de contrato entre tipos Rust e interfaces TypeScript.',
        'Verificações de sanitização de logs e escape de identificadores SQL.'
      ],
      bulletPointsEn: [
        'Unit tests for connection string parsing, schema comparison, and SQL generation.',
        'Integration tests with SQL Server instances in Docker containers.',
        'Contract tests between Rust types and TypeScript interfaces.',
        'Checks for log sanitization and SQL identifier escaping.'
      ]
    },

    provenResults: {
      title: 'Escopo descrito no guia',
      titleEn: 'Scope described in the guide',
      content: 'O guia apresenta os fluxos planejados para a ferramenta, incluindo leitura comparativa, inspeção de diferenças, análise de risco e exportação de relatórios. Estes são recursos descritos na documentação do repositório; não são métricas de desempenho.',
      contentEn: 'The guide presents the tool’s planned workflows, including schema comparison, difference inspection, risk analysis, and report export. These are features described in the repository documentation, not performance metrics.',
      bulletPoints: [
        'Comparação de estruturas e diferenças por categoria.',
        'Análise de risco e impacto de alterações.',
        'Geração e exportação de scripts SQL.',
        'Snapshots locais e relatórios HTML.'
      ],
      bulletPointsEn: [
        'Schema comparison and differences grouped by category.',
        'Risk and impact analysis for changes.',
        'SQL script generation and export.',
        'Local snapshots and HTML reports.'
      ]
    },

    learningsAndNextSteps: {
      title: 'Documentação como parte do projeto',
      titleEn: 'Documentation as part of the project',
      content: 'A pasta docs reúne arquitetura, ADRs, política de segurança, estratégia de testes e guia de uso. Isso torna visíveis as razões por trás das escolhas, além de descrever funcionalidades.',
      contentEn: 'The docs folder brings together architecture, ADRs, security policy, test strategy, and user guide. It makes the reasoning behind decisions visible alongside the product features.',
      bulletPoints: [
        'Arquitetura do sistema e divisão de responsabilidades.',
        'Decisões registradas para conexão, parsing, armazenamento de credenciais e IPC.',
        'Links para os documentos originais disponíveis no repositório.'
      ],
      bulletPointsEn: [
        'System architecture and separation of responsibilities.',
        'Recorded decisions for connectivity, parsing, credential storage, and IPC.',
        'Links to the original documents available in the repository.'
      ]
    }
  }
];
