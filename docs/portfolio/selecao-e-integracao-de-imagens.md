# Pesquisa, Seleção e Integração de Imagens — erickg.dev

> **Status:** Aprovado &bull; **Data:** 23/10/2026 &bull; **Versão:** 1.0  
> **Volume:** 01 — *Tales of an Engineer* &bull; **Autor:** Erick Gabriel  
> **Governança de Propriedade Intelectual:** 100% Autoral / Licença MIT / Zero Hotlinking

---

## 1. Mapeamento dos Pontos da Interface que Demandam Imagem

Uma das principais diretrizes de engenharia do projeto é **não sobrecarregar a interface com imagens decorativas desnecessárias**. Cada elemento visual integrado possui uma função narrativa, técnica ou de identificação clara:

```
                            ┌─────────────────────────────────┐
                            │    PONTOS CRÍTICOS DE IMAGEM    │
                            └────────────────┬────────────────┘
                                             │
      ┌──────────────────────┬───────────────┴───────────────┬──────────────────────┐
      ▼                      ▼                               ▼                      ▼
┌──────────────┐      ┌──────────────┐                ┌──────────────┐      ┌──────────────┐
│  Ponto 1:    │      │  Ponto 2:    │                │  Ponto 3:    │      │  Ponto 4:    │
│  Hero/Capa   │      │ Obras (Prjs) │                │ Ficha Autor  │      │ Social/SEO   │
│  (Capítulo 0)│      │ (Capítulo 2) │                │ (Capítulo 5) │      │ (OpenGraph)  │
└──────────────┘      └──────────────┘                └──────────────┘      └──────────────┘
```

1. **Ponto 1: Hero & Frontispício Editorial (Capítulo 00):**
   - *Finalidade:* Definir a identidade imersiva do mangá logo no primeiro viewport e ambientar o leitor no universo editorial de Erick Gabriel.
   - *Asset Atribuído:* [`src/assets/images/cover/hero-manga-cover.svg`](file:///C:/Users/erick.alves/Documents/GitHub/erickg.dev/src/assets/images/cover/hero-manga-cover.svg)
2. **Ponto 2: Obras Selecionadas (Capítulo 02):**
   - *Finalidade:* Ilustrar os 4 projetos autorais de engenharia, transmitindo o propósito de cada software através de composições de nanquim e retícula.
   - *Assets Atribuídos:*
     - `project-architect-forge.svg` (The Architect's Forge / CLI Angular Zoneless)
     - `project-cyber-sleuth.svg` (Cyber Sleuth Toolkit / Perícia Forense)
     - `project-network-guardian.svg` (Network Guardian Node / Resiliência HTTP)
     - `project-otaku-courier.svg` (Otaku Courier Network / Curadoria Editorial)
3. **Ponto 3: Ciclo Contínuo de Engenharia (Capítulo 03):**
   - *Finalidade:* Esquematizar o método *Think, Break, Rebuild* em um fluxograma editorial claro.
   - *Asset Atribuído:* [`src/assets/images/case-studies/method-think-break-rebuild.svg`](file:///C:/Users/erick.alves/Documents/GitHub/erickg.dev/src/assets/images/case-studies/method-think-break-rebuild.svg)
4. **Ponto 4: Retrato do Autor (Capítulo 05):**
   - *Finalidade:* Apresentar a figura de Erick Gabriel no estilo mangá contemporâneo maduro (*seinen* urbano), associando sua biografia ao arquétipo do engenheiro compenetrado.
   - *Asset Atribuído:* [`src/assets/images/profile/author-portrait-nanquim.svg`](file:///C:/Users/erick.alves/Documents/GitHub/erickg.dev/src/assets/images/profile/author-portrait-nanquim.svg)
5. **Ponto 5: Banners de Compartilhamento Social & Metadados (SEO / Open Graph):**
   - *Finalidade:* Garantir visualização impactante e profissional ao compartilhar URLs do portfólio no LinkedIn, GitHub, Twitter e Discord.
   - *Asset Atribuído:* [`src/assets/images/social/og-image.svg`](file:///C:/Users/erick.alves/Documents/GitHub/erickg.dev/src/assets/images/social/og-image.svg)

---

## 2. Inventário Consolidado e Matriz de Licenciamento

Todos os assets visuais selecionados para produção foram verificados sob critérios rígidos de conformidade legal:

| ID do Asset | Caminho no Repositório | Dimensões | Formato | Autoria | Origem | Licença | Status |
| :--- | :--- | :---: | :---: | :--- | :--- | :--- | :---: |
| `hero-cover-v1` | `src/assets/images/cover/hero-manga-cover.svg` | 800x450 | SVG | Erick Gabriel | Desenho vetorial autoral em nanquim | MIT / Autoral | **Aprovado** |
| `og-social-v1` | `src/assets/images/social/og-image.svg` | 1200x630 | SVG | Erick Gabriel | Banner autoral para redes sociais | MIT / Autoral | **Aprovado** |
| `profile-author`| `src/assets/images/profile/author-portrait-nanquim.svg` | 400x400 | SVG | Erick Gabriel | Retrato autoral do engenheiro | MIT / Autoral | **Aprovado** |
| `prj-forge` | `src/assets/images/projects/project-architect-forge.svg` | 800x450 | SVG | Erick Gabriel | Ilustração técnica de The Architect's Forge | MIT / Autoral | **Aprovado** |
| `prj-sleuth` | `src/assets/images/projects/project-cyber-sleuth.svg` | 800x450 | SVG | Erick Gabriel | Ilustração técnica de Cyber Sleuth Toolkit | MIT / Autoral | **Aprovado** |
| `prj-guardian`| `src/assets/images/projects/project-network-guardian.svg` | 800x450 | SVG | Erick Gabriel | Ilustração técnica de Network Guardian Node | MIT / Autoral | **Aprovado** |
| `prj-courier` | `src/assets/images/projects/project-otaku-courier.svg` | 800x450 | SVG | Erick Gabriel | Ilustração técnica de Otaku Courier Network | MIT / Autoral | **Aprovado** |
| `method-flow` | `src/assets/images/case-studies/method-think-break-rebuild.svg` | 800x400 | SVG | Erick Gabriel | Diagrama editorial do método de trabalho | MIT / Autoral | **Aprovado** |
| `audio-bgm` | `src/assets/bgm.mp3` | 3.38 MB | MP3 | Desconhecida | Arquivo chiptune herdado no repositório | Pendente | **Pendente** |

> [!IMPORTANT]
> **Status de Áudio e Mídias de Terceiros:**  
> O arquivo `src/assets/bgm.mp3` permanece categorizado como **Pendente de Verificação**. Conforme estipulado nos requisitos de auditoria, ele **não toca automaticamente** e não bloqueia nenhuma funcionalidade do portfólio. Nenhuma imagem raspada de buscadores ou retirada de mangás protegidos por copyright foi incluída.

---

## 3. Estratégia de Fallbacks e Resiliência Técnica

O portfólio não depende criticamente de conexões externas nem quebra sua diagramação em caso de erro no carregamento de qualquer imagem:

### 3.1. Tratamento no Componente [`MangaImageComponent`](file:///C:/Users/erick.alves/Documents/GitHub/erickg.dev/src/app/shared/components/manga-image/manga-image.component.ts)
- **Estado de Carregamento (`isLoading`):** Exibe um esqueleto animado com retícula média (`.screentone-dots-medium`) e o aviso textual *"ENTINTANDO PAINEL..."*.
- **Estado de Erro (`onError`):** Substitui a imagem quebrada por uma moldura editorial com retícula suave e o aviso *"PAINEL EM RESTAURAÇÃO"*, preservando a proporção de aspecto (`aspectRatio`) definida para não causar Content Layout Shift (CLS).

### 3.2. Fallback no Componente [`MangaProjectCardComponent`](file:///C:/Users/erick.alves/Documents/GitHub/erickg.dev/src/app/shared/components/manga-project-card/manga-project-card.component.ts)
- Se a propriedade `image` de um projeto for omitida ou for nula, o card automaticamente renderiza uma caixa de carimbo gráfico em nanquim (`.comic-stamp-box`) com as 3 primeiras letras do título sobre uma retícula pontilhada.

### 3.3. Fallback no Retrato do Autor ([`HomeComponent`](file:///C:/Users/erick.alves/Documents/GitHub/erickg.dev/src/app/features/home/home.component.ts))
- Se `author.avatarUrl` for omitido, a moldura exibe a retícula densa clássica com o carimbo Hanko autoral central *"江里克 // AUTHOR"*.

---

## 4. Política Anti-Hotlinking e Otimização de Performance

1. **Zero Hotlinking:** Nenhum arquivo visual depende de servidores externos (como Imgur, ImgBB, Unsplash ou CDNs de terceiros). Todos os assets são armazenados localmente no repositório e distribuídos pela Edge Network da Vercel.
2. **Formato Vetorial Autoral:** Todos os novos assets são SVGs matemáticos otimizados. Isso assegura:
   - Resolução infinita (perfeita em telas Retina, 4K e dispositivos móveis).
   - Peso irrisório de tráfego de rede (acervo visual total com menos de 30 kB transferidos).
   - Cache permanente via Service Worker PWA configurado.
3. **Desacoplamento de Componentes:** Todas as referências a caminhos de imagem estão isoladas em [`portfolio.data.ts`](file:///C:/Users/erick.alves/Documents/GitHub/erickg.dev/src/app/core/data/portfolio.data.ts), permitindo a substituição de qualquer asset no futuro sem tocar no código TypeScript ou HTML dos componentes.
