import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  styles: [`
    .nav-buttons-container {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }
    @media (max-width: 768px) {
      nav.gba-card {
        flex-direction: column !important;
        align-items: flex-start !important;
        gap: 1rem;
      }
      .nav-buttons-container {
        overflow-x: auto;
        flex-wrap: nowrap;
        width: 100%;
        padding-bottom: 0.5rem;
      }
      .nav-buttons-container::-webkit-scrollbar {
        display: none;
      }
    }
  `],
  template: `
    <header style="padding: 1rem;">
      <nav class="gba-card flex justify-between align-center" style="padding: 0.75rem 1.5rem; border-bottom-width: 6px; border-bottom-color: var(--gba-red);">
        
        <div class="pixel-font" style="font-size: 1.2rem; cursor: pointer; color: var(--gba-red);" routerLink="/">
          ERICK_DEV.EXE
        </div>
        
        <div class="nav-buttons-container">
          <a routerLink="/" class="gba-btn gba-btn-secondary" style="font-size: 0.6rem; padding: 0.5rem; width: auto; margin-top: 0; white-space: nowrap;">START</a>
          <a routerLink="/about" class="gba-btn gba-btn-secondary" style="font-size: 0.6rem; padding: 0.5rem; width: auto; margin-top: 0; white-space: nowrap;">STATUS</a>
          <a routerLink="/projects" class="gba-btn gba-btn-secondary" style="font-size: 0.6rem; padding: 0.5rem; width: auto; margin-top: 0; white-space: nowrap;">BAG</a>
          <a routerLink="/contact" class="gba-btn gba-btn-secondary" style="font-size: 0.6rem; padding: 0.5rem; width: auto; margin-top: 0; white-space: nowrap;">LOG</a>
        </div>
      </nav>
    </header>
  `
})
export class HeaderComponent {}
