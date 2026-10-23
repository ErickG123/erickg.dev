# Inventário de Assets e Estratégia de Mídia — erickg.dev

> **Status:** Ativo / Controle de Governança de Mídia  
> **Versão:** 1.0.0  
> **Responsável:** Engenharia de Software  
> **Objetivo:** Estabelecer a governança de assets visuais, auditoria de licenças, critérios de otimização, regras de nomenclatura e mecanismo de resiliência/fallback para o portfólio no estilo mangá editorial.

---

## 1. Auditoria dos Assets Existentes no Repositório

| Arquivo / Asset | Tipo | Tamanho | Origem / Autoria | Licença Declarada | Status de Aprovação | Utilização no Código |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `public/favicon.ico` | Ícone | 15.0 kB | Autoral / Erick Gabriel | MIT / Autoral | **Aprovado para Produção** | `index.html` (ícone da aba) |
| `public/manifest.webmanifest` | JSON | 1.3 kB | Configuração PWA | MIT / Autoral | **Aprovado para Produção** | Manifesto PWA |
| `public/icons/icon-72x72.png` até `icon-512x512.png` (8 tamanhos) | Imagens PNG | ~45 kB (total) | Gerado para PWA do projeto | MIT / Autoral | **Aprovado para Produção** | Ícones de instalação PWA |
| `src/assets/images/cover/hero-manga-cover.svg` | Vetor SVG | ~6.8 kB | Autoral / Erick Gabriel | MIT / Autoral | **Aprovado para Produção** | `manga-hero.component.ts` (Capa/Hero) |
| `src/assets/images/social/og-image.svg` | Vetor SVG | ~4.0 kB | Autoral / Erick Gabriel | MIT / Autoral | **Aprovado para Produção** | `app.ts` (Banner Open Graph 1200x630) |
| `src/assets/images/profile/author-portrait-nanquim.svg` | Vetor SVG | ~4.8 kB | Autoral / Erick Gabriel | MIT / Autoral | **Aprovado para Produção** | `home.component.html` (Ficha do Autor) |
| `src/assets/images/projects/project-architect-forge.svg` | Vetor SVG | ~3.9 kB | Autoral / Erick Gabriel | MIT / Autoral | **Aprovado para Produção** | `manga-project-card` (Projeto 1) |
| `src/assets/images/projects/project-cyber-sleuth.svg` | Vetor SVG | ~4.2 kB | Autoral / Erick Gabriel | MIT / Autoral | **Aprovado para Produção** | `manga-project-card` (Projeto 2) |
| `src/assets/images/projects/project-network-guardian.svg` | Vetor SVG | ~4.5 kB | Autoral / Erick Gabriel | MIT / Autoral | **Aprovado para Produção** | `manga-project-card` (Projeto 3) |
| `src/assets/images/projects/project-otaku-courier.svg` | Vetor SVG | ~4.6 kB | Autoral / Erick Gabriel | MIT / Autoral | **Aprovado para Produção** | `manga-project-card` (Projeto 4) |
| `src/assets/bgm.mp3` | Áudio MP3 | 3.38 MB | Trilha chiptune retro (desconhecida) | *Pendente de Verificação* | **Pendente de Resolução** (Não liberar comercialmente sem comprovação de autoria/licença) | `audio.service.ts` (BGM opcional) |
| `src/assets/i18n/*.json` | Dados JSON | 2.2 kB | Conteúdo traduzido por Erick Gabriel | MIT / Autoral | **Aprovado para Produção** | `@ngx-translate` (EN/PT) |
| `src/assets/logs/history.md` | Markdown | 1.0 kB | Conteúdo biográfico de Erick Gabriel | MIT / Autoral | **Aprovado para Produção** | `ngx-markdown` em `LogComponent` |
| Google Fonts (Anton, Inter, Inter Tight, IBM Plex Mono) | Web Fonts | N/A (CDN) | Google Fonts / Designers Oficiais | SIL Open Font License 1.1 | **Aprovado para Produção** | `index.html`, `styles.scss` |

---

## 2. Estrutura Canônica de Diretórios de Assets

Para garantir que assets de desenvolvimento não sejam empacotados inadvertidamente para produção e que haja rastreabilidade de cada arquivo, a seguinte estrutura deve ser seguida:

```text
src/assets/
├── audio/                      # Efeitos sonoros e trilhas (opt-in)
│   └── sfx/                    # Cliques de virada de página e beeps
├── i18n/                       # Dicionários de localização (pt.json, en.json)
├── images/                     # Acervo visual oficial do portfólio
│   ├── cover/                  # Capas de volume e frontispícios editoriais
│   ├── profile/                # Fotografias e retratos autorais de Erick Gabriel
│   ├── projects/               # Previews e capturas dos 4 projetos oficiais
│   ├── case-studies/           # Diagramas técnicos e fluxogramas
│   ├── social/                 # Banners Open Graph e Twitter Cards (1200x630)
│   └── reference/              # [USO EXCLUSIVO EM DEV] Rascunhos, storyboards (IGNORADO EM PROD)
├── logs/                       # Histórico de carreira e Field Notes em Markdown
└── textures/                   # SVGs e texturas de suporte vetorial
```

> [!IMPORTANT]
> A pasta `src/assets/images/reference/` destina-se exclusivamente a wireframes, capturas de referência e mockups temporários. Nenhum arquivo dessa pasta pode ser referenciado em código que vá para a branch `master` ou deploy de produção.

---

## 3. Modelo de Metadados de Assets (Manifesto de Governança)

Toda imagem ou recurso multimídia incorporado ao projeto deve possuir uma ficha técnica registrada segundo o modelo abaixo:

```yaml
id: "proj-architect-forge-preview"
arquivo: "src/assets/images/projects/project-architect-forge-16x9.webp"
finalidade: "Preview do projeto ng-architect-cli no Capítulo 02"
categoria: "projects" # cover | profile | projects | case-studies | social | reference
proporcao: "16:9"
dimensoes: "1280x720"
formato: "webp"
tamanho_bytes: 84500 # < 120 kB
autoria: "Erick Gabriel"
origem: "Captura de tela autoral da CLI com estilização em nanquim"
licenca: "MIT / Copyright Erick Gabriel"
atribuicao_necessaria: false
status: "approved" # approved | pending | dev-only
data_inclusao: "2026-10-23"
```

---

## 4. Diretrizes de Licenciamento e Propriedade Intelectual

1. **Ilustrações e Desenhos Autorais:**
   - Todas as ilustrações criadas para o portfólio (capas, retratos, mascotes, onomatopeias, banners) devem ser obras originais ou geradas a partir de vetores de domínio público devidamente creditados.
2. **Proibição de Imagens de Terceiros sem Licença:**
   - **É estritamente vedado** utilizar imagens localizadas em motores de busca (Google Images, Pinterest, etc.) sem comprovação explícita de licença de uso permissiva (CC0, CC-BY com atribuição, ou licença de banco sob termos comerciais válidos).
   - **É estritamente vedado** utilizar personagens, capturas de tela ou painéis de mangás comerciais protegidos por direitos autorais (ex: Shueisha, Kodansha, etc.).
3. **Imagens de Bancos Livres (Unsplash, Pexels, Freepik, Wikimedia):**
   - Caso seja utilizada fotografia ou vetor de repositórios abertos, a ficha técnica deve conter o link original, o nome do criador e o texto de atribuição exigido pela licença, salvo quando sob domínio público (CC0).
4. **Resolução de Informações Pendentes:**
   - Qualquer asset com autoria ou licença marcada como `pending` não pode ser promovido para produção. No caso do áudio `bgm.mp3`, caso a licença não seja validada, o asset deve ser substituído por uma composição chiptune autoral ou sob licença CC0 / MIT.

---

## 5. Regras de Nomenclatura, Dimensões e Otimização

### 5.1 Convenção de Nomenclatura
- Padrão **kebab-case** obrigatório, sem acentos, sem espaços e com identificação semântica:
  - Formato: `[tipo]-[nome-do-recurso]-[proporcao].[extensao]`
  - Exemplos:
    - `cover-vol01-edition-2x3.webp`
    - `profile-erick-nanquim-1x1.webp`
    - `project-forensic-sleuth-16x9.webp`
    - `case-interceptor-flow-16x9.svg`
    - `og-manga-chronicles-1200x630.webp`

### 5.2 Proporções e Dimensões Canônicas
| Aplicação | Proporção | Dimensões Recomendadas | Formatos Aceitos | Teto de Peso |
| :--- | :--- | :--- | :--- | :--- |
| **Capa de Volume / Hero** | `2:3` ou `3:4` | `800x1200` / `900x1200` | WebP, AVIF, SVG | < 250 kB |
| **Retrato / Ficha de Personagem** | `1:1` | `500x500` / `800x800` | WebP, SVG, PNG | < 100 kB |
| **Cards de Projetos** | `16:9` | `1280x720` / `960x540` | WebP, AVIF | < 120 kB |
| **Diagramas Técnicos** | `16:9` ou livre | Vetorial escalável | SVG (inline ou arquivo) | < 40 kB |
| **Social Share (Open Graph)** | `1.91:1` | `1200x630` | WebP, JPEG | < 200 kB |
| **Ícones / Glifos** | `1:1` | `24x24`, `32x32`, `48x48` | SVG | < 10 kB |

### 5.3 Otimização e Retículas
- **Retículas e Halftones:** Devem ser implementadas **exclusivamente via CSS matemático** (`radial-gradient`), dispensando imagens bitmap repetitivas.
- **Compressão de Imagens:** Todas as imagens bitmap devem ser comprimidas com WebP/AVIF em qualidade balanceada (80–85%), garantindo fidelidade de traço P&B sem artefatos visíveis.

---

## 6. Mecanismo de Fallback e Resiliência (Imagens Ausentes)

Para evitar quebras visuais decorrentes de falhas de rede, bloqueadores de conteúdo ou assets em produção, a aplicação adota uma estratégia de defesa em dois níveis:

1. **Diretiva Angular `appImageFallback`:**
   - Intercepta o evento `(error)` de qualquer tag `<img>`.
   - Substitui imediatamente a imagem com falha por um canvas vetorial SVG inline estilizado em nanquim e retícula com a mensagem: `[ PAINEL EM PROCESSO DE ENTINTAMENTO ]`.
2. **Componente `MangaImageComponent`:**
   - Encapsula o estado de carregamento (*skeleton* em screentone animado) e o estado de erro, oferecendo uma moldura de quadrinho resiliente.

---

## 7. Inventário Detalhado dos Assets Aprovados e Planejados

```text
[Aprovado]  public/favicon.ico
            - Finalidade: Ícone de aba do navegador
            - Licença: MIT / Autoral Erick Gabriel
            - Status: Pronto

[Aprovado]  public/icons/icon-*.png
            - Finalidade: Conjunto de 8 ícones PWA
            - Licença: MIT / Autoral Erick Gabriel
            - Status: Pronto

[Aprovado]  src/assets/images/social/og-image.svg
            - Finalidade: Imagem de compartilhamento social (1200x630)
            - Autoria: Erick Gabriel
            - Licença: MIT / Autoral
            - Status: Gerado e ativo (corrige o link quebrado anterior)

[Planejado] src/assets/images/projects/project-architect-forge-16x9.webp
            - Finalidade: Card do projeto ng-architect-cli
            - Autoria: Erick Gabriel (captura autoral tratada em nanquim)
            - Licença: MIT
            - Status: Aprovado para inclusão

[Planejado] src/assets/images/projects/project-cyber-sleuth-16x9.webp
            - Finalidade: Card do projeto devkit_forense
            - Autoria: Erick Gabriel (captura autoral tratada em nanquim)
            - Licença: MIT
            - Status: Aprovado para inclusão

[Planejado] src/assets/images/projects/project-network-guardian-16x9.webp
            - Finalidade: Card do projeto ngx-smart-interceptor
            - Autoria: Erick Gabriel
            - Licença: MIT
            - Status: Aprovado para inclusão

[Planejado] src/assets/images/projects/project-otaku-courier-16x9.webp
            - Finalidade: Card do projeto anime-newsletter
            - Autoria: Erick Gabriel
            - Licença: MIT
            - Status: Aprovado para inclusão

[Pendente]  src/assets/bgm.mp3
            - Finalidade: Trilha de fundo retro (3.38 MB)
            - Autoria: Não documentada no repositório original
            - Licença: Desconhecida / Pendente de verificação
            - Ação mandatória: Manter como opt-in; buscar substituição por composição chiptune CC0/autoral
```
