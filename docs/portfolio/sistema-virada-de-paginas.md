# Sistema de Leitura Imersiva e Virada de Páginas — erickg.dev

> **Status:** Implementado e Homologado  
> **Versão:** 1.0.0  
> **Componente Principal:** [`MangaReaderComponent`](file:///C:/Users/erick.alves/Documents/GitHub/erickg.dev/src/app/features/home/components/manga-reader/manga-reader.component.ts)  
> **Serviço de Orquestração:** [`ReaderStateService`](file:///C:/Users/erick.alves/Documents/GitHub/erickg.dev/src/app/core/state/reader-state.service.ts)

---

## 1. Avaliação Técnica e Seleção da Abordagem

Antes da implementação, foram avaliadas três opções arquiteturais para o sistema de folheamento de páginas no contexto do Angular 21 Zoneless:

| Abordagem Avaliada | Impacto no Bundle | Acessibilidade (a11y) | Compatibilidade Angular 21 | Decisão |
| :--- | :--- | :--- | :--- | :--- |
| **1. Biblioteca Especializada (ex: StPageFlip / PageFlip)** | +45 kB a 80 kB (Canvas / DOM mutations) | Baixa (captura eventos nativos, dificulta seleção de texto e leitores de tela) | Complexa (manipula nós fora do ciclo reativo dos Signals) | **Descartada:** Adicionaria dependência pesada sem justificativa funcional e degradaria a acessibilidade. |
| **2. CSS Puro Estático sem Estado** | 0 kB | Média (depende exclusivamente de hacks de checkbox/âncoras) | Baixa (sem persistência, sem navegação por teclado controlada) | **Descartada:** Insuficiente para gerenciar estados de capítulo e limites de leitura. |
| **3. Solução Híbrida Nativa (Signals + CSS 3D Transforms)** | **0 kB extras** | **Alta (WCAG 2.1 AA, DOM semântico limpo, ARIA live)** | **Perfeita (Signals nativos, sem zone.js overhead)** | **ESCOLHIDA:** Máxima performance, zero overhead, foco previsível e fallback automático. |

---

## 2. Decisões de Arquitetura e Engenharia

### 2.1 Desacoplamento entre Conteúdo e Apresentação Animada
O conteúdo editorial dos capítulos reside nos dados estruturados de [src/app/core/data/portfolio.data.ts](file:///C:/Users/erick.alves/Documents/GitHub/erickg.dev/src/app/core/data/portfolio.data.ts). O [`MangaReaderComponent`](file:///C:/Users/erick.alves/Documents/GitHub/erickg.dev/src/app/features/home/components/manga-reader/manga-reader.component.ts) atua estritamente como uma camada de projeção e orquestração de páginas, consumindo o estado reativo do [`ReaderStateService`](file:///C:/Users/erick.alves/Documents/GitHub/erickg.dev/src/app/core/state/reader-state.service.ts).

### 2.2 Dualidade de Modos de Leitura (Comutação Transparente)
O leitor imersivo é **100% opcional**. Através de um botão de ação na barra de leitura, o visitante pode alternar instantaneamente entre:
- **Modo Editorial (Scroll Vertical Padrão):** Ideal para recrutadores com pressa e dispositivos móveis.
- **Modo Leitor Imersivo (Page-Turn):** Experiência que simula o folheamento de um volume de mangá com transições 3D aceleradas por GPU (`transform: perspective(1400px) rotateY(...)`).

### 2.3 Tratamento Seguro de Navegação por Teclado
- As teclas de seta (← e →) avançam e recuam páginas **apenas quando o modo leitor estiver ativo**.
- O listener de teclado verifica ativamente se o elemento com foco atual é um `<input>`, `<textarea>` ou elemento editável, garantindo que o usuário possa preencher o formulário de contato sem disparar viradas de página acidentais.

### 2.4 Navegação Touch e Gestual
- Suporte a detecção de gestos de deslizar (*swipe*) horizontal em dispositivos touch com limiar de tolerância de 50px para evitar disparos falsos durante toques verticais.

---

## 3. Conformidade com Acessibilidade (WCAG 2.1 AA)

1. **Leitores de Tela:**
   - As páginas ativas utilizam `role="region"` e `aria-roledescription="página de mangá"`.
   - Um elemento `<div aria-live="polite" class="sr-only">` anuncia a mudança de página de forma sucinta (ex: *"Página 3 de 8: Obras Selecionadas"*), sem narrar detalhes de animação gráfica.
2. **`prefers-reduced-motion`:**
   - Caso o usuário tenha ativado a preferência de movimento reduzido no sistema operacional, as rotações 3D de perspectiva são imediatamente anuladas via media query, substituindo o efeito por crossfade direto de opacidade.
3. **Controle de Limites:**
   - Na primeira página, o botão "Anterior" é desabilitado (`disabled` e `aria-disabled="true"`).
   - Na última página, o botão "Próximo" é desabilitado com indicação visual clara de fim de volume.

---

## 4. Limitações Conhecidas da Solução

1. **Curvatura Realista de Papel Físico:**
   - A solução utiliza transformações afins e 3D planas do CSS (`rotateY` com ponto de pivô lateral). Não simula a curvatura de deformação de malha flexível de página real (que exigiria WebGL/Three.js e penalizaria os orçamentos de desempenho para dispositivos móveis).
2. **Exibição em Folha Dupla em Telas Pequenas:**
   - Em larguras inferiores a 768px, o leitor opera exclusivamente no modo de folha única (*Single Page View*), pois a exibição dupla comprometeria a legibilidade do texto técnico.
