import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>create works!</p>`,
  styleUrl: './create.component.scss',

})
export default class CreateComponent { }
