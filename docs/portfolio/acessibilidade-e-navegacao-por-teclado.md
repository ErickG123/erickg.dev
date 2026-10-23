# Acessibilidade e Navegação por Teclado — Relatório de Conformidade WCAG 2.1 AA

Este documento registra a auditoria técnica, as correções implementadas e os testes de conformidade sistemática com as diretrizes do **WCAG 2.1 Nível AA** (com diversos critérios atingindo **Nível AAA**) no portfólio `erickg.dev`.

---

## 1. Resumo Executivo & Indicadores de Conformidade

| Critério WCAG 2.1 | Requisito | Status | Implementação no Projeto |
|---|---|:---:|---|
| **1.3.1 Info and Relationships** | Estrutura semântica e landmarks | **CONFORME** | `<main id="main-content">` único, `<nav>`, `<section>`, `<article>`, `<aside>`, `<footer>`. |
| **1.3.2 Meaningful Sequence** | Ordem de leitura lógica | **CONFORME** | Ordem do DOM espelha rigorosamente a hierarquia visual editorial. |
| **1.4.3 Contrast (Minimum)** | Contraste de texto mínimo 4.5:1 | **CONFORME** | Todas as cores de texto revisadas: Nanquim (16.3:1), Cinza (6.3:1), Vermilion (6.6:1). |
| **1.4.11 Non-text Contrast** | Contraste de componentes e foco | **CONFORME** | Contornos de botões, inputs e retículas superam 3:1 contra o fundo. |
| **2.1.1 Keyboard** | Operável por teclado | **CONFORME** | 100% das ações utilizáveis via `Tab`, `Enter`, `Space`, `Escape` e Setas. |
| **2.1.2 No Keyboard Trap** | Sem armadilhas de foco | **CONFORME** | Modais permitem saída imediata via `Escape` ou clique no backdrop. |
| **2.3.3 Animation from Interactions** | Movimento reduzido | **CONFORME** | Anulação completa de transições e transformações via `prefers-reduced-motion`. |
| **2.4.1 Bypass Blocks** | Pular blocos repetitivos | **CONFORME** | Skip Link funcional `.skip-link` direcionando direto para `#main-content`. |
| **2.4.3 Focus Order** | Ordem de foco previsível | **CONFORME** | Navegação sequencial sem índices `tabindex` positivos artificiais. |
| **2.4.6 Headings and Labels** | Títulos e rótulos descritivos | **CONFORME** | Hierarquia rigorosa: um único `<h1>` por página, `<h2>` para capítulos, rótulos explícitos em forms. |
| **2.4.7 Focus Visible** | Foco visível | **CONFORME** | Anel duplo tracejado em vermilion com contorno secundário de contraste em qualquer fundo. |
| **2.5.1 Pointer Gestures** | Alternativas a gestos de arrasto | **CONFORME** | Swipe touch do leitor de mangá possui alternativa total por botões e teclado. |
| **4.1.2 Name, Role, Value** | Nomes e papéis acessíveis | **CONFORME** | Diálogos com `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, `aria-current="page"`. |

---

## 2. Estrutura Semântica e Landmarks

### 2.1 Correção de Landmarks Duplicados
- **Problema Detectado:** O componente raiz [`app.html`](file:///C:/Users/erick.alves/Documents/GitHub/erickg.dev/src/app/app.html) continha uma tag `<main>`, enquanto componentes filhos ([`home.component.html`](file:///C:/Users/erick.alves/Documents/GitHub/erickg.dev/src/app/features/home/home.component.html) e [`case-study-detail.component.html`](file:///C:/Users/erick.alves/Documents/GitHub/erickg.dev/src/app/features/case-studies/case-study-detail.component.html)) declaravam suas próprias tags `<main>` internas.
- **Correção Aplicada:**
  - `app.html`: Mantido como o único landmark principal da aplicação: `<main id="main-content" tabindex="-1" class="flex-grow-1 p-4 route-container" aria-label="Conteúdo Principal">`.
  - `home.component.html`: Raiz convertida para `<div class="manga-container">`.
  - `case-study-detail.component.html`: Raiz convertida semanticamente para `<article class="manga-container case-study-page py-6">`.

### 2.2 Skip Link (Pular para Conteúdo Principal)
- Implementado em [`app.html`](file:///C:/Users/erick.alves/Documents/GitHub/erickg.dev/src/app/app.html):
  ```html
  <a href="#main-content" class="skip-link">PULAR PARA O CONTEÚDO PRINCIPAL [TAB]</a>
  ```
- Estilizado em [`src/styles.scss`](file:///C:/Users/erick.alves/Documents/GitHub/erickg.dev/src/styles.scss): oculto visualmente fora da tela (`top: -100px`) até receber foco pelo teclado (`:focus { top: 1rem; }`), com alto contraste em nanquim e borda vermilion.

---

## 3. Hierarquia dos Títulos (Heading Hierarchy)

- **Eliminação de H1 Duplicado no Header:** A barra de topo ([`header.component.html`](file:///C:/Users/erick.alves/Documents/GitHub/erickg.dev/src/app/layout/header/header.component.html)) utilizava uma tag `<h1>` com o título `ERICK_DEV.EXE`, competindo com o título da página. Foi convertida para um link de marca semântico `<a class="header-title" routerLink="/" aria-label="Erick Gabriel - Página Inicial">`.
- **Árvore de Títulos Normalizada na Home:**
  - `H1`: Tagline principal do autor no Hero ([`manga-hero.component.html`](file:///C:/Users/erick.alves/Documents/GitHub/erickg.dev/src/app/features/home/components/manga-hero/manga-hero.component.html#L31)): `“I BUILD. I SOLVE. I IMPROVE.”`.
  - `H2`: Cada capítulo/seção canônica com [`ChapterHeadingComponent`](file:///C:/Users/erick.alves/Documents/GitHub/erickg.dev/src/app/shared/components/chapter-heading/chapter-heading.component.ts) (`#index-section`, `#projects`, `#method`, `#notes`, `#about`, `#contact`).
  - `H3`: Títulos de projetos individuais, cards de Field Notes e pilares metodológicos.
  - `H4`: Subtópicos de arquitetura, análises de engenharia e metadados.

---

## 4. Contraste de Texto e Componentes (Matemática W3C)

Todos os contrastes foram auditados matematicamente e validados por suíte de testes automatizada em [`accessibility.spec.ts`](file:///C:/Users/erick.alves/Documents/GitHub/erickg.dev/src/app/core/accessibility.spec.ts):

| Combinação de Cores | Amostra Hexadecimal | Razão de Contraste | Nível WCAG Atingido |
|---|---|:---:|:---:|
| **Nanquim sobre Papel** | `#111111` sobre `#F4F0E9` | **16.3:1** | **AAA** (Exige ≥ 7.0:1) |
| **Cinza Editorial Recalibrado** | `#595552` sobre `#F4F0E9` | **6.3:1** | **AA** (Exige ≥ 4.5:1) |
| **Cinza Editorial sobre Branco** | `#595552` sobre `#FFFFFF` | **7.2:1** | **AAA** (Exige ≥ 7.0:1) |
| **Vermilion Texto sobre Papel** | `#B32027` sobre `#F4F0E9` | **6.6:1** | **AA** (Exige ≥ 4.5:1) |
| **Texto Branco sobre Botão Vermilion** | `#FFFFFF` sobre `#D9363E` | **4.88:1** | **AA** (Exige ≥ 4.5:1) |

*Nota de Recalibração:* O tom cinza original (`#77736F`) oferecia 4.08:1 contra o papel aquecido, abaixo dos 4.5:1 requeridos para corpo de texto regular. Foi recalibrado para `#595552`, garantindo 6.3:1 sem perder a estética de meio-tom editorial de nanquim.

---

## 5. Foco Visível e Navegação por Teclado

### 5.1 Foco de Alto Contraste Dual
- Definido em [`src/styles.scss`](file:///C:/Users/erick.alves/Documents/GitHub/erickg.dev/src/styles.scss):
  ```scss
  :focus-visible {
    outline: 2px dashed var(--manga-vermilion);
    outline-offset: 3px;
    box-shadow: 0 0 0 2px var(--manga-paper);
  }

  .manga-panel--dark :focus-visible,
  [data-theme="dark"] :focus-visible {
    outline: 2px dashed #FFFFFF;
    outline-offset: 3px;
    box-shadow: 0 0 0 2px var(--manga-vermilion);
  }
  ```
- O anel duplo tracejado garante visibilidade tanto em superfícies claras quanto escuras ou texturizadas com retícula.

### 5.2 Diálogo de Field Notes (Modal Editorial)
- **Atributos ARIA:** `role="dialog"`, `aria-modal="true"`, `aria-labelledby="active-note-title"`, `aria-describedby="active-note-synopsis"`.
- **Gerenciamento de Foco:**
  - Ao abrir: memoriza `document.activeElement` e transfere o foco automaticamente para o botão `FECHAR [ × ]`.
  - Ao fechar via clique, botão ou tecla `Escape`: o foco é devolvido com precisão para o card de origem que disparou a abertura.
  - Listener global `@HostListener('document:keydown')` intercepta `Escape` e fecha o diálogo com segurança.

---

## 6. Acessibilidade na Virada de Páginas (`MangaReaderComponent`)

- **Anúncio em Tempo Real (Live Region):**
  ```html
  <div class="sr-only" aria-live="polite">
    Página {{ currentPageIndex() + 1 }} de {{ totalPages() }}: {{ currentPage().title }}
  </div>
  ```
  Leitores de tela recebem a notificação do capítulo e título imediatamente após a transição.
- **Paginação em Miniaturas:**
  Encapsulada em `<nav aria-label="Navegação rápida entre páginas do volume">` com cada botão dot contendo `[attr.aria-current]="page.index === currentPageIndex() ? 'page' : null"` e rótulo individualizado (`Ir para página 2: Obras Selecionadas`).
- **Alternativas a Gestos Touch:**
  Além do swipe horizontal, o visitante dispõe dos botões visíveis `← ANTERIOR` e `PRÓXIMA →` e das setas físicas do teclado (`ArrowLeft` e `ArrowRight`).

---

## 7. Formulários e Rótulos

No Mural de Transmissão ([`home.component.html`](file:///C:/Users/erick.alves/Documents/GitHub/erickg.dev/src/app/features/home/home.component.html#L466-L493)):
- Todos os campos (`#contact-name`, `#contact-email`, `#contact-msg`) possuem `<label for="...">` explícitos.
- Atributos `aria-required="true"` e `required` aplicados.
- Atributos de preenchimento automático semânticos configurados: `autocomplete="name"` e `autocomplete="email"`.

---

## 8. Verificação de Zoom, Reflow e Uso sem Dependência de Cor

1. **Zoom de até 200%:** A escala tipográfica baseada em `clamp()` e unidades relativas (`rem`) assegura que o texto expanda sem truncamento e sem exigir rolagem bidirecional em janelas de 1280px a 320px (WCAG 1.4.10 Reflow).
2. **Independência de Cor:** Badges e estados ativos não utilizam apenas a cor vermelha:
   - Acompanhados de texto explícito (ex.: `[ SEÇÃO ATIVA ]`, `[ ONLINE ]`).
   - Linhas laterais de 4px de espessura e sombras sólidas (*hard offset*).
   - Ícones e carimbos tipográficos (*Hanko Stamp*).

---

## 9. Limitações Remanescentes e Recomendações

1. **Modo Imersivo em Telas Estreitas:** O leitor de páginas 3D funciona em dispositivos móveis, mas a rolagem contínua padrão continua sendo a experiência mais recomendada para leitores de tela em smartphones. A interface mantém a rolagem contínua como modo padrão.
2. **Traduções Dinâmicas:** O cabeçalho inclui suporte a internacionalização via `ngx-translate`. Quando novas línguas forem adicionadas aos arquivos JSON, deve-se revisar a pontuação de pronúncia em leitores de tela.
