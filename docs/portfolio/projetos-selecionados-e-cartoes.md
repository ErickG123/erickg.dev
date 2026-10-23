# Projetos Selecionados e Cartões de Projeto — erickg.dev

> **Status:** Concluído &bull; **Data:** 23/10/2026 &bull; **Versão:** 1.0  
> **Volume:** 01 — *Tales of an Engineer* &bull; **Autor:** Erick Gabriel  
> **Capítulo:** 02 &bull; *Obras Selecionadas // Selected Works*

---

## 1. Modelo de Dados Consistente e Tipado (`Project`)

O modelo de dados que rege os projetos do portfólio está isolado e tipado em [`src/app/core/models/project.interface.ts`](file:///C:/Users/erick.alves/Documents/GitHub/erickg.dev/src/app/core/models/project.interface.ts), assegurando que todas as informações reais sejam comportadas de forma uniforme sem duplicação de layout:

```typescript
export interface Project {
  id: string;
  title: string;
  description: string;
  problem: string;
  role: string;
  techStack: string[];
  status: string;
  image?: string;
  url?: string;
  repositoryUrl?: string;
  demoUrl?: string;
  caseStudyUrl?: string;
  highlight?: string;
  year?: number;
  featured?: boolean;
  layoutSpan?: 'col-6' | 'col-7' | 'col-5' | 'col-12';
}
```

---

## 2. Inventário dos 4 Projetos Oficiais Verificados

Todas as informações abaixo foram extraídas diretamente dos repositórios e projetos públicos reais de **Erick Gabriel**, sem qualquer invenção de métricas, clientes fictícios ou tecnologias não comprovadas:

### 2.1. The Architect's Forge
- **Identificador:** `PRJ // 01` &bull; **Ano:** 2024
- **Nome:** The Architect's Forge (`ng-architect-cli`)
- **Descrição Breve:** CLI corporativa para estruturar aplicações Angular com arquitetura em camadas, suporte nativo a Docker, NgRx SignalStore e padronização corporativa.
- **Problema / Desafio de Engenharia:** A criação manual de boilerplate para projetos Angular corporativos com *Clean Architecture* introduz inconsistências estruturais e consome dias de configuração repetitiva.
- **Papel do Autor:** Criador & Engenheiro Principal (Arquitetura CLI, gerador de scaffolds e integração Docker).
- **Tecnologias Verificadas:** Angular 21, TypeScript, Node.js, Docker, SCSS.
- **Ilustração Autoral:** [`project-architect-forge.svg`](file:///C:/Users/erick.alves/Documents/GitHub/erickg.dev/src/assets/images/projects/project-architect-forge.svg) (Forja isométrica de camadas e terminal de código).
- **Estado do Projeto:** Estável // Publicado.
- **Link Oficial:** [github.com/ErickG123/ng-architect-cli](https://github.com/ErickG123/ng-architect-cli)

---

### 2.2. Cyber Sleuth Toolkit
- **Identificador:** `PRJ // 02` &bull; **Ano:** 2023
- **Nome:** Cyber Sleuth Toolkit (`devkit_forense` / `forensic-cli`)
- **Descrição Breve:** Kit e CLI voltados à perícia cibernética e investigação digital forense, estruturado para extração, análise e mapeamento de evidências.
- **Problema / Desafio de Engenharia:** Peritos forenses e pesquisadores de segurança demandam ferramentas de linha de comando velozes para extração de artefatos de memória e rede sem corromper a cadeia de custódia.
- **Papel do Autor:** Autor & Desenvolvedor Principal (Desenvolvimento de scripts de dissecação e empacotamento PyPI).
- **Tecnologias Verificadas:** Python, Docker, CLI Forense, Linux.
- **Ilustração Autoral:** [`project-cyber-sleuth.svg`](file:///C:/Users/erick.alves/Documents/GitHub/erickg.dev/src/assets/images/projects/project-cyber-sleuth.svg) (Terminal hex dump com lupa vetorial forense).
- **Estado do Projeto:** Estável // PyPI.
- **Link Oficial:** [github.com/ErickG123/devkit_forense](https://github.com/ErickG123/devkit_forense)

---

### 2.3. Network Guardian Node
- **Identificador:** `PRJ // 03` &bull; **Ano:** 2024
- **Nome:** Network Guardian Node (`ngx-smart-interceptor`)
- **Descrição Breve:** Pipeline HTTP inteligente para Angular focado em resiliência de rede. Gerencia tentativas de reconexão, renovação transparente de tokens e deduplicação de requisições com RxJS.
- **Problema / Desafio de Engenharia:** Falhas intermitentes de conectividade e requisições concorrentes causam perda de dados, múltiplos disparos desnecessários à API e expiração silenciosa de sessões.
- **Papel do Autor:** Autor & Mantenedor Open Source (Arquitetura do interceptor HTTP com RxJS, gestão de retry e deduplicação).
- **Tecnologias Verificadas:** Angular, RxJS, TypeScript, HTTP Gateway.
- **Ilustração Autoral:** [`project-network-guardian.svg`](file:///C:/Users/erick.alves/Documents/GitHub/erickg.dev/src/assets/images/projects/project-network-guardian.svg) (Escudo em nanquim interceptando ondas caóticas).
- **Estado do Projeto:** Estável // Open Source.
- **Link Oficial:** [github.com/ErickG123/ngx-smart-interceptor](https://github.com/ErickG123/ngx-smart-interceptor)

---

### 2.4. Otaku Courier Network
- **Identificador:** `PRJ // 04` &bull; **Ano:** 2024
- **Nome:** Otaku Courier Network (`anime-newsletter`)
- **Descrição Breve:** Sistema de distribuição e curadoria de conteúdo informativo sobre animes e mangás, conectando leitores através de newsletter e sinalização em tempo real.
- **Problema / Desafio de Engenharia:** Entusiastas e leitores enfrentam fontes dispersas de lançamentos editoriais e necessitam de uma curadoria centralizada com envio pontual de newsletters.
- **Papel do Autor:** Engenheiro Frontend & Criador (Desenvolvimento da interface Angular, integração Firebase e deploy Vercel Edge).
- **Tecnologias Verificadas:** Angular, Firebase, TypeScript, Vercel Edge.
- **Ilustração Autoral:** [`project-otaku-courier.svg`](file:///C:/Users/erick.alves/Documents/GitHub/erickg.dev/src/assets/images/projects/project-otaku-courier.svg) (Livro aberto em perspectiva, torre de rádio e cartas em voo).
- **Estado do Projeto:** Beta // Online.
- **Link do Código:** [github.com/ErickG123](https://github.com/ErickG123)
- **Link da Demo Online:** [anime-newsletter-sooty.vercel.app](https://anime-newsletter-sooty.vercel.app/)

---

## 3. Direção Visual dos Cartões Editoriais

O componente [`MangaProjectCardComponent`](file:///C:/Users/erick.alves/Documents/GitHub/erickg.dev/src/app/shared/components/manga-project-card/manga-project-card.component.ts) foi projetado para espelhar um painel de mangá impresso de alta qualidade:

1. **Cabeçalho com Numeração Editorial:** Exibe `PRJ // 01` acompanhado do ano de criação e da badge de status com retícula (`screentone-badge`).
2. **Quadro de Ilustração Técnica:** Moldura 16:9 com marcas de corte gráfica (`.manga-crop-marks`), renderizada com [`MangaImageComponent`](file:///C:/Users/erick.alves/Documents/GitHub/erickg.dev/src/app/shared/components/manga-image/manga-image.component.ts) e fallback duplo para o carimbo clássico.
3. **Identificação do Papel:** Linha técnica em monospace destacando a responsabilidade do autor no projeto (`// PAPEL:`).
4. **Bloco de Desafio / Problema:** Caixa delimitada com borda tracejada de nanquim e fundo aquecido contrastante (`.project-problem-box`).
5. **Insígnias de Tecnologias:** Badges em nanquim e papel para cada tecnologia do stack.
6. **Ações de Navegação:**
   - Botão primário para o código/repositório oficial.
   - Botão secundário de demonstração online quando disponível.

---

## 4. Acessibilidade e Teclado (WCAG 2.1 AA)

- **Identificação Semântica:** Cada cartão possui `role="article"` e é identificado através de `aria-labelledby="prj-title-[id]"`.
- **Rótulos Descritivos:** Todos os links possuem `aria-label` explícito indicando o projeto e a destinação exata.
- **Foco Visível:** Links e botões possuem contorno em traço duplo vermelho vermilion (`outline: 2px dashed var(--manga-vermilion); outline-offset: 3px;`), plenamente visível em navegação por tecla `Tab`.
- **Escalabilidade da Grade:** A seção utiliza `@for (project of projects; track project.id)` associada a `[class]="project.layoutSpan || 'col-6'"`, comportando qualquer número de projetos (2, 3, 4 ou mais) de forma fluida e sem quebras de layout.
