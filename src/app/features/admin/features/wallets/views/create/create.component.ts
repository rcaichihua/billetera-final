import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  Validators,
  FormBuilder,
  FormGroup
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',

})
export default class CreateComponent {
  private fb = inject(FormBuilder);

  formGroup: FormGroup<{
    name: FormControl;
    amount: FormControl;
  }>;

  constructor() {
    this.formGroup = this.fb.group({
      name: [null, Validators.required],
      amount: [null, Validators.required],
    });
  }
}

