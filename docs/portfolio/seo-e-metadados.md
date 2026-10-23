# Documentação Técnica: SEO, Metadados e Compartilhamento Social

> **Projeto:** Portfólio Erick Gabriel (`erickg.dev`)  
> **Fase:** PROMPT 17 — SEO, Metadados e Compartilhamento  
> **Status:** Concluído & Integrado  

---

## 1. Visão Geral da Arquitetura de SEO

A estratégia de SEO e indexação do portfólio combina **metadados estáticos de alto desempenho** no `index.html` (para renderização inicial instantânea por crawlers e bots sociais) com um serviço dinâmico e reativo em Angular (`SeoService`), responsável por atualizar títulos, descrições, tags Open Graph, cartões do Twitter e links canônicos durante a navegação por rotas do SPA.

```
                    ┌────────────────────────┐
                    │    src/index.html      │ (Metadados estáticos padrão & Preload LCP)
                    └───────────┬────────────┘
                                │
                    ┌───────────▼────────────┐
                    │  src/environments/     │ (Configuração de URL, Título e Imagem OG)
                    └───────────┬────────────┘
                                │
                    ┌───────────▼────────────┐
                    │  src/app/core/         │
                    │    seo.service.ts      │ (Gestão dinâmica de Title, Meta e Canonical)
                    └───────┬──────────┬─────┘
                            │          │
    ┌───────────────────────▼──┐    ┌──▼────────────────────────┐
    │ CaseStudyDetailComponent │    │    NotFoundComponent      │
    │ (Metadados de Artigo &   │    │ (404, Noindex, Nofollow & │
    │  URL Canônica do Estudo) │    │  Navegação de Retorno)    │
    └──────────────────────────┘    └───────────────────────────┘
```

---

## 2. Metadados Globais e Configuração por Ambiente

Para eliminar URLs hardcoded ou domínios fictícios, os metadados são centralizados nos arquivos de ambiente:

- `src/environments/environment.ts` (desenvolvimento)
- `src/environments/environment.prod.ts` (produção)

```typescript
export const environment = {
  production: true,
  siteUrl: 'https://erickg.dev',
  siteName: 'Erick Gabriel // Software Engineer Portfolio',
  author: 'Erick Gabriel',
  defaultLocale: 'pt-BR',
  themeColor: '#111111',
  ogImage: '/assets/images/social/og-image.svg',
  defaultDescription: 'Portfólio editorial em formato de mangá digital de Erick Gabriel. Engenharia de software, sistemas reativos em Angular, arquitetura limpa e computação forense.'
};
```

---

## 3. Imagem de Compartilhamento Autorizada (Open Graph / Twitter)

O asset `/assets/images/social/og-image.svg` foi desenhado especificamente para compartilhamento em redes sociais:
- **Resolução ideal:** 1200 x 630 pixels (proporção 1.91:1 recomendada pela especificação Open Graph e Twitter Cards).
- **Linguagem visual autoral:** Paleta de papel aquecido (`#F4F0E9`), nanquim escuro (`#111111`), painel com retícula de meio-tom (screentone) e acento em vermelho vermilion (`#D9363E`).
- **Autoria:** 100% autoral, em SVG vetorial leve e otimizado, sem violações de direitos autorais ou uso de marcas registradas externas.

---

## 4. Otimização de Performance e Preload de LCP

No cabeçalho de `src/index.html`:
1. **Preload do Hero:** O asset SVG principal da capa (`/assets/images/cover/hero-manga-cover.svg`) possui instrução `<link rel="preload" as="image" type="image/svg+xml" fetchpriority="high">` para garantir que o Largest Contentful Paint (LCP) ocorra no menor tempo possível sem layout shift (CLS).
2. **Preconnects de Fontes:** Conexões antecipadas para `https://fonts.googleapis.com` e `https://fonts.gstatic.com` com atributo `crossorigin`.
3. **Fallback Semântico `<noscript>`:** Garante que usuários ou indexadores com JavaScript desativado recebam a identificação do autor, resumo e links de contato diretos.

---

## 5. Serviço Reativo `SeoService`

O serviço `SeoService` fornece três pontos de entrada principais:

1. **`setSocialMediaTags(title, description, image, url, type, noIndex)`:**
   - Atualiza `document.title`.
   - Atualiza `description`, `author` e `robots` (`index, follow` ou `noindex, nofollow`).
   - Normaliza URLs relativas para absolutas baseadas em `environment.siteUrl`.
   - Atualiza propriedades Open Graph (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:site_name`, `og:locale`).
   - Atualiza Twitter Cards (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`).
   - Atualiza a tag `<link rel="canonical" href="...">` no `<head>` do documento.
2. **`setCaseStudyTags(study: CaseStudy)`:**
   - Constrói título editorial específico (`"${study.title} // Estudo de Caso — Erick Gabriel"`).
   - Extrai resumo conciso (máximo 160 caracteres) do contexto técnico.
   - Define o tipo Open Graph como `article`.
   - Aponta o canônico para `/case-studies/${study.id}`.
3. **`setNotFoundTags()`:**
   - Define título 404.
   - Define meta tag `robots` como `noindex, nofollow` para evitar indexação de rotas quebradas.
4. **`resetToDefault()`:**
   - Restaura as tags padrão da capa/home.

---

## 6. Tratamento de Rotas Inexistentes (Página 404)

Foi implementado o componente `NotFoundComponent` (`src/app/features/not-found/`):
- **Estrutura semântica:** Separado estritamente em `.ts`, `.html`, `.scss` e `.spec.ts`.
- **Estética Editorial de Mangá:** Apresenta um painel com retícula de fundo, tipografia de grande porte com sombra dura vermilion (`404`), texto temático ("Capítulo Não Encontrado // Manuscrito Ausente") e botões acessíveis de ação ("RETORNAR À CAPA" e "VER PROJETOS").
- **Proteção contra Indexação:** Executa automaticamente `this.seo.setNotFoundTags()` ao ser renderizado, marcando a página com `noindex, nofollow`.
- **Roteamento:** Configurado nas rotas `/404` e no wildcard `**` em `src/app/app.routes.ts`.

---

## 7. Rastreamento e Indexação (`robots.txt` e `sitemap.xml`)

Disponibilizados no diretório `public/` (copiados para a raiz do domínio no build):

### `public/robots.txt`
```txt
User-agent: *
Allow: /

Sitemap: https://erickg.dev/sitemap.xml
```

### `public/sitemap.xml`
Mapeia todas as 9 URLs canônicas existentes do portfólio, com prioridades editoriais balanceadas:
- `https://erickg.dev/` (Prioridade 1.0)
- `https://erickg.dev/about` (Prioridade 0.8)
- `https://erickg.dev/projects` (Prioridade 0.8)
- `https://erickg.dev/case-studies/1` (Prioridade 0.9)
- `https://erickg.dev/case-studies/3` (Prioridade 0.9)
- `https://erickg.dev/case-studies/2` (Prioridade 0.9)
- `https://erickg.dev/log` (Prioridade 0.7)
- `https://erickg.dev/contact` (Prioridade 0.7)
- `https://erickg.dev/design-system` (Prioridade 0.5)

---

## 8. Checklist de Valores para Pré-Publicação

Antes do deploy final em ambiente de produção, certifique-se de validar os seguintes pontos no arquivo `src/environments/environment.prod.ts` e no DNS do provedor:

| Item | Valor Atual Configurado | Ação Requerida Antes do Deploy |
|---|---|---|
| **Domínio Canônico** | `https://erickg.dev` | Confirmar apontamento do registro A / CNAME do domínio customizado |
| **Imagem OG** | `/assets/images/social/og-image.svg` | Opcional: Gerar versão PNG rasterizada 1200x630 caso crawlers legados não renderizem SVG externo |
| **Google Search Console** | Não configurado | Inserir meta tag de verificação `google-site-verification` se solicitado pela ferramenta |
| **Sitemap** | `https://erickg.dev/sitemap.xml` | Submeter a URL do sitemap no Google Search Console e Bing Webmaster Tools |
