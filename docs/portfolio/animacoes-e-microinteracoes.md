# Animações e Microinterações — Sistema de Movimento Editorial

Este documento especifica a gramática de movimento, os tokens de transição, as diretrizes de acessibilidade e o catálogo de microinterações implementadas no portfólio `erickg.dev`.

---

## 1. Princípios de Movimento Editorial

Inspirado nas convenções de publicações impressas de mangá e tipografia editorial contemporânea, o movimento não atua como mero artifício estético decorativo, mas sim como **pontuação visual e feedback tátil**:

1. **Movimento Curto e Preciso (Snappy & Tactile):** Acelerações rápidas com desaceleração nítida (`cubic-bezier(0.16, 1, 0.3, 1)` e `cubic-bezier(0, 0, 0.2, 1)`), simulando o peso do papel e a nitidez do carimbo de nanquim.
2. **Zero Bloqueio Editorial:** Nenhuma animação bloqueia rolagem, cliques, teclado ou seleção de texto. O conteúdo essencial é renderizado imediatamente na árvore DOM e nunca aguarda o término de um efeito.
3. **Sem Parallax Intenso ou Falso:** Microdeslocamentos de ilustrações limitados a no máximo 2% a 2.5% de escala em repouso (`scale(1.02)`), sem simulações vertiginosas de profundidade.
4. **Respeito Estrito à Acessibilidade:** Conformidade WCAG 2.1 Critério 2.3.3 (Animation from Interactions) e suporte total a `prefers-reduced-motion: reduce`.
5. **Prevenção de CLS (Cumulative Layout Shift):** Animações limitadas exclusivamente às propriedades aceleradas por GPU (`transform`, `opacity`, `box-shadow` e `background-color`).

---

## 2. Tokens de Duração e Curvas de Aceleração

Definidos globalmente em [`_tokens.scss`](file:///C:/Users/erick.alves/Documents/GitHub/erickg.dev/src/styles/_tokens.scss) e centralizados em [`_animations.scss`](file:///C:/Users/erick.alves/Documents/GitHub/erickg.dev/src/styles/_animations.scss):

| Token CSS | Duração / Curva | Finalidade Editorial |
|---|---|---|
| `--transition-instant` | `0.05s ease` | Feedback imediato de clique em botões (`:active`). |
| `--transition-snappy` | `0.15s cubic-bezier(0, 0, 0.2, 1)` | Reação tátil de hover em cards, botões e badges. |
| `--transition-smooth` | `0.25s cubic-bezier(0.4, 0, 0.2, 1)` | Transições de cor, retículas e sombras secundárias. |
| `--transition-editorial`| `0.35s cubic-bezier(0.16, 1, 0.3, 1)` | Entrada discreta do hero e transições de painéis. |
| `--ease-editorial` | `cubic-bezier(0.16, 1, 0.3, 1)` | Easing de desaceleração suave inspirada na física de folheamento. |
| `--ease-snap` | `cubic-bezier(0, 0, 0.2, 1)` | Easing mecânico para virada de página e rotação de marcadores. |

---

## 3. Catálogo de Animações Permitidas

### 3.1 Entrada Discreta do Hero & Frontispício
- **Localização:** [`MangaHeroComponent`](file:///C:/Users/erick.alves/Documents/GitHub/erickg.dev/src/app/features/home/components/manga-hero/manga-hero.component.html)
- **Implementação:** `.animate-hero-entrance`
- **Comportamento:** O invólucro do hero realiza um fade-in com microdeslocamento vertical (`translateY(10px) → translateY(0)`) em 350ms.
- **Carimbo Hanko:** `.animate-hanko-stamp` aplica um sutil impacto de carimbo físico (`scale(1.15) rotate(-2deg) → scale(1)`), consolidando a assinatura do autor.
- **Indicador de Rolagem:** `.animate-scroll-bounce` pulsa discretamente a seta (`translateY(0) → translateY(4px)` a cada 2.2s).

### 3.2 Revelação Progressiva de Quadros (Progressive Panel Reveal)
- **Localização:** [`MotionRevealComponent`](file:///C:/Users/erick.alves/Documents/GitHub/erickg.dev/src/app/shared/components/motion-reveal/motion-reveal.component.ts)
- **Implementação:** Observador de interseção adaptativo (`IntersectionObserver`) com limiar de 10% e margem negativa de 40px.
- **Direções suportadas:** `up`, `down`, `left`, `right`, `fade`.
- **Garantia de Resiliência:** Caso `IntersectionObserver` não esteja disponível no ambiente ou o suporte a JavaScript sofra atraso, a revelação é disparada instantaneamente sem esconder o texto.

### 3.3 Pequenos Movimentos de Ilustrações
- **Localização:** [`MangaProjectCardComponent`](file:///C:/Users/erick.alves/Documents/GitHub/erickg.dev/src/app/shared/components/manga-project-card/manga-project-card.component.ts) e [`MangaImageComponent`](file:///C:/Users/erick.alves/Documents/GitHub/erickg.dev/src/app/shared/components/manga-image/manga-image.component.ts)
- **Implementação:** Classe `.manga-illustration-interactive`
- **Comportamento:** Em repouso com cursor do mouse sobre o painel, a imagem sofre suave ampliação ótica (`scale(1.02)`), mantendo a sarjeta preta e o contorno intactos sem estourar as margens (`overflow: hidden`).
- **Sem Parallax:** Nenhuma rolagem desacoplada que cause desconforto vestibular.

### 3.4 Feedback de Hover e Foco Acessível
- **Botões (`.manga-btn`):**
  - *Hover:* Elevação tátil de `-2px, -2px` com projeção da sombra preta sólida (`box-shadow: var(--shadow-md)`).
  - *Active:* Afundamento tátil em `+2px, +2px` com anulação da sombra (`box-shadow: none`), emulando um botão físico de arcade / prensa tipográfica.
  - *Focus-visible:* Contorno duplo tracejado de alto contraste (`outline: 2px dashed var(--manga-vermilion); outline-offset: 4px;`).
- **Setas de Ação (`.action-arrow-hover`):** Microdeslocamento horizontal de `+4px` ao pairar o mouse sobre cartões ou botões de link.

### 3.5 Transições entre Capítulos e Destaque da Seção Ativa
- **Localização:** Sumário Mokuroku ([`home.component.html`](file:///C:/Users/erick.alves/Documents/GitHub/erickg.dev/src/app/features/home/home.component.html)) e Barra de Status.
- **Destaque do Capítulo Atual:**
  - O card correspondente em `.chapter-nav-card.is-active` exibe barra lateral em vermelho vermilion de 4px e contorno com hard offset.
  - A barra superior reflete a seção ativa em sincronia com o `IntersectionObserver` do ScrollSpy.
- **Sarjeta Editorial:** A linha divisória `.gutter-divider` rotaciona seu marcador vermilion em 45 graus quando inspecionada com o mouse.

### 3.6 Virada de Página no Modo Imersivo
- **Localização:** [`MangaReaderComponent`](file:///C:/Users/erick.alves/Documents/GitHub/erickg.dev/src/app/features/home/components/manga-reader/manga-reader.component.scss)
- **Implementação:** `.reader-book-stage.turn-forward` e `.turn-backward`.
- **Efeito:**
  - Perspectiva 3D suave (`1400px`) com rotação de `-7deg` / `+7deg` e deslocamento lateral de 10px.
  - Sombra da dobra central de lombada simulando curvatura de papel espesso (`linear-gradient(to right, rgba(17, 17, 17, 0.1), transparent)`).
  - Duração ágil de **220ms**, permitindo folheamento veloz por setas do teclado ou swipe por toque sem sensação de lentidão.

---

## 4. Tratamento Especial para Cenários Críticos

### 4.1 Preferência de Movimento Reduzido (`prefers-reduced-motion: reduce`)
Quando a configuração de acessibilidade do usuário solicita redução de movimento:
- Todas as durações de animação e transição são fixadas em `0.001ms`.
- As classes `.animate-hero-entrance`, `.animate-hanko-stamp`, `.animate-panel-reveal` e `.animate-scroll-bounce` são anuladas (`animation: none !important; transform: none !important; opacity: 1 !important;`).
- A virada de páginas no modo imersivo é substituída por troca imediata de conteúdo com leve dissolvência estática.

### 4.2 Dispositivos de Toque (Mobile / Tablets)
- Via consulta de mídia `@media (hover: none) or (pointer: coarse)`:
  - Interações de cursor que causavam transformações que ficavam "presas" em telas touch foram anuladas nos estados `:hover`.
  - Apenas o estado `:active` é preservado, fornecendo feedback tátil tátil e instantâneo durante o toque do dedo.

### 4.3 Resiliência sem Imagens Carregadas
- Caso a conexão esteja lenta ou as imagens falhem:
  - O componente [`MangaImageComponent`](file:///C:/Users/erick.alves/Documents/GitHub/erickg.dev/src/app/shared/components/manga-image/manga-image.component.ts) renderiza o skeleton com retícula matemática e texto `ENTINTANDO PAINEL...`.
  - O aspecto de proporção (`aspect-ratio: 16/9`, `4/3`, `1/1`) é reservado em CSS antes do carregamento da mídia, garantindo **Zero CLS** e nenhuma oscilação de layout durante a rolagem.
