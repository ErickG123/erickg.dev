import { Component, inject } from '@angular/core';
import { SaveStateService } from '../../../core/save-state.service';

@Component({
  selector: 'app-achievement-toast',
  standalone: true,
  templateUrl: './achievement-toast.component.html',
  styleUrls: ['./achievement-toast.component.scss']
})
export class AchievementToastComponent {
  saveState = inject(SaveStateService);
}
