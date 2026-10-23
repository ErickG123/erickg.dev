# Estudos de Caso & Field Notes — Documentação Técnica e Editorial

Este documento descreve a arquitetura, a estrutura semântica, as decisões de design e as regras de governança para os **Estudos de Caso** e **Field Notes** do portfólio `erickg.dev`.

---

## 1. Visão Geral e Princípios Fundamentais

Seguindo o princípio de **autenticidade e factualidade estrita**, nenhuma métrica, estatística, cliente ou conquista técnica foi inventada. Todas as informações derivam dos repositórios auditados do autor:
- `architect-forge` (Angular 21 + Zoneless + Signals)
- `cybersleuth-api` (TypeScript + Node.js + JWT/OAuth)
- `network-guardian` (Rust / CLI)
- `otaku-courier` (Nuxt / E-commerce)

Quando uma informação comercial ou métrica de escala não está comprovada em código aberto, o campo é identificado explicitamente como **lacuna editorial** (`[Pendente de métrica do autor]` ou `[Projeto open-source/experimental]`).

---

## 2. Estrutura Canônica dos Estudos de Caso (9 Tópicos Obrigatórios)

Cada estudo de caso implementa a interface [`CaseStudy`](file:///C:/Users/erick.alves/Documents/GitHub/erickg.dev/src/app/core/models/case-study.interface.ts) e obedece aos 9 tópicos estruturais:

| # | Tópico | Objetivo Editorial & Técnico | Implementação no Modelo |
|---|---|---|---|
| **1** | **Contexto** | Situa a motivação do projeto, o ano de desenvolvimento e o papel exato desempenhado. | `context: string` |
| **2** | **Problema** | Define a dor técnica ou de usabilidade que o software precisava sanar. | `problem: string` |
| **3** | **Restrições** | Lista limitações de arquitetura, ecossistema, compatibilidade ou desempenho. | `constraints: string[]` |
| **4** | **Alternativas Consideradas** | Trade-offs técnicos avaliados (ex.: Zone.js vs. Zoneless Signals, REST vs. GraphQL, WebSockets vs. SSE). | `alternatives: { option: string; reasonNotChosen: string }[]` |
| **5** | **Arquitetura & Decisões** | Diagrama ou descrição em camadas com decisões de baixo acoplamento e separação de responsabilidades. | `architecture: { overview: string; keyDecisions: string[] }` |
| **6** | **Implementação** | Detalhes práticos de código, snippets TypeScript/Rust e organização de módulos. | `implementation: { highlights: string[]; codeSnippet?: { language: string; code: string; caption: string } }` |
| **7** | **Testes & Validação** | Metodologia de testes (Jest, cobertura unitária, isolamento de efeitos colaterais). | `testingAndValidation: string[]` |
| **8** | **Resultados Comprovados** | Apenas resultados auditados e verificáveis (ex.: 0 vazamento de memória em zoneless, 100% de cobertura nos reducers). | `provenResults: string[]` |
| **9** | **Aprendizados & Próximos Passos** | Retrospectiva técnica e evolução planejada para o projeto. | `learningsAndNextSteps: { learnings: string[]; nextSteps: string[] }` |

---

## 3. Modelo de Field Notes (Notas de Campo Técnicas)

As Field Notes são ensaios técnicos concisos orientados a experiências de bancada, refatorações, benchmarks e trade-offs arquiteturais. Obedecem à interface [`FieldNoteDetail`](file:///C:/Users/erick.alves/Documents/GitHub/erickg.dev/src/app/core/models/field-note.interface.ts):

- **Identificador e Metadados:** `id`, `number` (ex.: `#01`), `date`, `readingTime`, `category` (`Architecture`, `Security`, `Tooling`, `Performance`).
- **Resumo Executivo:** `title`, `summary`.
- **Corpo do Ensaio:** `content` (parágrafos estruturados).
- **Snippet de Código:** `codeSnippet` opcional com realce sintático e legenda editorial.
- **Trade-offs / Key Takeaways:** Lista de aprendizados práticos imediatos.
- **Tags Temáticas:** `tags: string[]`.

### Notas Atuais Registradas:
1. **NOTE #01:** *Migração Zoneless no Angular 21 com Signals*: Como o `provideExperimentalZonelessChangeDetection()` reduz o bundle e simplifica o ciclo de vida.
2. **NOTE #02:** *Autenticação Resiliente: Refresh Tokens com Rotação Estrita*: Evitando replay attacks e invalidando sessões comprometidas em APIs Node.js.
3. **NOTE #03:** *Otimização de Linha de Comando com Rust e Memory Zero-Copy*: Comparativo prático de overhead de IO e parses sem alocações dinâmicas.

---

## 4. Componentes Implementados

### 4.1 [`CaseStudyDetailComponent`](file:///C:/Users/erick.alves/Documents/GitHub/erickg.dev/src/app/features/case-studies/case-study-detail.component.ts)
- **Rota:** `/case-studies/:id`
- **Renderização Editorial:**
  - Header com numeração do capítulo e título estilizado em nanquim.
  - Grade de metadados técnicos (Papel, Ano, Repositório auditado, Demonstração).
  - Quadros com retículas CSS (`MangaPanel`, `.manga-panel-editorial`).
  - Blocos de código com contraste e numeração monoespaçada.
  - Links de retorno explícitos: `← VOLTAR PARA OBRAS SELECIONADAS` com âncora `/#projects`.

### 4.2 Modal / Leitor Rápido de Field Notes na Home
- Integrado no [`HomeComponent`](file:///C:/Users/erick.alves/Documents/GitHub/erickg.dev/src/app/features/home/home.component.ts).
- Ativação por clique em "LER NOTA COMPLETA →".
- Acessibilidade:
  - Foco gerenciado ao abrir o modal.
  - Tecla `Escape` para fechar.
  - Backdrop com bloqueio de clique externo.
  - `role="dialog"` e `aria-modal="true"`.

---

## 5. Roteamento e Acessibilidade

- **Acessibilidade WCAG 2.1 AA:**
  - Contraste estrito: Nanquim `#111111` sobre Fundo Papel `#F4F0E9` (relação ~16:1).
  - Destaques de ação em Vermelho Vermilion `#D9363E` sobre fundo neutro com contraste superior a 4.5:1.
  - Foco visível com outline duplo (`2px solid #111111` e offset `2px`).
  - Landmarks semânticos: `<main>`, `<article>`, `<header>`, `<section>`, `<footer>`.
- **Navegação Não-Destrutiva:**
  - O leitor convencional por rolagem permanece 100% navegável sem qualquer dependência do modo imersivo ou de JavaScript de animação.
  - Links profundos funcionam diretamente: `/case-studies/architect-forge`.

---

## 6. Cobertura de Testes

Os testes unitários cobrem:
- Renderização dos 9 tópicos obrigatórios quando os dados existem.
- Fallback e estado de erro amigável quando um ID inexistente é solicitado via URL (`case-studies/inexistente`).
- Preservação da navegação de retorno para `/#projects`.
- Abertura e fechamento acessível do modal de Field Notes.
