import { FieldNoteDetail } from '../models/field-note.interface';

export const FIELD_NOTES_DETAILS: FieldNoteDetail[] = [
  {
    id: '1',
    noteNumber: 'FN // 01',
    date: '2024 &bull; Volume 01',
    category: 'Arquitetura & Performance',
    title: 'Migração Zoneless no Angular 21: Redução de 45% no Bundle Inicial',
    synopsis: 'Como a eliminação de zone.js e a adoção estrita de Signals transformaram o tempo de inicialização e a previsibilidade da esteira de change detection.',
    readTime: '4 min de leitura',
    context: 'Aplicações Angular legadas dependiam de zone.js para interceptar eventos assíncronos no browser e disparar ciclos globais de detecção de mudanças (ApplicationRef.tick). Isso trazia sobrecarga no bundle inicial e ciclos desnecessários de verificação.',
    analysis: 'Ao migrar para o modo Zoneless experimental habilitado no Angular 21 com `provideZonelessChangeDetection()`, a detecção de mudanças passa a ser puramente baseada em reatividade de Signals, atualizando apenas os nós do DOM que dependem diretamente de valores alterados.',
    tradeoffs: [
      'Vantagem: Redução direta de ~35 kB do bundle inicial (eliminação completa do runtime zone.js).',
      'Vantagem: Desaparecimento de problemas misteriosos de ExpressionChangedAfterItHasBeenCheckedError.',
      'Cuidado: Bibliotecas legadas de terceiros que dependem de monkey-patching em timers exigem ajustes ou uso explícito de ChangeDetectorRef.'
    ],
    codeSnippet: {
      language: 'typescript',
      code: `// app.config.ts: Angular 21 Zoneless Runtime
export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes, withViewTransitions())
  ]
};`,
      caption: 'Configuração do runtime zoneless puro sem zone.js'
    },
    conclusion: 'A arquitetura zoneless com Signals representa o presente e o futuro do Angular, combinando o rigor corporativo do framework com a agilidade e leveza de ecossistemas reativos modernos.',
    editorNote: '[Comprovado em benchmarks internos: tempo de boot inicial reduzido e zero quebras nos 86 testes unitários].'
  },

  {
    id: '2',
    noteNumber: 'FN // 02',
    date: '2024 &bull; Volume 01',
    category: 'Design Systems & CSS',
    title: 'Retículas Matemáticas em CSS: Estética de Mangá com Zero Overhead de Rede',
    synopsis: 'Substituição de texturas PNG pesadas por gradientes radiais matemáticos puramente calculados pela GPU.',
    readTime: '3 min de leitura',
    context: 'Para reproduzir a textura pontilhada de mangás clássicos (screentones), a abordagem ingênua costuma utilizar arquivos PNG ou WebP repetidos em background-image. Isso gera requisições de rede adicionais, consome memória e perde nitidez em telas de alta densidade (Retina/4K).',
    analysis: 'Utilizando CSS `radial-gradient` com transições de cores bruscas (ex.: `radial-gradient(#111111 25%, transparent 26%)`) configuradas com `background-size: 6px 6px`, a GPU renderiza a retícula com perfeição matemática em qualquer resolução e proporção.',
    tradeoffs: [
      'Vantagem: 0 bytes de tráfego de rede (zero requisições HTTP adicionais).',
      'Vantagem: Escala perfeita em qualquer DPI sem pixelamento ou borramento.',
      'Vantagem: Permite transição instantânea de modo de leitura sem carregamentos adicionais.'
    ],
    codeSnippet: {
      language: 'scss',
      code: `// _tokens.scss: Screentone Matemático Puro
--screentone-dots-dense: radial-gradient(var(--manga-ink) 25%, transparent 26%);
--screentone-dots-medium: radial-gradient(var(--manga-ink) 18%, transparent 19%);
--screentone-dots-light: radial-gradient(var(--manga-gray) 12%, transparent 13%);`,
      caption: 'Definição de retículas matemáticas em tokens de design system'
    },
    conclusion: 'O melhor asset de imagem é aquele que não precisa ser baixado. Quando a tecnologia CSS permite resolver a estética com precisão matemática, o ganho de performance e experiência do leitor é absoluto.',
    editorNote: '[Padrão adotado em todo o design system do portfólio erickg.dev].'
  },

  {
    id: '3',
    noteNumber: 'FN // 03',
    date: '2024 &bull; Volume 01',
    category: 'Resiliência & RxJS',
    title: 'Resiliência de Rede: O Padrão Smart Interceptor contra Duplo Clique',
    synopsis: 'Como uma barreira transparente de deduplicação e retry exponencial protege APIs de backend em momentos de alta latência.',
    readTime: '4 min de leitura',
    context: 'Em formulários e cliques de navegação sob latência móvel, usuários frequentemente clicam repetidamente em botões de ação antes que a resposta HTTP retorne, gerando chamadas duplicadas aos servidores.',
    analysis: 'A criação de um registro em memória de requisições ativas (`Map<string, Observable<HttpEvent<unknown>>>`) intercepta chamadas idênticas em trânsito e compartilha a mesma resposta com os chamadores através do operador `shareReplay(1)`.',
    tradeoffs: [
      'Vantagem: Eliminação de 100% dos disparos duplicados não intencionais.',
      'Vantagem: Tolerância a quedas temporárias de pacotes via retry com jitter exponencial.',
      'Cuidado: Métodos não idempotentes com payloads deliberadamente distintos não devem compartilhar chave de assinatura.'
    ],
    codeSnippet: {
      language: 'typescript',
      code: `// Resilient Request Cache Signature
const requestKey = \`\${req.method}_\${req.urlWithParams}_\${JSON.stringify(req.body || {})}\`;
if (inFlightRequests.has(requestKey)) {
  return inFlightRequests.get(requestKey)!;
}`,
      caption: 'Algoritmo de chave determinística para deduplicação em trânsito'
    },
    conclusion: 'Proteger a camada de transporte com regras de deduplicação é um investimento arquitetural de retorno imediato na estabilidade de microsserviços.',
    editorNote: '[Implementado e verificado no pacote ngx-smart-interceptor].'
  }
];
