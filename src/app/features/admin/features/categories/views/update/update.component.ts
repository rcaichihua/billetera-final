import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>update works!</p>`,
  styleUrl: './update.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UpdateComponent { }
