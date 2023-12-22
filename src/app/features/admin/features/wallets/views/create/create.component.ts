import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>create works!</p>`,
  styleUrl: './create.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CreateComponent { }
