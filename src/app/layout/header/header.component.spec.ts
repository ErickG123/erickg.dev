import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { AudioService } from '../../core/audio.service';
import { signal, Pipe, PipeTransform } from '@angular/core';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Pipe({ name: 'translate', standalone: true })
class MockTranslatePipe implements PipeTransform {
  transform(value: string): string { return value; }
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockAudioService: any;
  let bgmSignal: any;

  beforeEach(async () => {
    bgmSignal = signal(false);
    mockAudioService = {
      isBgmPlaying: bgmSignal,
      toggleBgm: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        provideRouter([]),
        { provide: AudioService, useValue: mockAudioService },
        { provide: TranslateService, useValue: { 
          get: () => ({ subscribe: () => {} }),
          setFallbackLang: jest.fn(),
          use: jest.fn()
        } }
      ]
    })
    .overrideComponent(HeaderComponent, {
      remove: { imports: [TranslatePipe] },
      add: { imports: [MockTranslatePipe] }
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve renderizar o título ERICK_DEV.EXE corretamente no cabeçalho', () => {
    const titleEl = fixture.debugElement.query(By.css('.header-title')).nativeElement;
    expect(titleEl.textContent).toContain('ERICK_DEV.EXE');
  });

  it('deve exibir dinamicamente o texto do botão baseado no estado isolado do Mock de Áudio', () => {
    const buttonEl = fixture.debugElement.query(By.css('.bgm-btn')).nativeElement;
    expect(buttonEl.textContent).toContain('[ ▶ BGM_ON ]');

    bgmSignal.set(true);
    fixture.detectChanges();
    
    expect(buttonEl.textContent).toContain('[ ■ BGM_OFF ]');
  });

  it('deve disparar a função toggleBgm() do serviço ao interceptar um clique falso no DOM', () => {
    const buttonEl = fixture.debugElement.query(By.css('.bgm-btn'));
    buttonEl.triggerEventHandler('click', null);
    expect(mockAudioService.toggleBgm).toHaveBeenCalled();
  });
});
