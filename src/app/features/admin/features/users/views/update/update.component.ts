import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>update works!</p>`,
  styleUrl: './update.component.scss',

})
export default class UpdateComponent { }
