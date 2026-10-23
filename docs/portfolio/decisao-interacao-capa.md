# Decisão de Interação: Capa Editorial e Entrada na Leitura

> **Status:** Implementado e Validado  
> **Versão:** 1.0.0  
> **Componente:** [`BookCoverComponent`](file:///C:/Users/erick.alves/Documents/GitHub/erickg.dev/src/app/features/home/components/book-cover/book-cover.component.ts) & [`ReaderStateService`](file:///C:/Users/erick.alves/Documents/GitHub/erickg.dev/src/app/core/state/reader-state.service.ts)

---

## 1. Contexto e Motivação

O portfólio anterior implementava um bloqueio artificial de carregamento de 3.5 segundos (`isBooting`) com tela preta e logotipo retrô, impedindo o acesso imediato de visitantes e recrutadores.

Para o novo conceito de **Mangá Digital Editorial**, era necessário criar uma experiência de abertura expressiva — inspirada no ato tátil de abrir um volume físico de mangá — que preparasse o visitante para a narrativa visual **sem impor barreiras de acessibilidade, bloqueios arbitrários de rolagem ou atrasos artificiais**.

---

## 2. Decisões de Interação e Arquitetura

### 2.1 Ação Primária Explícita ("Abrir Portfólio")
- **Gatilho Principal:** Botão de alto contraste vermilion `[ ABRIR PORTFÓLIO / INICIAR LEITURA &rarr; ]`.
- **Interação Multimodal:**
  - **Mouse / Ponteiro:** Clique no botão.
  - **Touch:** Toque responsivo com área de toque mínima de 48px.
  - **Teclado:** Foco visível via `:focus-visible` com acionamento nativo por `Enter` e `Space`.
- **Transição Editorial:** Ao acionar a abertura, a capa executa uma rotação 3D suave de 350ms em torno do eixo esquerdo (`rotateY(-25deg)`), inspirada no folheamento da primeira página, e conduz a visualização suavemente para o início do volume.

### 2.2 Sem Bloqueio de Rolagem (Scroll Bypass)
- A capa não impede a rolagem vertical do navegador. Caso o visitante prefira não clicar no botão, ele pode simplesmente rolar a página para baixo com o scroll do mouse ou gesto touch. O conteúdo completo da Home (`#cover`, `#index-section`, `#projects`, etc.) já está carregado e acessível imediatamente no DOM.

### 2.3 Atalhos Diretos com Fallback Resiliente (No-JS / Teclado)
- A capa oferece links diretos para seções críticas:
  - `[ SALTAR PARA SUMÁRIO &darr; ]` (`#index-section`)
  - `[ IR DIRETO AOS PROJETOS &rarr; ]` (`#projects`)
- Todos os atalhos são tags `<a>` nativas com âncoras HTML reais. Caso o JavaScript falhe ou esteja desativado, o navegador navega diretamente para os capítulos sem quebra.

### 2.4 Memória de Sessão (Session State)
- Uma vez aberta a capa na sessão corrente, o estado é registrado em `sessionStorage` via [`ReaderStateService`](file:///C:/Users/erick.alves/Documents/GitHub/erickg.dev/src/app/core/state/reader-state.service.ts).
- Se o visitante recarregar a página (F5) ou voltar de um link externo, a capa não é reexibida, mantendo o usuário diretamente na leitura contínua.

### 2.5 Respeito Estrito a `prefers-reduced-motion`
- Usuários com preferências de movimento reduzido no sistema operacional não recebem animação 3D ou rotações de perspectiva. A transição ocorre como um fade instantâneo de opacidade sem efeitos vestibulares desconfortáveis.

### 2.6 Áudio Estritamente Desativado por Padrão
- Nenhuma trilha de áudio ou efeito sonoro é disparado na abertura da capa, respeitando integralmente as diretrizes de navegação profissional e políticas de autoplay dos navegadores.

---

## 3. Matriz de Casos Alternativos e Resiliência

| Cenário de Acesso | Comportamento Implementado |
| :--- | :--- |
| **Visitante acessa a raiz (`/`) pela primeira vez** | Exibe a capa editorial com lombada tátil, cinta promocional (obi) e botão `Abrir Portfólio`. |
| **Visitante clica em `Abrir Portfólio`** | Transição de 350ms folheando a capa, marca sessão como aberta e rola suavemente para o Hero. |
| **Visitante usa navegação por teclado (`Tab` + `Enter`)** | Foco evidente na capa; aciona abertura com `Enter` ou `Space` com suporte nativo a `aria-label`. |
| **Visitante rola a página sem clicar** | A rolagem nativa funciona livremente; os capítulos se revelam sem bloqueios na ordem editorial. |
| **Visitante acessa URL com âncora (ex: `/#projects`)** | [`ReaderStateService`](file:///C:/Users/erick.alves/Documents/GitHub/erickg.dev/src/app/core/state/reader-state.service.ts) detecta o hash e abre a capa automaticamente, exibindo a seção solicitada. |
| **Visitante acessa rota direta (ex: `/about`, `/projects`)** | A capa da Home não interfere nas rotas independentes do Angular Router. |
| **Falha de JavaScript (No-JS / Erro de Script)** | As âncoras HTML nativas funcionam sem depender de eventos do Angular, garantindo 100% de acesso ao conteúdo. |
| **`prefers-reduced-motion: reduce` ativo** | As rotações 3D e efeitos de balanço de seta são completamente suprimidos. |
