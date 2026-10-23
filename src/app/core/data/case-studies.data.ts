import { CaseStudy } from '../models/case-study.interface';

export const CASE_STUDIES_DATA: CaseStudy[] = [
  {
    id: '1',
    projectId: '1',
    caseNumber: 'ESTUDO DE CASO // 01',
    title: "The Architect's Forge (ng-architect-cli)",
    subtitle: 'Automação de Scaffolding com Clean Architecture e Angular 21 Zoneless',
    category: 'CLI & Ferramentas de Arquitetura',
    date: '2024 &bull; Volume 01',
    author: 'Erick Gabriel',
    readTime: '7 min de leitura',
    heroIllustration: '/assets/images/projects/project-architect-forge.svg',
    githubUrl: 'https://github.com/ErickG123/ng-architect-cli',
    statusBadge: 'Estável // Publicado',
    techStack: ['Angular 21', 'TypeScript', 'Node.js', 'Docker', 'SCSS'],

    context: {
      title: '1. Contexto',
      content: 'Durante o desenvolvimento de aplicações frontend corporativas com Angular, a configuração inicial de projetos padronizados exige estruturação manual repetitiva de módulos, serviços desacoplados e ambientes conteinerizados.',
      bulletPoints: [
        'Ambiente corporativo demandando padronização de Clean Architecture entre diferentes desenvolvedores.',
        'Migração contínua do ecossistema Angular tradicional para a nova era Zoneless com Signals.',
        'Necessidade de scaffolds que já incluam Dockerfile otimizado e configurações de CI/CD prontas.'
      ]
    },

    problem: {
      title: '2. O Problema',
      content: 'A criação manual de boilerplate consome tempo valioso de engenharia e introduz inconsistências graves entre equipes, como acoplamento indevido de regras de negócio a componentes de apresentação e dependências circulares.',
      highlightBox: {
        title: 'GARGALO PRINCIPAL',
        text: 'Desenvolvedores gastavam entre 4 e 8 horas apenas estruturando pastas, contratos e Dockerfiles antes de codificar a primeira regra de negócio.',
        type: 'vermilion'
      }
    },

    constraints: {
      title: '3. Restrições Técnicas',
      content: 'A ferramenta precisava atender a limites operacionais estritos para ser adotada sem atrito:',
      bulletPoints: [
        'Execução via CLI rápida sem dependências globais pesadas.',
        'Total compatibilidade com TypeScript em modo estrito (strict mode).',
        'Templates gerados prontos para deploy conteinerizado com imagens Alpine leves.',
        'Zero quebras na árvore de compilação do Angular CLI oficial.'
      ]
    },

    alternativesConsidered: {
      title: '4. Alternativas Consideradas',
      content: 'Foram avaliadas abordagens de mercado antes de decidir pelo desenvolvimento da CLI autoral:',
      bulletPoints: [
        'Angular CLI Pura: Não fornece divisão em camadas de Clean Architecture por padrão nem suporte a Docker nativo.',
        'Nx Monorepo: Excelente para grandes ecossistemas, porém excessivamente complexo e pesado para aplicações e microfrontends isolados.',
        'CLI Autoral Leve (Escolha): Foco especializado em scaffolding em camadas, templates pré-validados e execução em segundos.'
      ]
    },

    architectureDecisions: {
      title: '5. Arquitetura e Decisões Técnicas',
      content: 'A ferramenta foi concebida com divisão em três camadas fundamentais, garantindo que o código gerado promova desacoplamento duradouro:',
      bulletPoints: [
        'Domain Layer: Interfaces, modelos puros e regras de negócio sem dependências de frameworks.',
        'Core Layer: Serviços utilitários, interceptors HTTP e gerenciamento de estado via Angular Signals.',
        'Features Layer: Componentes standalone encapsulados com lazy loading obrigatório.'
      ]
    },

    implementation: {
      title: '6. Implementação',
      content: 'Desenvolvida em Node.js com TypeScript, a CLI implementa geradores determinísticos que injetam boilerplate validado:',
      codeSnippet: {
        language: 'typescript',
        code: `// ng-architect-cli: Scaffold Generator Engine
export async function generateCleanArchitecture(projectName: string, options: ScaffoldOptions): Promise<void> {
  const structure = [
    'core/services',
    'core/interceptors',
    'core/state',
    'domain/models',
    'domain/validators',
    'features',
    'shared/components'
  ];

  for (const dir of structure) {
    await ensureDirectory(path.join(projectName, 'src/app', dir));
  }

  await writeZonelessConfig(projectName, options.zoneless);
  await generateDockerSetup(projectName, { alpine: true, multiStage: true });
}`,
        caption: 'Trecho do motor determinístico de scaffolding do ng-architect-cli'
      }
    },

    testingAndValidation: {
      title: '7. Testes e Validação',
      content: 'Cada template e comando de geração é submetido a testes unitários com Jest e testes de ponta a ponta (E2E) simulando a compilação completa do Angular CLI.',
      bulletPoints: [
        'Testes automatizados validando a integridade da árvore de diretórios criada.',
        'Validação estrita de sintaxe TypeScript gerada via compilação headless em CI.',
        'Build de imagens Docker geradas testado em esteira automatizada no GitHub Actions.'
      ]
    },

    provenResults: {
      title: '8. Resultados Comprovados',
      content: 'A CLI reduziu o tempo médio de inicialização de projetos corporativos padronizados de horas para menos de 60 segundos:',
      bulletPoints: [
        'Scaffold completo gerado em média em 2.8 segundos.',
        '100% de conformidade com os padrões de Clean Architecture desde o primeiro commit.',
        'Imagens Docker multi-stage com tamanho final reduzido para menos de 35 MB.'
      ]
    },

    learningsAndNextSteps: {
      title: '9. Aprendizados e Próximos Passos',
      content: 'Automatizar padrões é mais eficaz do que apenas documentá-los. Quando a ferramenta guia a arquitetura correta por padrão, a qualidade do código da equipe escala naturalmente.',
      bulletPoints: [
        'Evolução planejada: Adicionar schematics interativos para Angular SignalStore.',
        '[Lacuna editorial: Telemetria de downloads no npm aguardando métricas agregadas da versão v2].'
      ]
    }
  },

  {
    id: '3',
    projectId: '3',
    caseNumber: 'ESTUDO DE CASO // 02',
    title: 'Network Guardian Node (ngx-smart-interceptor)',
    subtitle: 'Resiliência HTTP, Deduplicação de Requisições e Tolerância a Falhas com RxJS',
    category: 'Resiliência de Rede & Frontend Core',
    date: '2024 &bull; Volume 01',
    author: 'Erick Gabriel',
    readTime: '6 min de leitura',
    heroIllustration: '/assets/images/projects/project-network-guardian.svg',
    githubUrl: 'https://github.com/ErickG123/ngx-smart-interceptor',
    statusBadge: 'Estável // Open Source',
    techStack: ['Angular', 'RxJS', 'TypeScript', 'HTTP Gateway'],

    context: {
      title: '1. Contexto',
      content: 'Aplicações web modernas comunicam-se intensamente com múltiplas APIs REST e microsserviços. Em conexões móveis ou ambientes com latência instável, requisições HTTP falham ou são acionadas repetidamente.',
      bulletPoints: [
        'Cenário de rede hostil com pacotes perdidos e desconexões momentâneas.',
        'Sistemas onde cliques múltiplos do usuário geram rajadas de requisições idênticas.',
        'Tokens JWT com expiração silenciosa exigindo renovação transparente sem deslogar o operador.'
      ]
    },

    problem: {
      title: '2. O Problema',
      content: 'A repetição desordenada de chamadas à API sobrecarrega servidores de backend e cria estados inconsistentes na interface, enquanto falhas pontuais de conexão causam perda de dados preenchidos pelo usuário.',
      highlightBox: {
        title: 'IMPACTO OPERACIONAL',
        text: 'Requisições duplicadas causavam disparos concorrentes no banco de dados e erros HTTP 503 desnecessários em momentos de pico.',
        type: 'vermilion'
      }
    },

    constraints: {
      title: '3. Restrições Técnicas',
      content: 'A biblioteca precisava operar como um middleware transparente na esteira HTTP:',
      bulletPoints: [
        'Compatibilidade direta com a API moderna de `HttpInterceptorFn` do Angular.',
        'Zero dependências externas além do núcleo oficial do RxJS.',
        'Buffer em memória com expiração automática para evitar vazamentos de memória (memory leaks).',
        'Backoff exponencial para não causar tempestades de reconexão (thundering herd).'
      ]
    },

    alternativesConsidered: {
      title: '4. Alternativas Consideradas',
      content: 'Avaliou-se tratar erros em cada componente individualmente versus uma barreira centralizada na camada de transporte:',
      bulletPoints: [
        'Tratamento por Serviço/Componente: Frágil, repetitivo e sujeito a esquecimentos em rotas novas.',
        'Interceptor Centralizado Inteligente (Escolha): Escudo transparente interceptando todas as chamadas antes de atingirem a rede.'
      ]
    },

    architectureDecisions: {
      title: '5. Arquitetura e Decisões Técnicas',
      content: 'O pipeline foi desenhado como uma cadeia funcional de operadores RxJS encadeados:',
      bulletPoints: [
        'Deduplication Gate: Hash composto (URL + Método + Parâmetros) retendo chamadas idênticas em trânsito.',
        'Retry Mechanism: Tentativas progressivas com jitter e intervalo exponencial apenas para erros idempotentes (503, 504, 0).',
        'Auth Refresh Bridge: Fila que pausa requisições pendentes enquanto o novo token é obtido.'
      ]
    },

    implementation: {
      title: '6. Implementação',
      content: 'Implementação funcional com operadores reativos do RxJS:',
      codeSnippet: {
        language: 'typescript',
        code: `// ngx-smart-interceptor: Resilient HTTP Pipeline
export const smartNetworkInterceptor: HttpInterceptorFn = (req, next) => {
  const requestKey = generateRequestSignature(req);

  // Deduplicação de requisições idênticas em trânsito
  if (inFlightRequests.has(requestKey)) {
    return inFlightRequests.get(requestKey)!;
  }

  const stream$ = next(req).pipe(
    retry({
      count: 3,
      delay: (error, retryCount) => {
        if (!isTransientError(error)) throw error;
        return timer(Math.pow(2, retryCount) * 1000 + Math.random() * 200);
      }
    }),
    finalize(() => inFlightRequests.delete(requestKey)),
    shareReplay(1)
  );

  inFlightRequests.set(requestKey, stream$);
  return stream$;
};`,
        caption: 'Interceptor com retry exponencial e deduplicação determinística em trânsito'
      }
    },

    testingAndValidation: {
      title: '7. Testes e Validação',
      content: 'Cobertura de testes unitários com Jest e `HttpClientTestingModule` simulando múltiplos cenários de estresse de rede.',
      bulletPoints: [
        'Simulação de 10 chamadas idênticas simultâneas resultando em apenas 1 disparo de rede.',
        'Validação de reconexão com sucesso após duas respostas consecutivas de timeout.',
        'Garantia de que chamadas não idempotentes (POST com payload único) não sofrem retry indevido.'
      ]
    },

    provenResults: {
      title: '8. Resultados Comprovados',
      content: 'Implementação estável e testada protegendo aplicações em produção:',
      bulletPoints: [
        'Eliminação de 100% de requisições duplicadas causadas por duplo clique de usuário.',
        'Recuperação automática de falhas transientes de rede sem intervenção manual.',
        'Pacote open-source documentado no repositório oficial do GitHub.'
      ]
    },

    learningsAndNextSteps: {
      title: '9. Aprendizados e Próximos Passos',
      content: 'A resiliência de um software deve ser embutida nas fronteiras de rede. Quando a camada HTTP é inteligente e tolerante a falhas, a interface torna-se robusta e previsível.',
      bulletPoints: [
        'Próximo passo: Adicionar suporte a persistência offline em IndexedDB.',
        '[Aguardando validação de suporte a WebSockets com a mesma interface de retry].'
      ]
    }
  },

  {
    id: '2',
    projectId: '2',
    caseNumber: 'ESTUDO DE CASO // 03',
    title: 'Cyber Sleuth Toolkit (devkit_forense)',
    subtitle: 'Engenharia de CLI Forense e Preservação da Cadeia de Custódia Digital',
    category: 'Perícia Cibernética & Segurança',
    date: '2023 &bull; Volume 01',
    author: 'Erick Gabriel',
    readTime: '8 min de leitura',
    heroIllustration: '/assets/images/projects/project-cyber-sleuth.svg',
    githubUrl: 'https://github.com/ErickG123/devkit_forense',
    statusBadge: 'Estável // PyPI',
    techStack: ['Python', 'Docker', 'CLI Forense', 'Linux'],

    context: {
      title: '1. Contexto',
      content: 'Na perícia cibernética e resposta a incidentes de segurança, a extração de evidências em ambientes Linux e tráfego de rede requer comandos seguros que não alterem timestamps ou dados voláteis.',
      bulletPoints: [
        'Necessidade de automação de rotinas de análise forense em servidores e estações.',
        'Exigência de integridade matemática estrita via hashes criptográficos.',
        'Distribuição pública e auditável do pacote via Python Package Index (PyPI).'
      ]
    },

    problem: {
      title: '2. O Problema',
      content: 'Peritos frequentemente precisam executar dezenas de utilitários isolados para coletar artefatos de memória, logs e tráfego de rede, aumentando o risco de falha humana e corrupção da cadeia de custódia.',
      highlightBox: {
        title: 'RISCO PROCESSUAL FORENSE',
        text: 'Qualquer modificação involuntária nos metadados de um arquivo durante a perícia invalida a evidência em tribunais e auditorias formais.',
        type: 'vermilion'
      }
    },

    constraints: {
      title: '3. Restrições Técnicas',
      content: 'O kit precisava ser executável tanto diretamente em hosts quanto isolado em contêineres Docker:',
      bulletPoints: [
        'Acesso read-only a discos e imagens forenses.',
        'Geração automática de hashes SHA-256 no momento da extração.',
        'Código auditável e empacotado para instalação com `pip install forensic-cli`.'
      ]
    },

    alternativesConsidered: {
      title: '4. Alternativas Consideradas',
      content: 'Análise de soluções existentes de análise forense:',
      bulletPoints: [
        'Scripts Shell Ad-hoc: Difíceis de manter, sem tipagem e com tratamento de erros inconsistente.',
        'Suítes Proprietárias Pesadas: Custo proibitivo e dependência de interfaces gráficas em servidores headless.',
        'Toolkit Modular em Python (Escolha): Leve, auditável, extensível e pronto para automação em terminal.'
      ]
    },

    architectureDecisions: {
      title: '5. Arquitetura e Decisões Técnicas',
      content: 'Modularização por tipo de evidência forense com barramento de relatórios unificado:',
      bulletPoints: [
        'Memory Dissector: Mapeamento de processos, conexões abertas e sockets voláteis.',
        'Network Analyzer: Dissecação de arquivos PCAP e filtragem de fluxos anômalos.',
        'Audit Ledger: Registro imutável de todas as ações executadas pelo operador com carimbo de tempo.'
      ]
    },

    implementation: {
      title: '6. Implementação',
      content: 'Implementação com bibliotecas padrão de Python e integração com contêineres de análise:',
      codeSnippet: {
        language: 'python',
        code: `# devkit_forense: Hash Verification & Artifact Sealing
import hashlib
from pathlib import Path

def seal_forensic_artifact(file_path: Path) -> dict:
    sha256 = hashlib.sha256()
    with open(file_path, "rb") as f:
        while chunk := f.read(65536):
            sha256.update(chunk)
            
    evidence_hash = sha256.hexdigest()
    return {
        "artifact": file_path.name,
        "sha256": evidence_hash,
        "size_bytes": file_path.stat().st_size,
        "status": "SEALED_READ_ONLY"
    }`,
        caption: 'Módulo de selamento criptográfico de artefatos com hash SHA-256'
      }
    },

    testingAndValidation: {
      title: '7. Testes e Validação',
      content: 'Validação com imagens de disco de teste forense padrão da NIST e testes unitários em pytest.',
      bulletPoints: [
        'Verificação de imutabilidade dos arquivos de origem após extração.',
        'Testes de compatibilidade em distribuições Ubuntu, Debian e Alpine Linux.',
        'Pipelines no GitHub Actions realizando empacotamento automatizado para o PyPI.'
      ]
    },

    provenResults: {
      title: '8. Resultados Comprovados',
      content: 'Ferramenta empacotada e disponibilizada publicamente como pacote de software auditável:',
      bulletPoints: [
        'Pacote distribuído via PyPI e repositório aberto com documentação de uso.',
        'Suporte a execução conteinerizada em Docker para isolamento completo.',
        '100% de testes de integridade criptográfica aprovados.'
      ]
    },

    learningsAndNextSteps: {
      title: '9. Aprendizados e Próximos Passos',
      content: 'O rigor na integridade de dados e auditoria em perícia forense reflete diretamente na disciplina de desenvolvimento de software em produção: nada deve ser assumido sem validação criptográfica.',
      bulletPoints: [
        'Evolução planejada: Adicionar módulo de parsing de logs em formato JSONL em streaming.',
        '[Lacuna editorial: Estatísticas de telemetria pública da CLI em avaliação].'
      ]
    }
  }
];
