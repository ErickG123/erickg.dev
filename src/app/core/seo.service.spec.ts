import { TestBed } from '@angular/core/testing';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { SeoService } from './seo.service';
import { environment } from '../../environments/environment';
import { CaseStudy } from './models/case-study.interface';

describe('SeoService', () => {
  let service: SeoService;
  let titleService: Title;
  let metaService: Meta;
  let doc: Document;

  const mockCaseStudy: Partial<CaseStudy> = {
    id: '1',
    title: "The Architect's Forge",
    subtitle: 'Automação de Scaffolding com Clean Architecture',
    heroIllustration: '/assets/images/projects/project-architect-forge.svg',
    context: {
      title: 'Contexto',
      content: 'Durante o desenvolvimento de aplicações frontend corporativas com Angular...'
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SeoService, Title, Meta]
    });
    service = TestBed.inject(SeoService);
    titleService = TestBed.inject(Title);
    metaService = TestBed.inject(Meta);
    doc = TestBed.inject(DOCUMENT);
  });

  afterEach(() => {
    // Clean up canonical links after tests
    const canonical = doc.head.querySelector("link[rel='canonical']");
    if (canonical) {
      canonical.remove();
    }
  });

  it('deve ser instanciado corretamente', () => {
    expect(service).toBeTruthy();
  });

  it('deve atualizar título, meta description, Open Graph e Twitter tags', () => {
    const titleSpy = jest.spyOn(titleService, 'setTitle');
    const metaSpy = jest.spyOn(metaService, 'updateTag');

    service.setSocialMediaTags(
      'Custom Title',
      'Custom Description',
      '/assets/images/social/og-image.svg',
      'https://erickg.dev/test',
      'website',
      false
    );

    expect(titleSpy).toHaveBeenCalledWith('Custom Title');
    expect(metaSpy).toHaveBeenCalledWith({ name: 'description', content: 'Custom Description' });
    expect(metaSpy).toHaveBeenCalledWith({ name: 'robots', content: 'index, follow' });
    expect(metaSpy).toHaveBeenCalledWith({ property: 'og:title', content: 'Custom Title' });
    expect(metaSpy).toHaveBeenCalledWith({ property: 'og:description', content: 'Custom Description' });
    expect(metaSpy).toHaveBeenCalledWith({ property: 'og:url', content: 'https://erickg.dev/test' });
    expect(metaSpy).toHaveBeenCalledWith({ name: 'twitter:card', content: 'summary_large_image' });
  });

  it('deve configurar noindex, nofollow quando noIndex for true', () => {
    const metaSpy = jest.spyOn(metaService, 'updateTag');

    service.setSocialMediaTags(
      'Erro',
      'Descrição de Erro',
      '/assets/images/social/og-image.svg',
      '/404',
      'website',
      true
    );

    expect(metaSpy).toHaveBeenCalledWith({ name: 'robots', content: 'noindex, nofollow' });
  });

  it('deve criar e atualizar a tag canonical no <head>', () => {
    service.setCanonicalUrl('https://erickg.dev/canonical-test');

    const canonicalLink = doc.head.querySelector("link[rel='canonical']") as HTMLLinkElement;
    expect(canonicalLink).toBeTruthy();
    expect(canonicalLink.getAttribute('href')).toBe('https://erickg.dev/canonical-test');

    // Updating existing canonical link
    service.setCanonicalUrl('https://erickg.dev/canonical-updated');
    expect(canonicalLink.getAttribute('href')).toBe('https://erickg.dev/canonical-updated');
  });

  it('deve configurar metadados específicos para estudo de caso', () => {
    const setTagsSpy = jest.spyOn(service, 'setSocialMediaTags');

    service.setCaseStudyTags(mockCaseStudy as CaseStudy);

    expect(setTagsSpy).toHaveBeenCalledWith(
      "The Architect's Forge // Estudo de Caso — Erick Gabriel",
      expect.stringContaining('Durante o desenvolvimento'),
      '/assets/images/projects/project-architect-forge.svg',
      '/case-studies/1',
      'article',
      false
    );
  });

  it('deve configurar metadados de 404 com noindex', () => {
    const setTagsSpy = jest.spyOn(service, 'setSocialMediaTags');

    service.setNotFoundTags();

    expect(setTagsSpy).toHaveBeenCalledWith(
      'Capítulo Não Encontrado // 404 — Erick Gabriel',
      expect.stringContaining('não foi encontrado'),
      environment.ogImage,
      '/404',
      'website',
      true
    );
  });

  it('deve redefinir para os metadados padrão', () => {
    const setTagsSpy = jest.spyOn(service, 'setSocialMediaTags');

    service.resetToDefault();

    expect(setTagsSpy).toHaveBeenCalledWith(
      environment.siteName,
      environment.defaultDescription,
      environment.ogImage,
      environment.siteUrl,
      'website',
      false
    );
  });
});
