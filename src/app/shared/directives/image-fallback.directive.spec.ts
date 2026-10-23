import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageFallbackDirective } from './image-fallback.directive';
import { By } from '@angular/platform-browser';

@Component({
  standalone: true,
  imports: [ImageFallbackDirective],
  template: `
    <img id="test-img" src="invalid-url.png" appImageFallback />
    <img id="test-custom-img" src="broken.png" [appImageFallback]="'custom-fallback.png'" />
  `
})
class TestHostComponent {}

describe('ImageFallbackDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('deve substituir src com SVG inline de mangá quando a imagem falhar', () => {
    const imgEl = fixture.debugElement.query(By.css('#test-img'));
    imgEl.triggerEventHandler('error', null);
    fixture.detectChanges();

    const nativeImg = imgEl.nativeElement as HTMLImageElement;
    expect(nativeImg.src).toContain('data:image/svg+xml');
    expect(nativeImg.classList.contains('manga-image-fallback')).toBe(true);
  });

  it('deve utilizar fallback customizado quando fornecido', () => {
    const customImgEl = fixture.debugElement.query(By.css('#test-custom-img'));
    customImgEl.triggerEventHandler('error', null);
    fixture.detectChanges();

    const nativeImg = customImgEl.nativeElement as HTMLImageElement;
    expect(nativeImg.src).toContain('custom-fallback.png');
  });
});
