# Arquitetura de Navegação e Modos de Leitura

> **Status:** Concluído &bull; **Data:** 23/10/2026 &bull; **Versão:** 1.0  
> **Volume:** 01 — *Tales of an Engineer* &bull; **Autor:** Erick Gabriel

---

## 1. Visão Geral e Conceito

O portfólio adota uma arquitetura de leitura com **dualidade harmoniosa**, permitindo que o visitante experimente o conteúdo através de dois modos complementares, sem duplicação de dados e sem barreiras de acesso:

```
                          ┌──────────────────────────┐
                          │   ReaderStateService     │
                          │   (Single Source of Truth│
                          └─────────────┬────────────┘
                                        │
                 ┌──────────────────────┴──────────────────────┐
                 ▼                                             ▼
     ┌───────────────────────┐                     ┌───────────────────────┐
     │    Modo Editorial     │ ◄─── Sync ────────► │     Modo Imersivo     │
     │  (Rolagem Contínua)   │      Bidirecional   │  (Virada de Páginas)  │
     │                       │                     │                       │
     │ • Rolagem nativa      │                     │ • Páginas numeradas   │
     │ • ScrollSpy ativo     │                     │ • Virada 3D rápida    │
     │ • Âncoras e URLs      │                     │ • Touch swipe & Teclas│
     │ • Índice Mokuroku     │                     │ • Barra de progresso  │
     └───────────────────────┘                     └───────────────────────┘
```

---

## 2. Fonte Única da Verdade (`portfolio.data.ts` + `ReaderStateService`)

Para eliminar riscos de descompasso de dados, tanto o modo editorial quanto o leitor imersivo consomem os **mesmos objetos de dados** importados de [`portfolio.data.ts`](file:///C:/Users/erick.alves/Documents/GitHub/erickg.dev/src/app/core/data/portfolio.data.ts):
- `HERO_DATA`: Frontispício e apresentação inicial
- `CHAPTERS_INDEX`: Sumário estrutural
- `FEATURED_PROJECTS_DATA`: Projetos autorais reais
- `METHOD_PILLARS`: Filosofia Think, Break, Rebuild
- `FIELD_NOTES_DATA`: Caderno de campo e ensaios
- `AUTHOR_DATA`: Biografia, trajetória e habilidades

O estado de leitura é gerenciado centralmente por [`ReaderStateService`](file:///C:/Users/erick.alves/Documents/GitHub/erickg.dev/src/app/core/state/reader-state.service.ts), utilizando **Angular Signals** e tipagem estrita:

```typescript
export type ReadingMode = 'editorial' | 'immersive';

export type ChapterSectionId =
  | 'cover'
  | 'index-section'
  | 'projects'
  | 'method'
  | 'notes'
  | 'about'
  | 'contact';
```

---

## 3. Matriz de Mapeamento Bidirecional

Cada seção do modo editorial possui uma correspondência exata com as páginas do leitor imersivo:

| Seção (`ChapterSectionId`) | Âncora Editorial | Página no Leitor (`pageIndex`) | Título do Capítulo |
| :--- | :--- | :---: | :--- |
| `cover` | `#cover` | `0` | ACT 00 &bull; Capa & Frontispício |
| `index-section` | `#index-section` | `1` | MOKUROKU &bull; Sumário Editorial |
| `projects` | `#projects` | `2` e `3` | CAP. 02 &bull; Obras Selecionadas |
| `method` | `#method` | `4` | CAP. 03 &bull; O Método: Think, Break, Rebuild |
| `notes` | `#notes` | `5` | CAP. 04 &bull; Field Notes & Ensaios |
| `about` | `#about` | `6` | CAP. 05 &bull; Ficha do Engenheiro |
| `contact` | `#contact` | `7` | EPÍLOGO &bull; Mural de Transmissão |

---

## 4. Dinâmica de Sincronização entre os Modos

### 4.1. Transição Editorial ➔ Imersivo
1. Conforme o usuário rola o modo editorial, o `IntersectionObserver` do [`HomeComponent`](file:///C:/Users/erick.alves/Documents/GitHub/erickg.dev/src/app/features/home/home.component.ts) detecta a seção visível e chama `readerState.setActiveSection(sectionId)`.
2. Ao clicar no botão **"ATIVAR LEITOR DE MANGÁ 📖"**, o leitor abre imediatamente na página correspondente à seção em que o usuário estava lendo.
3. Não há perda de contexto nem reinício forçado na página 0.

### 4.2. Transição Imersivo ➔ Editorial
1. Conforme o leitor avança pelas páginas (via botões, setas ou swipe touch), o método `setReaderPageIndex(pageIdx)` mapeia reversamente a página para a seção correspondente e atualiza `activeSection()`.
2. Ao clicar em **"VOLTAR AO MODO EDITORIAL 📜"** ou pressionar `Escape`, o sistema retorna ao modo editorial e executa um `scrollIntoView({ behavior: 'smooth' })` para o ID da seção atual.

---

## 5. Recursos de Acessibilidade e Teclado

1. **Navegação no Modo Editorial:**
   - 100% de suporte a rolagem nativa de tela e links de âncora (`#projects`, `#method`, etc.).
   - Foco visual claro em todos os botões e links de navegação.
   - Anúncios semânticos via tags `<section>`, `<nav>`, `<article>`, `<footer>`.

2. **Navegação no Modo Imersivo:**
   - Atalhos de teclado: `ArrowRight` (próxima página) e `ArrowLeft` (página anterior).
   - Bloqueio automático de atalhos quando o usuário estiver digitando em campos `<input>`, `<textarea>` ou `contenteditable`.
   - Atalho `Escape` para retornar instantaneamente ao modo editorial.
   - Suporte a toque com gestos swipe horizontais (tolerância mínima de 50px e discriminação contra gestos verticais).
   - Anúncios de leitor de tela via `aria-live="polite"`.

3. **Diretrizes para Telas Menores e Mobile:**
   - O modo imersivo nunca é imposto por padrão em telas pequenas (`width < 768px`).
   - A rolagem contínua editorial permanece sendo o fluxo padrão, responsivo e fluido em qualquer formato de viewport.
