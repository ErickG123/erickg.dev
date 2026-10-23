import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chapter-heading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chapter-heading.component.html',
  styleUrls: ['./chapter-heading.component.scss']
})
export class ChapterHeadingComponent {
  chapter = input.required<string>();
  title = input.required<string>();
  subtitle = input<string>();
  meta = input<string>();
  accentBadge = input<boolean>(false);
  accentTitle = input<boolean>(false);
}
