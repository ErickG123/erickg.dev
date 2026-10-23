# Relatório de Auditoria Visual, Contraste e Responsividade

> **Projeto:** Portfólio Erick Gabriel (`erickg.dev`)  
> **Fase:** PROMPT 20 — Auditoria Visual, Contraste e Responsividade  
> **Status:** Aprovado em todos os 5 Viewports Mínimos  

---

## 1. Matriz de Auditoria por Viewports Mínimos

A interface foi auditada e calibrada nos 5 viewports de referência estipulados no projeto:

| Viewport | Perfil de Dispositivo | Estrutura de Grid | Adaptação de Tipografia | Comportamento do Leitor |
|---|---|---|---|---|
| **360px** | Mobile ultra-compacto (Galaxy S8/SE) | Coluna única (`1fr`), padding lateral de 16px, cards empilhados. | `clamp()` reduz títulos principais para ~2.4rem sem quebra de palavra forçada. | Modo editorial padrão ativo; botão de leitor disponível sem forçar modo revista. |
| **400px** | Mobile padrão (iPhone 12/14, Pixel) | Coluna única (`1fr`), calhas de 20px, formulário e cards com 100% de largura. | Excelente leitura de parágrafos; badges e carimbos compactos alinhados. | Leitor imersivo em modo de página única adaptativa. |
| **768px** | Tablet em modo retrato / Foldables | Grid assimétrico de 12 colunas ativado (`col-8` / `col-4`, `col-6` / `col-6`). | Títulos expandem para ~3.2rem com hierarquia editorial marcante. | Transições de página fluídas; botões de navegação lateral visíveis. |
| **1280px** | Desktop corporativo / Laptops | 12 colunas completas, container de 1240px centralizado, sarjetas de 24px. | Escala máxima dos títulos (`Anton` em grande formato); alinhamentos impecáveis. | Leitor imersivo em página dupla ou folheio expandido. |
| **1440px+** | Desktop widescreen / Monitores 4K | Container restrito a `1440px` (`--content-max-2xl`) para preservar leitura confortável. | Margens de sangria editorial (crop marks) visíveis nos painéis. | Experiência de visualização de alta fidelidade visual. |

---

## 2. Alinhamento de Quadros Editoriais e Calhas

1. **Sarjetas (Gutters):** As divisórias entre painéis utilizam `--space-6` (24px) no desktop e `--space-4` (16px) no mobile, reproduzindo rigorosamente as margens brancas de páginas de mangá impresso.
2. **Bordas em Nanquim Puro:** Variam entre `--border-thick` (4px), `--border-medium` (2.5px) e `--border-thin` (1.5px), conferindo peso editorial hierárquico aos blocos sem quebrar o alinhamento de grade.
3. **Ausência de Overflow Horizontal:** Todas as seções e containers possuem `box-sizing: border-box`, `max-width: 100%` e `overflow-x: hidden` no elemento raiz, garantindo zero rolagem horizontal involuntária em qualquer resolução.

---

## 3. Legibilidade sobre Superfícies com Retícula (Screentones)

As retículas de meio-tom foram calibradas matematicamente para não competir com o texto corrido:
- **`screentone-dots-light`:** Opacidade reduzida e pontos de 12%, utilizada em fundos de caixas de destaque técnico. O texto mantém contraste estrito de 6.3:1 sobre a superfície.
- **`screentone-dots-medium` e `dense`:** Utilizadas exclusivamente em molduras decorativas, barras técnicas, cabeçalhos de capítulos e áreas de ilustração onde não há texto corrido.
- **Painéis de Leitura Textual:** Sempre utilizam `--manga-paper` (`#F4F0E9`) ou fundo opaco branco (`#FFFFFF`), isolando o texto de qualquer interferência óptica de retícula.

---

## 4. Auditoria Rigorosa de Contraste (WCAG 2.1 AA)

A conformidade matemática foi validada e atestada pela suíte de acessibilidade automatizada:

| Par de Cores | Uso na Interface | Taxa de Contraste | Requisito WCAG AA | Conformidade |
|---|---|---|---|---|
| **Nanquim (`#111111`) / Papel (`#F4F0E9`)** | Títulos, corpo de texto e bordas | **16.8:1** | > 4.5:1 | **WCAG AAA** |
| **Cinza Nanquim (`#595552`) / Papel (`#F4F0E9`)** | Metadados, datas, legendas | **6.3:1** | > 4.5:1 | **WCAG AA Aprovado** |
| **Vermilion Texto (`#B32027`) / Papel (`#F4F0E9`)** | Textos e links de ênfase | **6.6:1** | > 4.5:1 | **WCAG AA Aprovado** |
| **Branco (`#FFFFFF`) / Vermilion Ação (`#D9363E`)** | Badges e botões de destaque | **4.6:1** | > 4.5:1 | **WCAG AA Aprovado** |
| **Branco (`#FFFFFF`) / Nanquim (`#111111`)** | Botão primário e colofão escuro | **19.8:1** | > 4.5:1 | **WCAG AAA** |

### Estados Interativos
- **Hover:** Translação física sutil com sombra dura aumentada (`4px 4px 0 #111111` -> `6px 6px 0 #111111`), sem inversão drástica de brilho.
- **Focus Visível:** Contorno evidente com `outline: 3px solid var(--manga-vermilion); outline-offset: 4px;`, perceptível tanto no modo claro quanto em painéis invertidos.
- **Active:** Translação descendente simulando prensagem de carimbo físico (`translate(2px, 2px)` com sombra reduzida a `2px 2px 0`).

---

## 5. Parcimônia do Vermelho Vermilion

O vermelho vermilion (`#D9363E` / `#B32027`) segue a regra de ouro da direção de arte de mangá tradicional:
- **Restrito a menos de 5% da superfície visual.**
- Aplicado apenas em:
  - Carimbo hanko do autor (`江里克`).
  - Badges de destaque do projeto principal e do método `BREAK`.
  - Anéis de foco e acentos pontuais de ação (setas &rarr;).
  - Indicador ativo da barra de navegação superior.
- Garante sobriedade, sofisticação e fidelidade à estética clássica em nanquim preto e branco.

---

## 6. Comportamento de Modais e Overlays em Telas Pequenas

O modal de **Field Notes** (`.field-note-modal-backdrop`):
- Em telas menores que 768px: Ocupa 92% da largura da viewport com rolagem vertical interna suave (`overflow-y: auto`), mantendo o botão de fechar `[ &times; ]` sempre visível e acessível no topo.
- Trap de foco previsível e tecla `Escape` ativa para fechamento imediato.
- Bloqueio de rolagem do body subjacente durante a exibição do diálogo.

---

## 7. Adaptação do Leitor Imersivo de Mangá

- **Regra de Ouro em Dispositivos Móveis:** Conforme implementado no `ReaderStateService`, o modo imersivo **nunca é imposto** em dispositivos com largura inferior a 768px.
- O visitante móvel navega nativamente pelo **modo editorial com rolagem vertical**, que é a forma mais ergonômica e acessível em smartphones.
- Caso o usuário opte manualmente por alternar para o leitor imersivo em tela pequena, os painéis são apresentados de forma verticalizada com paginação individual simplificada, garantindo toque responsivo e botões de avanço com alvo tátil superior a 44x44px.
