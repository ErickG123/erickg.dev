import { CaseStudy } from '../models/case-study.interface';

export const CASE_STUDIES_DATA: CaseStudy[] = [
  {
    id: 'schema-lens',
    projectId: 'schema-lens',
    caseNumber: 'ESTUDO DE CASO / 01',
    title: 'SchemaLens',
    subtitle: 'Inspeção, comparação estrutural e análise de risco para SQL Server.',
    category: 'Aplicação desktop · Ferramentas de dados',
    date: '2026 · Em desenvolvimento',
    author: 'Erick Gabriel',
    readTime: '5 min de leitura',
    heroIllustration: '/assets/images/projects/schema-lens-architecture.svg',
    githubUrl: 'https://github.com/ErickG123/schema-lens',
    documentationUrl: 'https://github.com/ErickG123/schema-lens/tree/main/docs',
    statusBadge: 'Repositório público',
    techStack: ['Angular', 'Tauri 2', 'Rust', 'SQL Server', 'SQLite'],

    context: {
      title: 'Contexto',
      content: 'SchemaLens é uma ferramenta desktop para inspecionar e comparar estruturas de bancos Microsoft SQL Server. A documentação descreve comparações entre bancos conectados e arquivos SQL, com leitura das estruturas, visualização de diferenças e geração de scripts.'
    },

    problem: {
      title: 'Problema a resolver',
      content: 'Diferenças de estrutura entre ambientes podem passar despercebidas até uma publicação. O projeto reúne a comparação em uma interface que também documenta impacto, histórico e opções de correção.',
      highlightBox: {
        title: 'OBJETIVO DO PRODUTO',
        text: 'Ajudar a entender o que mudou entre dois esquemas e quais alterações merecem atenção antes de gerar um script.',
        type: 'vermilion'
      }
    },

    constraints: {
      title: 'Restrições consideradas',
      content: 'Os documentos de arquitetura e segurança registram requisitos de conexão, privacidade e operação desktop.',
      bulletPoints: [
        'Suporte a autenticação SQL Server e autenticação integrada do Windows.',
        'Conexões criptografadas com configuração explícita para certificados.',
        'Credenciais protegidas pelo Windows Credential Manager e logs sanitizados.',
        'Operações demoradas devem informar progresso e permitir cancelamento.'
      ]
    },

    alternativesConsidered: {
      title: 'Uma decisão documentada: conexão SQL Server',
      content: 'O ADR-001 compara o driver Tiberius com a alternativa baseada em ODBC e explica a escolha adotada para o backend Rust.',
      bulletPoints: [
        'Tiberius com Tokio: integração Rust assíncrona sem exigir instalação adicional de um driver ODBC.',
        'ODBC: aproveita o driver oficial da Microsoft, mas adiciona um pré-requisito no computador e exige cuidado com chamadas bloqueantes.',
        'Escolha registrada: Tiberius, com autenticação integrada do Windows considerada nos requisitos do projeto.'
      ]
    },

    architectureDecisions: {
      title: 'Arquitetura e decisões',
      content: 'A arquitetura separa a interface Angular, a camada desktop Tauri e o backend Rust em módulos especializados. O documento de arquitetura detalha responsabilidades e fluxo entre essas partes.',
      bulletPoints: [
        'Angular concentra interface, estado reativo e serviços de domínio.',
        'Tauri fornece a ponte IPC e aplica permissões do aplicativo desktop.',
        'Rust separa casos de uso, domínio, leitura de esquemas, comparação, geração SQL e armazenamento local.',
        'O ADR-004 define eventos de progresso e cancelamento assíncrono por operação.'
      ]
    },

    implementation: {
      title: 'Fluxo de uso',
      content: 'O guia do usuário descreve três entradas para a comparação: dois bancos online, um arquivo SQL contra um banco ou dois arquivos SQL. Depois da análise, a interface apresenta diferenças, diagramas, avaliação de risco e histórico local.'
    },

    testingAndValidation: {
      title: 'Estratégia de validação documentada',
      content: 'A estratégia de testes define camadas para validar as regras do parser, a comparação e geração SQL, integração com SQL Server, contratos IPC e requisitos de segurança.',
      bulletPoints: [
        'Testes unitários para parser de connection strings, motor de comparação e geração SQL.',
        'Testes de integração com instâncias SQL Server em containers Docker.',
        'Testes de contrato entre tipos Rust e interfaces TypeScript.',
        'Verificações de sanitização de logs e escape de identificadores SQL.'
      ]
    },

    provenResults: {
      title: 'Escopo descrito no guia',
      content: 'O guia apresenta os fluxos planejados para a ferramenta, incluindo leitura comparativa, inspeção de diferenças, análise de risco e exportação de relatórios. Estes são recursos descritos na documentação do repositório; não são métricas de desempenho.',
      bulletPoints: [
        'Comparação de estruturas e diferenças por categoria.',
        'Análise de risco e impacto de alterações.',
        'Geração e exportação de scripts SQL.',
        'Snapshots locais e relatórios HTML.'
      ]
    },

    learningsAndNextSteps: {
      title: 'Documentação como parte do projeto',
      content: 'A pasta docs reúne arquitetura, ADRs, política de segurança, estratégia de testes e guia de uso. Isso torna visíveis as razões por trás das escolhas, além de descrever funcionalidades.',
      bulletPoints: [
        'Arquitetura do sistema e divisão de responsabilidades.',
        'Decisões registradas para conexão, parsing, armazenamento de credenciais e IPC.',
        'Links para os documentos originais disponíveis no repositório.'
      ]
    }
  }
];
