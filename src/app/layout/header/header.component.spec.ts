import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders portfolio navigation links', () => {
    const links = Array.from((fixture.nativeElement as HTMLElement).querySelectorAll('nav a'))
      .map(link => link.getAttribute('routerLink'));
    expect(links).toEqual(['/', '/about', '/projects', '/reading-notes', '/camp', '/log', '/contact']);
  });

  it('opens and closes the personal note from the brand mark', () => {
    const mark = fixture.nativeElement.querySelector('.brand-mark') as HTMLButtonElement;
    mark.click();
    fixture.detectChanges();
    expect(component.personalNoteOpen()).toBe(true);
    expect(fixture.nativeElement.querySelector('[role="note"]')).not.toBeNull();

    component.closePersonalNote();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="note"]')).toBeNull();
  });

  it('toggles the active language through the language control', () => {
    const languageButton = fixture.nativeElement.querySelector('.header-nav .gba-btn') as HTMLButtonElement;
    expect(languageButton).not.toBeNull();
    languageButton.click();
    fixture.detectChanges();
    expect(component.currentLang()).toBe('en');
  });

});
