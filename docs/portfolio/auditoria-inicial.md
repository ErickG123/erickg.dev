# Auditoria Inicial do Repositório — erickg.dev

> **Data da Auditoria:** 23 de Outubro de 2026  
> **Responsável:** Engenharia de Software Sênior  
> **Objetivo:** Inspecionar e documentar detalhadamente o estado atual do repositório, identificando stack, arquitetura, testes, regras de negócio, funcionalidades existentes, conteúdos a preservar, bugs latentes e riscos antes de iniciar a refatoração para a identidade visual inspirada na linguagem editorial de mangás japoneses.

---

## 1. Stack Tecnológica e Arquitetura

### 1.1 Core e Linguagem
- **Framework Front-End:** Angular 21 (versões `@angular/*` entre `21.0.0` e `21.2.20`).
- **Arquitetura de Reatividade:** Standalone Components com detecção de mudanças Zoneless (`provideZonelessChangeDetection()`) e Angular Signals (`signal`, `computed`, `effect`).
- **Linguagem:** TypeScript `~6.0.2` configurado com target `ES2022`, módulo `preserve`, decorators experimentais e checagens estritas de injeção (`strictInjectionParameters`, `strictInputAccessModifiers`).
- **Compilador / Builder:** `@angular/build:application` (builder moderno baseado em esbuild e Vite).
- **Gerenciador de Pacotes:** `npm@11.5.2` (declarado no `package.json`), compatível com Node.js runtime v20 LTS e v24.

### 1.2 Dependências de Terceiros Identificadas
| Pacote | Versão | Propósito no Projeto |
| :--- | :--- | :--- |
| `@angular/animations` | `^21.2.20` | Transições de rota animadas (`routeAnimations`) no `app.ts` *(Obs: marcado como deprecated no Angular 21)* |
| `@angular/cdk` | `^21.2.14` | Drag-and-drop de blocos táticos no Hero da Home (`DragDropModule`) |
| `@angular/service-worker` | `^21.0.0` | PWA com cache offline e notificação de novos releases via `SwUpdate` |
| `@ngx-translate/core` | `^18.0.0` | Internacionalização dinâmica (i18n) com suporte a Português e Inglês |
| `@ngx-translate/http-loader` | `^18.0.0` | Carregamento assíncrono dos arquivos de tradução em JSON |
| `@vercel/analytics` | `^2.0.1` | Telemetria de visualizações, cliques e eventos customizados |
| `ngx-markdown` | `^22.0.0` | Renderizador dinâmico de documentação/histórico em Markdown (`history.md`) |
| `marked` | `^18.0.9` | Parser de Markdown subjacente ao `ngx-markdown` |
| `rxjs` | `~7.8.0` | Streams assíncronos e utilitários reativos |
| `zone.js` | `^0.16.2` | Utilizado pelo ambiente de testes unitários com Jest (`setupZoneTestEnv`) |

### 1.3 Ferramental de Desenvolvimento e Testes
- **Test Runner:** Jest `^30.4.2` configurado com `jest-preset-angular` `^17.0.0` e `jest-environment-jsdom` `^30.4.1`.
- **Formatação:** Prettier `^3.8.1` com `.prettierrc` configurado para `printWidth: 100`, aspas simples e parser angular em arquivos HTML.
- **Linters:** Nenhum linter configurado (não há ESLint nem `angular-eslint`).

---

## 2. Estrutura Relevante do Projeto

A aplicação segue uma estrutura modular moderna por camadas (Feature/Core/Shared/Layout):

```text
erickg.dev/
├── .github/
│   └── workflows/
│       └── ci.yml                     # Esteira CI: checkout, setup-node 20, npm ci, test:ci, build
├── docs/
│   └── portfolio/
│       └── auditoria-inicial.md       # Este relatório de engenharia
├── public/
│   ├── favicon.ico
│   ├── manifest.webmanifest          # Manifesto PWA (nome, cores, display: standalone)
│   └── icons/                         # Ícones em 8 resoluções (72x72 a 512x512)
├── src/
│   ├── app/
│   │   ├── core/                      # Serviços singleton e regras fundamentais
│   │   │   ├── models/
│   │   │   │   ├── achievement.interface.ts
│   │   │   │   └── project.interface.ts
│   │   │   ├── state/
│   │   │   │   └── game-state.service.ts  # Estado global da sessão (áudio, modo corporativo, idioma)
│   │   │   ├── audio.service.ts       # Controle de áudio BGM com fallback e tracking
│   │   │   ├── konami.service.ts      # Detector do Konami Code para terminal hacker secreto
│   │   │   ├── save-state.service.ts  # Persistência de preferências e conquistas em localStorage
│   │   │   ├── seo.service.ts         # Injeção de Meta Tags (OG / Twitter Cards)
│   │   │   └── theme.service.ts       # Controle de tema dark/light (legado)
│   │   ├── features/                  # Módulos de tela com carregamento sob demanda (lazy)
│   │   │   ├── about/                 # "Status Screen" estilo RPG (HP, MP, EXP, atributos e passivas)
│   │   │   ├── contact/               # "Guild Board" com formulário de contato e redes sociais
│   │   │   ├── home/                  # Hero tático com Drag & Drop, avatar SVG e projetos em destaque
│   │   │   ├── log/                   # Diário de quests renderizado a partir de Markdown
│   │   │   └── projects/              # "Bag // Key Items" com inventário e demonstrações interativas
│   │   │       ├── components/
│   │   │       │   └── project-card/  # Card de exibição do projeto
│   │   │       ├── models/
│   │   │       │   └── project.model.ts  # Interface redundante de projeto (veja problemas)
│   │   │       └── services/
│   │   │           └── project.service.ts # Fonte de dados mockada dos projetos reais
│   │   ├── layout/
│   │   │   └── header/                # Topbar com controle BGM, seletor EN/PT e links de navegação
│   │   ├── shared/
│   │   │   ├── components/
│   │   │   │   └── achievement-toast/ # Banner flutuante de conquista desbloqueada
│   │   │   └── directives/
│   │   │       └── typewriter.directive.ts # Efeito máquina de escrever com IntersectionObserver
│   │   ├── app.config.ts              # Configuração global de providers standalone
│   │   ├── app.routes.ts              # Mapeamento de rotas com lazy loading
│   │   ├── app.ts / app.html / app.scss # Componente raiz com boot screen, animação de rotas e terminal
│   ├── assets/
│   │   ├── bgm.mp3                    # Trilha chiptune retro (3.38 MB)
│   │   ├── i18n/
│   │   │   ├── en.json                # Dicionário de tradução em Inglês
│   │   │   └── pt.json                # Dicionário de tradução em Português
│   │   └── logs/
│   │       └── history.md             # Linha do tempo da carreira e conquistas técnicas
│   ├── index.html                     # HTML raiz com Google Font 'Press Start 2P'
│   ├── main.ts                        # Bootstrap da aplicação e injeção do Vercel Analytics
│   ├── styles.scss                    # Design system GBA: CRT overlay, variáveis, botões, cards
│   ├── angular.json                   # Configuração do builder @angular/build:application
│   ├── jest.config.js                 # Configuração do Jest
│   ├── ngsw-config.json               # Configuração do Angular Service Worker
│   ├── tsconfig.json / tsconfig.app.json / tsconfig.spec.json
│   └── vercel.json                    # Rewrite SPA para index.html na Vercel
```

---

## 3. Mapeamento de Rotas

| Rota | Componente | Estratégia de Carregamento | Função |
| :--- | :--- | :--- | :--- |
| `/` | `HomeComponent` | Lazy Load (`loadComponent`) | Hero tático, apresentação, avatar animado e projetos em destaque |
| `/about` | `AboutComponent` | Lazy Load (`loadComponent`) | Ficha de status profissional (atributos técnicos, métricas e passivas) |
| `/projects` | `ProjectsComponent` | Lazy Load (`loadComponent`) | Inventário interativo de projetos com demos in-page (CLI e nós forenses) |
| `/log` | `LogComponent` | Lazy Load (`loadComponent`) | Histórico de carreira renderizado de `src/assets/logs/history.md` |
| `/contact` | `ContactComponent` | Lazy Load (`loadComponent`) | Mural de contato (formulário) e links sociais profissionais |
| `**` | Redirecionamento | `redirectTo: ''`, `pathMatch: 'full'` | Fallback de rota inexistente para a Home |

---

## 4. Comandos do Projeto (Validados em Auditoria)

Todos os comandos foram executados e validados no ambiente:

```bash
# 1. Instalação Segura das Dependências (OBRIGATÓRIO uso de --legacy-peer-deps)
npm ci --legacy-peer-deps

# 2. Servidor de Desenvolvimento Local (Porta 4200)
npm start
# ou: ng serve

# 3. Execução da Suíte Completa de Testes Unitários com Cobertura
npm run test:ci
# ou em modo watch local: npm test

# 4. Geração do Pacote de Produção (com minificação, hashing e service worker)
npm run build

# 5. Verificação de Estilo e Formatação
npx prettier --check .
# Para corrigir formatação: npx prettier --write .
```

### Resultados da Execução em Auditoria:
- **`npm ci --legacy-peer-deps`:** Concluído com sucesso (758 pacotes auditados).
- **`npm run test:ci`:** 4 suítes e 11 testes unitários aprovados com 100% de sucesso em 5.6s.
  - `save-state.service.spec.ts`: 3 testes (preferências, emissão de signal, duplicação).
  - `audio.service.spec.ts`: 3 testes (inicialização, toggle, bloqueio de autoplay).
  - `projects.component.spec.ts`: 2 testes (seleção de item e abertura de demo interativa).
  - `header.component.spec.ts`: 3 testes (renderização, toggle de BGM, trigger de clique).
- **`npm run build`:** Gerado com sucesso em 11.7s.
  - Tamanho do bundle inicial transferido: ~105 kB (total raw de 370 kB), abaixo do teto de alerta de 500 kB.
  - Todos os chunks lazy (Home, Projects, About, Contact, Log) gerados separadamente.

---

## 5. Conteúdos e Ativos Pessoais que Devem ser Preservados

A auditoria identificou informações biográficas, canais de contato e projetos reais pertencentes ao profissional Erick Gabriel que **não devem ser inventados, removidos ou distorcidos**:

### 5.1 Identidade e Canais do Autor
- **Nome:** Erick Gabriel (Erick G. / ErickG123).
- **GitHub:** `https://github.com/ErickG123`
- **LinkedIn:** `https://www.linkedin.com/in/erickgdev/`
- **Dev.to:** `https://dev.to/erickg123`
- **Domínio Oficial:** `https://erickg.dev` (deploy Vercel: `https://erickg-dev.vercel.app`)

### 5.2 Projetos Oficiais Catalogados no Portfólio
1. **The Architect's Forge (`ng-architect-cli`):**
   - *Descrição:* CLI definitiva para estruturar e iniciar projetos Angular prontos para produção com Docker, NgRx SignalStore, PrimeNG e padronização arquitetural.
   - *Repositório:* `https://github.com/ErickG123/ng-architect-cli`
   - *Techs:* Angular, TypeScript, SCSS.
   - *Status:* Estável (possui demo simulada de terminal CLI in-app).
2. **Cyber Sleuth Toolkit (`devkit_forense` / `forensic-cli`):**
   - *Descrição:* Kit de desenvolvimento especializado para investigação forense digital e perícia cibernética.
   - *Repositório / PyPI:* `https://github.com/ErickG123/devkit_forense` / `https://pypi.org/project/forensic-cli/`
   - *Techs:* Python, Docker, Angular.
   - *Status:* Estável (possui demo simulada de diagrama de inspeção de nós de rede in-app).
3. **Network Guardian Node (`ngx-smart-interceptor`):**
   - *Descrição:* Pipeline HTTP inteligente para Angular. Trata falhas de rede, requisições duplicadas e renovação de tokens com RxJS e princípios SOLID.
   - *Repositório:* `https://github.com/ErickG123/ngx-smart-interceptor`
   - *Techs:* Angular, RxJS.
   - *Status:* Estável.
4. **Otaku Courier Network (`anime-newsletter-sooty`):**
   - *Descrição:* Plataforma de broadcast e newsletter temática focada no universo anime com disparo de novidades e novidades de mangás/animes.
   - *Deploy:* `https://anime-newsletter-sooty.vercel.app/`
   - *Techs:* Angular, Firebase.
   - *Status:* Beta.

### 5.3 Histórico de Carreira (`history.md`)
- **Full-Stack Developer (2024 - Presente):** Angular 21 (Zoneless, Signals), RxJS, TypeScript avançado, PWA, refatoração de estado de NgRx para Signals com redução de bundle de 45%.
- **Front-End Júnior (2022 - 2024):** Landing pages institucionais, e-commerce, migração e sustentação em React e Angular, consumo de APIs REST, boas práticas de Git/GitHub.

---

## 6. Funcionalidades Reutilizáveis

Os seguintes módulos e utilitários de engenharia estão maduros e devem ser preservados ou reaproveitados na transição estética:
1. **Sistema de i18n (`@ngx-translate/core`):** Suporte nativo a múltiplos idiomas com fallback para inglês e alternância instantânea sem reload via Signal.
2. **Gerenciamento de Estado Reativo (`GameStateService`):** Sinais de estado centralizados (`isAudioPlaying`, `isCorporateMode`, `currentLang`, `unlockedAchievements`).
3. **Sistema de Conquistas Gamificado (`SaveStateService` + `AchievementToastComponent`):** Registro de conquistas no `localStorage` com exibição de toast animado e som de feedback.
4. **Telemetria de Eventos (`@vercel/analytics`):** Rastreamento de abertura de demos, reprodução de áudio e desbloqueio de conquistas.
5. **Demos Interativas In-Page:** Terminal interativo com simulação de comandos e diagrama de fluxo em nós, ambos implementados em puro CSS/HTML/TypeScript sem bibliotecas pesadas.
6. **Efeito Typewriter (`TypewriterDirective`):** Renderização progressiva de texto acionada de forma otimizada via `IntersectionObserver`.
7. **PWA Offline e Atualizações:** Registro de Service Worker em produção via `ngsw-config.json` com detecção de updates via `SwUpdate`.
8. **SEO Dinâmico (`SeoService`):** Gerenciamento reativo de título da página e tags Open Graph / Twitter Card.
9. **Easter Egg (Konami Code):** Listener de sequência de teclas para exibição de segredos ou páginas de bastidores.

---

## 7. Problemas Técnicos Identificados

Antes de iniciar qualquer refatoração visual, foram detectados os seguintes problemas no código existente:

1. **Bug do Link no Card de Projetos (Inconsistência de Tipos):**
   - `src/app/core/models/project.interface.ts` define a propriedade como `url?: string`.
   - `src/app/features/projects/models/project.model.ts` é um modelo duplicado que define `link: string`.
   - `ProjectCardComponent` importa `project.model.ts` e tenta renderizar `<a [href]="project().link">`, porém o array de dados em `ProjectService` fornece `url`. Como consequência, o botão `> VISUALIZAR` nos cards da Home gera links `href="undefined"`.
2. **Resquícios de PrimeNG em `ThemeService`:**
   - O arquivo `src/app/core/theme.service.ts` tenta alternar folhas de estilo buscando um elemento `#app-theme` e referenciando arquivos como `aura-dark-indigo.css`. Esse elemento não existe no `index.html` e PrimeNG não está instalado nas dependências, gerando código morto/inoperante.
3. **Incompatibilidade de Peer Dependencies no Angular 21:**
   - As bibliotecas `ngx-markdown` e `@ngx-translate` declaram peer dependencies que entram em conflito com as versões estritas do Angular 21, exigindo obrigatoriamente a flag `--legacy-peer-deps` no `npm ci`. Caso um desenvolvedor rode `npm install` sem a flag, o processo falha.
4. **Ausência de Linters no Repositório:**
   - Não há ESLint nem `@angular-eslint` configurado. Regras de qualidade de código, boas práticas de acessibilidade nos templates e checagens estáticas dependem exclusivamente do compilador do TypeScript.
5. **Divergências de Formatação do Prettier:**
   - O comando `npx prettier --check .` acusa divergências em 60 arquivos do projeto, sinalizando que a formatação não era validada no CI.
6. **Depreciação de `@angular/animations`:**
   - O Angular 21 emite warning oficial de depreciação para o módulo `@angular/animations`, recomendando a adoção gradual dos novos recursos de animação de template nativos (`animate.enter`, `animate.leave`).
7. **Bloqueio Artificial no Boot da Aplicação:**
   - O `App` implementa um timer fixo de 3.5 segundos (`isBooting`) que esconde a aplicação sob uma tela preta a cada recarregamento. Embora faça sentido na estética GBA, pode degradar a experiência de recrutadores e visitantes recorrentes.
8. **Peso do Asset de Áudio:**
   - O arquivo `bgm.mp3` pesa 3.38 MB e reside diretamente dentro de `src/assets`. Em conexões móveis ou ambientes restritos, o download pode gerar consumo desnecessário de dados se o áudio for acionado sem pré-carregamento controlado.

---

## 8. Riscos Técnicos

| Risco | Impacto | Mitigação Recomendada |
| :--- | :--- | :--- |
| **Quebra de CI por dependências peer** | Alto | Garantir que o comando `npm ci --legacy-peer-deps` seja mantido no workflow do GitHub Actions e documentado formalmente. |
| **Perda de acessibilidade (a11y) com fontes temáticas** | Médio | Evitar o uso exclusivo de fontes decorativas para leitura de textos longos. Manter fontes sans-serif legíveis e contraste WCAG AA alto (mínimo 4.5:1). |
| **Estouro de budget de CSS/JS ao introduzir arte de mangá** | Médio | Evitar inclusão de imagens bitmap pesadas sem otimização. Priorizar vetores SVG, halftones puramente em CSS (`radial-gradient`), webp otimizado e lazy loading de imagens. |
| **Regressão das 4 suítes de testes existentes** | Alto | Não alterar assinaturas de métodos públicos nem suprimir seletores testados sem atualizar seus respectivos mocks e testes unitários. |

---

## 9. Decisões que Precisam ser Tomadas Antes da Implementação

Para guiar a transição estética para o estilo editorial de mangá, as seguintes decisões técnicas e de design devem ser alinhadas:

1. **Unificação do Modelo de Dados:**
   - Eliminar `src/app/features/projects/models/project.model.ts` e concentrar a tipagem em `src/app/core/models/project.interface.ts`, ajustando `ProjectCardComponent` para usar `url`.
2. **Definição dos Elementos Visuais de Mangá (Design System):**
   - *Paleta:* Monocromático editorial (branco papel de mangá `#F6F6F6`, preto nanquim `#111111`, tons de cinza de retícula) com realces pontuais (ex: vermelho shonen `#E60012` ou carimbo de kanji/hanko).
   - *Elementos de Diagramação:* Divisão em painéis com sarjetas (*gutters*), linhas de ação (*speed lines*), texturas de retícula (*screentone / halftone patterns*) feitas via gradientes CSS leves, balões de diálogo para citações/depoimentos e balões de onomatopeia estilizados.
   - *Tipografia:* Combinação de fonte display impactante inspirada em títulos de mangá para cabeçalhos e fonte neutra de alta legibilidade para leitura técnica.
3. **Adaptação da Narrativa de JRPG para Mangá:**
   - Atualmente, as rotas e seções usam termos de console ("LEVEL 99", "START QUEST", "BAG // KEY ITEMS", "STATUS SCREEN", "GUILD BOARD").
   - Decidir se essas metáforas serão recontextualizadas para a linguagem editorial de mangás (ex.: "Capítulos", "Ficha do Protagonista", "Volumes Publicados", "Editorial / Prancheta") ou se haverá uma fusão equilibrada.
4. **Comportamento do Boot Screen:**
   - Decidir se o splash screen de inicialização será removido, reduzido ou transformado em uma rápida abertura de página de mangá com opção de clique para pular (*skip*).
