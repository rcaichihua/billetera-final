import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>list category works!</p>`,
  styleUrl: './list.component.scss',

})
export class ListComponent { }
