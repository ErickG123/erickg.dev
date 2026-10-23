import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MotionRevealComponent } from './motion-reveal.component';
import { PLATFORM_ID } from '@angular/core';

describe('MotionRevealComponent', () => {
  let component: MotionRevealComponent;
  let fixture: ComponentFixture<MotionRevealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MotionRevealComponent],
      providers: [{ provide: PLATFORM_ID, useValue: 'browser' }]
    }).compileComponents();

    fixture = TestBed.createComponent(MotionRevealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente motion-reveal', () => {
    expect(component).toBeTruthy();
  });

  it('deve aplicar direção padrão de revelação up', () => {
    const el = fixture.nativeElement as HTMLElement;
    const motion = el.querySelector('.motion-reveal');
    expect(motion?.classList.contains('reveal-up')).toBe(true);
  });

  it('deve revelar imediatamente quando disabled for true', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.componentRef.setInput('direction', 'fade');
    component.ngOnInit();
    fixture.detectChanges();

    const motion = (fixture.nativeElement as HTMLElement).querySelector('.motion-reveal');
    expect(motion?.classList.contains('is-revealed')).toBe(true);
    expect(motion?.classList.contains('reveal-fade')).toBe(true);
  });
});
