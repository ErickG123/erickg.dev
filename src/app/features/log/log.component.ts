import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-log',
  standalone: true,
  imports: [TranslatePipe, MarkdownModule],
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent {}
