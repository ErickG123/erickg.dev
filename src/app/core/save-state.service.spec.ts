import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SaveStateService } from './save-state.service';
import { PLATFORM_ID } from '@angular/core';

describe('SaveStateService', () => {
  let service: SaveStateService;

  beforeEach(() => {

    let store: { [key: string]: string } = {};
    const mockLocalStorage = {
      getItem: (key: string): string | null => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      clear: () => {
        store = {};
      }
    };

    jest.spyOn(window.localStorage, 'getItem').mockImplementation(mockLocalStorage.getItem);
    jest.spyOn(window.localStorage, 'setItem').mockImplementation(mockLocalStorage.setItem);
    jest.spyOn(window.localStorage, 'clear').mockImplementation(mockLocalStorage.clear);

    jest.spyOn(window, 'Audio').mockImplementation(() => ({
      play: () => Promise.resolve(),
      volume: 1
    } as any));

    TestBed.configureTestingModule({
      providers: [
        SaveStateService,
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    });
    service = TestBed.inject(SaveStateService);
  });

  afterEach(() => {
    window.localStorage.clear();
    jest.restoreAllMocks();
  });

  it('deve salvar e recuperar uma preferência do usuário corretamente', () => {
    service.savePreference('theme', 'dark');
    expect(window.localStorage.setItem).toHaveBeenCalledWith('gba_pref_theme', '"dark"');

    const result = service.getPreference('theme');
    expect(window.localStorage.getItem).toHaveBeenCalledWith('gba_pref_theme');
    expect(result).toBe('dark');
  });

  it('ao destravar uma conquista inédia, deve verificar storage, salvar, emitir Signal, e resetar após 4s', fakeAsync(() => {
    service.unlockAchievement('TEST_ACHIEVEMENT', 'First Blood');

    expect(window.localStorage.setItem).toHaveBeenCalledWith('gba_achievements', JSON.stringify(['TEST_ACHIEVEMENT']));
    
    const activeSignal = service.latestAchievement();
    expect(activeSignal).toEqual({ id: 'TEST_ACHIEVEMENT', title: 'First Blood' });

    tick(4000);

    expect(service.latestAchievement()).toBeNull();
  }));

  it('não deve emitir Signal ou re-salvar se a conquista já existir no storage', () => {
    window.localStorage.setItem('gba_achievements', JSON.stringify(['TEST_ACHIEVEMENT']));
    
    service.unlockAchievement('TEST_ACHIEVEMENT', 'First Blood');
    
    expect(service.latestAchievement()).toBeNull();
  });
});
