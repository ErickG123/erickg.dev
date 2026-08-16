import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AudioService } from './audio.service';
import { SaveStateService } from './save-state.service';

describe('AudioService', () => {
  let service: AudioService;
  let saveStateSpy: any;
  
  beforeEach(() => {

    saveStateSpy = { unlockAchievement: jest.fn() };

    TestBed.configureTestingModule({
      providers: [
        AudioService,
        { provide: SaveStateService, useValue: saveStateSpy }
      ]
    });
    service = TestBed.inject(AudioService);

    jest.spyOn(window, 'Audio').mockImplementation(() => ({
      play: () => Promise.resolve(),
      pause: () => {},
      loop: false,
      volume: 1
    } as any));
  });

  it('deve inicializar com isBgmPlaying igual a false', () => {
    expect(service.isBgmPlaying()).toBe(false);
  });

  it('deve alterar o estado de isBgmPlaying para true e destravar conquista quando toggleBgm() for chamado com sucesso', fakeAsync(() => {
    service.toggleBgm();
    tick();
    
    expect(service.isBgmPlaying()).toBe(true);
    expect(saveStateSpy.unlockAchievement).toHaveBeenCalledWith('MUSIC_MAESTRO', 'Symphony of the Night');
  }));

  it('deve lidar graciosamente com a rejeição da Promise do .play() simulando o bloqueio de autoplay', fakeAsync(() => {

    jest.spyOn(window, 'Audio').mockImplementation(() => ({
      play: () => Promise.reject('Autoplay blocked by browser policy'),
      pause: () => {}
    } as any));

    service.toggleBgm();
    tick();

    expect(service.isBgmPlaying()).toBe(false);
    expect(saveStateSpy.unlockAchievement).not.toHaveBeenCalled();
  }));
});
