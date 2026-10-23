import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MangaPanelComponent } from '../../shared/components/manga-panel/manga-panel.component';
import { ChapterHeaderComponent } from '../../shared/components/chapter-header/chapter-header.component';
import { ArtworkFrameComponent } from '../../shared/components/artwork-frame/artwork-frame.component';
import { HalftoneSurfaceComponent } from '../../shared/components/halftone-surface/halftone-surface.component';
import { PanelCaptionComponent } from '../../shared/components/panel-caption/panel-caption.component';
import { ChapterMarkerComponent } from '../../shared/components/chapter-marker/chapter-marker.component';
import { EditorialDividerComponent } from '../../shared/components/editorial-divider/editorial-divider.component';
import { MotionRevealComponent } from '../../shared/components/motion-reveal/motion-reveal.component';

@Component({
  selector: 'app-design-system',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MangaPanelComponent,
    ChapterHeaderComponent,
    ArtworkFrameComponent,
    HalftoneSurfaceComponent,
    PanelCaptionComponent,
    ChapterMarkerComponent,
    EditorialDividerComponent,
    MotionRevealComponent
  ],
  templateUrl: './design-system.component.html',
  styleUrls: ['./design-system.component.scss']
})
export class DesignSystemComponent {
  readonly activeTab = signal<'tokens' | 'typography' | 'components' | 'screentones' | 'quadros'>('tokens');

  readonly colorTokens = [
    { name: 'Ink Black', hex: '#111111', var: '--manga-ink', text: '#F4F0E9', desc: 'Nanquim puro para traços, textos principais e bordas pesadas' },
    { name: 'Paper White', hex: '#F4F0E9', var: '--manga-paper', text: '#111111', desc: 'Papel de mangá aquecido para fundos e leitura confortável' },
    { name: 'Vermilion Red', hex: '#D9363E', var: '--manga-vermilion', text: '#FFFFFF', desc: 'Acentos dramáticos, selos Hanko, ações principais e erros' },
    { name: 'Ink Gray', hex: '#77736F', var: '--manga-gray', text: '#FFFFFF', desc: 'Meio-tom para metadados, legendas e bordas secundárias' }
  ];

  readonly surfaceTokens = [
    { name: 'Surface Pure', hex: '#FFFFFF', var: '--manga-surface', text: '#111111', desc: 'Superfície elevada de cards e painéis em destaque' },
    { name: 'Surface Muted', hex: '#EAE5DC', var: '--manga-surface-muted', text: '#111111', desc: 'Sarjetas e fundos de contraste sutil' },
    { name: 'Surface Dark', hex: '#1A1A1A', var: '--manga-surface-dark', text: '#F4F0E9', desc: 'Painéis noturnos e blocos de código' },
    { name: 'Border Subtle', hex: '#D8D2C7', var: '--manga-border-subtle', text: '#111111', desc: 'Linhas finas de divisão e grids auxiliares' }
  ];
}
