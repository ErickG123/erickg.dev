# Componentes de Quadros Editoriais — erickg.dev

> **Status:** Concluído &bull; **Data:** 23/10/2026 &bull; **Versão:** 1.0  
> **Volume:** 01 — *Tales of an Engineer* &bull; **Autor:** Erick Gabriel  
> **Arquitetura:** Angular 21 Standalone Components &bull; Angular Signals &bull; SCSS Modular

---

## 1. Visão Geral da Suíte de Quadros Editoriais

A suíte de componentes editoriais implementa os blocos de construção elementares da narrativa visual de mangá no portfólio. Desenvolvidos como **Standalone Components** com **Angular Signals**, os componentes são modulares, acessíveis e operam com responsabilidades estritas, evitando duplicação de regras CSS e assegurando responsividade completa:

```
                            ┌─────────────────────────────────────────┐
                            │     SUÍTE DE COMPONENTES EDITORIAIS     │
                            └────────────────────┬────────────────────┘
                                                 │
        ┌──────────────────────┬─────────────────┴───────────────┬──────────────────────┐
        ▼                      ▼                                 ▼                      ▼
┌───────────────┐      ┌───────────────┐                 ┌───────────────┐      ┌───────────────┐
│  ESTRUTURAIS  │      │ ENQUADRAMENTO │                 │  TEXTURAS E   │      │ TRANSIÇÕES &  │
│               │      │               │                 │  METADADOS    │      │ ACESSIBILIDADE│
│ • MangaPanel  │      │ • ArtworkFrame│                 │ • HalftoneSurf│      │ • MotionReveal│
│ • ChapterHead │      │ • PanelCaption│                 │ • ChapterMark │      │ • Prefers-    │
│ • Divider     │      │               │                 │               │      │   Reduced-Mot │
└───────────────┘      └───────────────┘                 └───────────────┘      └───────────────┘
```

---

## 2. Catálogo e Especificação Técnica dos Componentes

### 2.1. `MangaPanelComponent` (`app-manga-panel`)
Quadro semântico de contenção com projeção de conteúdo (`<ng-content>`), suporte a variantes editoriais, sombras sólidas e controle de elementos decorativos.

| Propriedade (`Input`) | Tipo | Valor Padrão | Descrição |
| :--- | :--- | :---: | :--- |
| `variant` | `'default' \| 'dark' \| 'accent' \| 'dashed' \| 'hero'` | `'default'` | Estilo visual e hierarquia do quadro. |
| `padding` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Espaçamento interno adaptável. |
| `interactive` | `boolean` | `false` | Se `true`, ativa elevação e sombra ao passar o mouse (`:hover`). |
| `cropMarks` | `boolean` | `false` | Se `true`, renderiza marcas de corte gráfica nos 4 cantos. |
| `decorative` | `boolean` | `true` | Se `false`, desativa sombras sólidas para modo minimalista/impressão. |
| `role` | `string \| null` | `null` | Atributo ARIA semântico (`article`, `region`, etc.). |

### 2.2. `ChapterHeaderComponent` (`app-chapter-header`)
Cabeçalho editorial padronizado com insígnia de capítulo, título hierárquico, subtítulo e sarjeta divisora opcional.

| Propriedade (`Input`) | Tipo | Valor Padrão | Descrição |
| :--- | :--- | :---: | :--- |
| `chapter` | `string` *(Obrigatório)* | — | Identificador do capítulo (ex.: `ACT 01`, `CHAPTER 02`). |
| `title` | `string` *(Obrigatório)* | — | Título principal em tipografia de impacto (`Anton`). |
| `subtitle` | `string` | `undefined` | Texto de apoio e contexto da seção. |
| `meta` | `string` | `undefined` | Metadados editoriais à direita (ex.: `7 SEÇÕES • 6 MIN`). |
| `accentBadge` | `boolean` | `false` | Se `true`, destaca a badge do capítulo em vermelho vermilion. |
| `accentTitle` | `boolean` | `false` | Se `true`, destaca o título em vermelho vermilion. |
| `showDivider` | `boolean` | `true` | Se `false`, oculta a sarjeta divisora inferior. |
| `align` | `'left' \| 'center' \| 'right'` | `'left'` | Alinhamento do cabeçalho. |

### 2.3. `ArtworkFrameComponent` (`app-artwork-frame`)
Moldura dedicada para enquadramento de ilustrações, diagramas técnicos e capturas, com proporção de aspecto estrita e cabeçalho de telemetria.

| Propriedade (`Input`) | Tipo | Valor Padrão | Descrição |
| :--- | :--- | :---: | :--- |
| `aspectRatio` | `'16:9' \| '4:5' \| '1:1' \| '2:1' \| 'auto'` | `'16:9'` | Relação de aspecto forçada via CSS `aspect-ratio`. |
| `borderStyle` | `'solid' \| 'dashed' \| 'none'` | `'solid'` | Estilo de contorno nanquim da moldura. |
| `cropMarks` | `boolean` | `true` | Marcas de corte editoriais nos cantos da arte. |
| `screentoneBackground` | `'none' \| 'light' \| 'medium' \| 'dense' \| 'crosshatch' \| 'blueprint'` | `'none'` | Retícula matemática renderizada como fundo da arte. |
| `frameLabel` | `string` | `undefined` | Rótulo técnico no topo (ex.: `FIG 02.1 // ESQUEMA`). |
| `statusBadge` | `string` | `undefined` | Badge de status à direita no topo (ex.: `VERIFICADO`). |
| `statusBadgeVariant` | `'default' \| 'vermilion' \| 'dark'` | `'default'` | Cor da badge de status. |

### 2.4. `HalftoneSurfaceComponent` (`app-halftone-surface`)
Superfície com textura de retícula matemática gerada puramente por CSS, consumindo zero banda de rede e mantendo nitidez absoluta.

| Propriedade (`Input`) | Tipo | Valor Padrão | Descrição |
| :--- | :--- | :---: | :--- |
| `pattern` | `'dots-light' \| 'dots-medium' \| 'dots-dense' \| 'lines-diagonal' \| 'crosshatch' \| 'blueprint'` | `'dots-light'` | Tipo e densidade da retícula de nanquim. |
| `padding` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Espaçamento interno. |
| `bordered` | `boolean` | `false` | Se `true`, adiciona contorno fino de nanquim. |
| `disabled` | `boolean` | `false` | Se `true`, remove a retícula mantendo o fundo liso. |

### 2.5. `PanelCaptionComponent` (`app-panel-caption`)
Caixa de narração editorial, diálogo ou telemetria técnica associada a quadros de mangá.

| Propriedade (`Input`) | Tipo | Valor Padrão | Descrição |
| :--- | :--- | :---: | :--- |
| `type` | `'narration' \| 'voiceover' \| 'technical' \| 'footnote'` | `'narration'` | Formato visual: narração de mangá, diálogo com destaque vermilion, terminal monospace ou nota de rodapé. |
| `stampText` | `string` | `undefined` | Rótulo superior em monospace (ex.: `TELEMETRY // LOG_01`). |
| `vermilionAccent` | `boolean` | `false` | Destaque na borda em vermelho vermilion. |

### 2.6. `ChapterMarkerComponent` (`app-chapter-marker`)
Marcador de capítulo compacto para navegação, sumários e índices.

| Propriedade (`Input`) | Tipo | Valor Padrão | Descrição |
| :--- | :--- | :---: | :--- |
| `number` | `string` *(Obrigatório)* | — | Número ou código (ex.: `02`, `EP`, `MOKUROKU`). |
| `label` | `string` | `undefined` | Texto de descrição do capítulo. |
| `variant` | `'default' \| 'vermilion' \| 'dark' \| 'screentone'` | `'default'` | Estilo de superfície da tag. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Dimensões da tag. |
| `active` | `boolean` | `false` | Se `true`, destaca como capítulo ativo com ponto vermilion. |

### 2.7. `EditorialDividerComponent` (`app-editorial-divider`)
Sarjeta de separação editorial de nanquim entre blocos narrativos.

| Propriedade (`Input`) | Tipo | Valor Padrão | Descrição |
| :--- | :--- | :---: | :--- |
| `variant` | `'solid' \| 'dashed' \| 'double'` | `'solid'` | Estilo da linha (sólida 4px, tracejada ou dupla). |
| `withAccentSquare` | `boolean` | `true` | Quadrado de acento vermilion de 12px à direita. |
| `spacing` | `'sm' \| 'md' \| 'lg'` | `'md'` | Margens verticais. |
| `label` | `string` | `undefined` | Texto central opcional (ex.: `CONTINUA`, `ACT III`). |

### 2.8. `MotionRevealComponent` (`app-motion-reveal`)
Contêiner de revelação progressiva suave com detecção de movimento e respeito irrestrito à acessibilidade.

| Propriedade (`Input`) | Tipo | Valor Padrão | Descrição |
| :--- | :--- | :---: | :--- |
| `direction` | `'up' \| 'down' \| 'left' \| 'right' \| 'fade'` | `'up'` | Direção do deslocamento sutil de entrada. |
| `delayMs` | `number` | `0` | Delay da transição em milissegundos. |
| `disabled` | `boolean` | `false` | Se `true`, exibe instantaneamente sem transição. |
| *A11y Automática* | *Nativo* | — | Sob `prefers-reduced-motion: reduce`, a animação é desativada instantaneamente via CSS. |

---

## 3. Demonstração Interativa (`/design-system`)

Uma seção completa demonstrando todos os componentes em ação está disponível na rota interativa [`/design-system`](file:///C:/Users/erick.alves/Documents/GitHub/erickg.dev/src/app/features/design-system/design-system.component.html) (**Section 05: Manga Frames Suite**):
- Variações de quadros (`default`, `accent`, `dark`, `dashed`).
- Molduras de arte 16:9 com grade *blueprint* e molduras 1:1 com retícula.
- Legendas de narração editorial, discursos do autor e telemetria de interceptor.
- Marcadores de capítulo com estados ativo, screentone e vermilion.
- Sarjetas divisoras com quadrado de acento e rótulos.
