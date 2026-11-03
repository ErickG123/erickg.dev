import { Component } from '@angular/core';
import { AUTHOR_DATA } from '../../core/data/portfolio.data';

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  readonly author = AUTHOR_DATA;
}
