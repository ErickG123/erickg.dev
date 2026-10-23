import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { environment } from '../../environments/environment';
import { CaseStudy } from './models/case-study.interface';

export interface SeoMetadata {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  noIndex?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private title = inject(Title);
  private meta = inject(Meta);
  private doc = inject(DOCUMENT);

  /**
   * Atualiza as meta tags sociais, canônicas e de motores de busca.
   */
  setSocialMediaTags(
    title: string,
    description: string,
    image: string = environment.ogImage,
    url: string = environment.siteUrl,
    type: 'website' | 'article' | 'profile' = 'website',
    noIndex: boolean = false
  ): void {
    // 1. Título do documento
    this.title.setTitle(title);

    // 2. Metadados padrão de motores de busca
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'author', content: environment.author });
    this.meta.updateTag({
      name: 'robots',
      content: noIndex ? 'noindex, nofollow' : 'index, follow'
    });

    // 3. Resolução de URL canônica absoluta e imagem
    const absoluteUrl = url.startsWith('http') ? url : `${environment.siteUrl}${url.startsWith('/') ? '' : '/'}${url}`;
    const absoluteImage = image.startsWith('http') ? image : `${environment.siteUrl}${image.startsWith('/') ? '' : '/'}${image}`;

    // 4. Open Graph
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:image', content: absoluteImage });
    this.meta.updateTag({ property: 'og:url', content: absoluteUrl });
    this.meta.updateTag({ property: 'og:type', content: type });
    this.meta.updateTag({ property: 'og:site_name', content: environment.siteName });
    this.meta.updateTag({ property: 'og:locale', content: environment.defaultLocale });

    // 5. Twitter Card
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: absoluteImage });

    // 6. Atualização do link Canonical no <head>
    this.setCanonicalUrl(absoluteUrl);
  }

  /**
   * Configura metadados para um Estudo de Caso específico.
   */
  setCaseStudyTags(study: CaseStudy): void {
    const pageTitle = `${study.title} // Estudo de Caso — Erick Gabriel`;
    const snippet = study.context?.content || study.subtitle || environment.defaultDescription;
    const cleanSnippet = snippet.length > 160 ? `${snippet.substring(0, 157)}...` : snippet;
    const pageUrl = `/case-studies/${study.id}`;
    const heroImage = study.heroIllustration || environment.ogImage;

    this.setSocialMediaTags(
      pageTitle,
      cleanSnippet,
      heroImage,
      pageUrl,
      'article',
      false
    );
  }

  /**
   * Configura metadados para a página de erro 404.
   */
  setNotFoundTags(): void {
    this.setSocialMediaTags(
      'Capítulo Não Encontrado // 404 — Erick Gabriel',
      'A página ou capítulo solicitado não foi encontrado no manuscrito editorial.',
      environment.ogImage,
      '/404',
      'website',
      true // noindex, nofollow
    );
  }

  /**
   * Redefine os metadados para a página inicial padrão.
   */
  resetToDefault(): void {
    this.setSocialMediaTags(
      environment.siteName,
      environment.defaultDescription,
      environment.ogImage,
      environment.siteUrl,
      'website',
      false
    );
  }

  /**
   * Adiciona ou atualiza a tag link rel="canonical" no <head>.
   */
  setCanonicalUrl(url: string): void {
    if (!this.doc || !this.doc.head) return;

    let canonicalLink = this.doc.head.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = this.doc.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', url);
  }
}
