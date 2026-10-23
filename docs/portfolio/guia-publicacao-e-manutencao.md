# Guia de Publicação, Deploy e Manutenção Contínua

> **Projeto:** Portfólio Erick Gabriel (`erickg.dev`)  
> **Fase:** PROMPT 22 — Preparação para Publicação e Manutenção  
> **Status:** Pronto para Produção (Vercel / Cloudflare Pages / Netlify)  

---

## 1. Comandos de Build e Execução

### 1.1 Pré-requisitos
- **Node.js:** Versão 20.x ou 22.x LTS.
- **Gerenciador de Pacotes:** `npm` versão 10 ou superior.

### 1.2 Instalação e Testes
```bash
# Instalação limpa de dependências
npm ci

# Execução da suíte completa de testes unitários e de integração (Jest)
npm run test:ci
```

### 1.3 Compilação de Produção
```bash
# Gera os bundles otimizados com tree-shaking em dist/erickg-dev/browser
npm run build
```

### 1.4 Teste do Build Localmente (Simulação de Produção)
Antes de enviar os commits para a branch principal, sirva os arquivos estáticos gerados para inspecionar rotas SPA e cabeçalhos:
```bash
# Utilizando o utilitário serve
npx serve -s dist/erickg-dev/browser -p 4200
```
Acesse `http://localhost:4200` e teste a navegação direta em `/case-studies/1`, `/projects`, `/about` e rotas inexistentes como `/rota-aleatoria` (deve renderizar a página 404).

---

## 2. Variáveis de Ambiente e Declaração de Segredos

> [!NOTE]  
> **Declaração Explícita de Ausência de Segredos:**  
> O portfólio `erickg.dev` é uma Single Page Application estática e desacoplada. **Não requer chaves secretas de API, tokens de banco de dados ou credenciais privadas em tempo de build ou execução.**

As configurações públicas de ambiente estão centralizadas em:
- `src/environments/environment.ts` (desenvolvimento local)
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
  defaultDescription: 'Portfólio editorial em formato de mangá digital de Erick Gabriel...'
};
```

---

## 3. Configuração de Cache e Cabeçalhos de Segurança (`vercel.json`)

O arquivo `vercel.json` na raiz do projeto está pré-configurado com regras de roteamento e políticas de cache de alto desempenho:

1. **SPA Rewrites:** Todas as rotas `/(.*)` são redirecionadas para `/index.html`, permitindo deep linking nativo.
2. **Assets Imutáveis:** Chunks de scripts, folhas de estilo e imagens (`/assets/(.*)`) possuem `Cache-Control: public, max-age=31536000, immutable`.
3. **HTML Revalidado:** O `index.html` utiliza `Cache-Control: public, max-age=0, must-revalidate`, garantindo que deploys de novas versões sejam consumidos imediatamente pelos usuários.
4. **Segurança:** Cabeçalhos `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY` e `Referrer-Policy: strict-origin-when-cross-origin` ativados globalmente.

---

## 4. Procedimentos de Manutenção e Atualização de Conteúdo

Todos os dados textuais e estruturais estão desacoplados dos componentes de interface, localizados em arquivos canônicos do diretório `src/app/core/data/`:

### 4.1 Adicionar ou Modificar Projetos
1. Edite `src/app/core/data/portfolio.data.ts`.
2. Adicione ou atualize o objeto na constante `FEATURED_PROJECTS_DATA`:
   - `id`: Identificador numérico único (ex: `'5'`).
   - `title`: Nome do projeto.
   - `techStack`: Array com as tecnologias comprovadas.
   - `demoUrl` / `githubUrl`: Links reais e verificados.
   - `illustration`: Caminho do asset vetorial SVG em `src/assets/images/projects/`.

### 4.2 Adicionar ou Atualizar Estudos de Caso
1. Edite `src/app/core/data/case-studies.data.ts`.
2. Adicione um novo objeto `CaseStudy` implementando obrigatoriamente os 9 tópicos:
   - `context`, `problem`, `constraints`, `alternativesConsidered`, `architectureDecisions`, `implementation`, `testingAndValidation`, `provenResults`, `learningsAndNextSteps`.
3. Atualize o `public/sitemap.xml` para incluir a nova rota `/case-studies/:id`.

### 4.3 Inserir Novas Field Notes (Caderno de Campo)
1. Edite `src/app/core/data/field-notes.data.ts`.
2. Adicione o registro à lista `FIELD_NOTES_DETAILS` com a análise técnica e o bloco de código representativo.

---

## 5. Plano de Contingência: Leitor Imersivo de Mangá

Caso algum navegador muito antigo, extensão agressiva ou motor WebKit legado apresente incompatibilidade com animações de virada de página em 3D:

1. **Fallback Automático para Modo Editorial:**
   - O `ReaderStateService` mantém o modo editorial nativo (`readingMode: 'editorial'`) por padrão em telas estreitas (< 768px).
   - O usuário pode a qualquer momento clicar no botão de alternância no topo para retornar à rolagem editorial padrão.
2. **Desativação Forçada Emergencial (se necessário):**
   - Caso se deseje desativar globalmente o modo imersivo via código, basta alterar o retorno inicial de `isMangaReaderMode` em `src/app/core/state/reader-state.service.ts` para retornar sempre `false`. O site continuará 100% funcional, acessível e semanticamente completo através do modo editorial de rolagem contínua.

---

## 6. Checklist de Verificação Pré-Publicação

Antes de realizar a tag de versão e o deploy em produção, certifique-se de que cada item abaixo foi executado com sucesso:

- [x] **Suíte de Testes:** Executado `npm run test:ci` com 100% de sucesso (todas as suítes passando sem erros).
- [x] **Build sem avisos:** Executado `npm run build` gerando bundle limpo na pasta `dist/`.
- [x] **Imagens e Assets:** Todas as imagens apontam para arquivos SVG autorais locais em `/assets/images/`, sem referências a URLs externas instáveis.
- [x] **Página 404:** Rota coringa `**` configurada e direcionando para `NotFoundComponent` com meta `noindex, nofollow`.
- [x] **Sitemap & Robots:** Arquivos `public/robots.txt` e `public/sitemap.xml` atualizados e apontando para `https://erickg.dev`.
- [x] **Metadados Canônicos:** Preload da capa do Hero e links canônicos injetados no `<head>`.
- [x] **Contraste WCAG 2.1 AA:** Nanquim sobre papel com contraste mínimo de 6.3:1 e 16:1 em conformidade com acessibilidade.
- [x] **Links de Redes:** Perfis de GitHub (`ErickG123`) e LinkedIn validados com `target="_blank"` e `rel="noopener noreferrer"`.
