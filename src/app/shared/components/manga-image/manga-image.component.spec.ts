import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MangaImageComponent } from './manga-image.component';
import { By } from '@angular/platform-browser';

describe('MangaImageComponent', () => {
  let component: MangaImageComponent;
  let fixture: ComponentFixture<MangaImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MangaImageComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MangaImageComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('src', 'test-image.webp');
    fixture.componentRef.setInput('alt', 'Legenda de teste');
    fixture.detectChanges();
  });

  it('deve inicializar com estado de carregamento ativo', () => {
    expect(component.isLoading()).toBe(true);
    expect(component.hasError()).toBe(false);

    const skeletonEl = fixture.debugElement.query(By.css('.manga-image-skeleton'));
    expect(skeletonEl).toBeTruthy();
  });

  it('deve desativar o skeleton ao disparar o evento de load', () => {
    const imgEl = fixture.debugElement.query(By.css('img'));
    imgEl.triggerEventHandler('load', null);
    fixture.detectChanges();

    expect(component.isLoading()).toBe(false);
    expect(component.hasError()).toBe(false);
  });

  it('deve exibir o painel de fallback de mangá ao disparar erro de carregamento', () => {
    const imgEl = fixture.debugElement.query(By.css('img'));
    imgEl.triggerEventHandler('error', null);
    fixture.detectChanges();

    expect(component.isLoading()).toBe(false);
    expect(component.hasError()).toBe(true);

    const fallbackEl = fixture.debugElement.query(By.css('.manga-image-fallback-view'));
    expect(fallbackEl).toBeTruthy();
    expect(fallbackEl.nativeElement.textContent).toContain('PAINEL EM RESTAURAÇÃO');
  });
});
