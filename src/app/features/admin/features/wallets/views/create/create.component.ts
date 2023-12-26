import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  Validators,
  FormBuilder,
  FormGroup,
  ValidationErrors
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { WalletsHttp } from '../../http/wallets.http';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { ErrorMessageComponent } from '../../../../../../common/forms/components/error-message/error-message.component';

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
    ErrorMessageComponent
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',

})
export default class CreateComponent {
  private fb = inject(FormBuilder);
  private wallestHttp = inject(WalletsHttp);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  formGroup: FormGroup<{
    name: FormControl;
    amount: FormControl;
  }>;

  constructor() {
    this.formGroup = this.fb.group({
      name: [null, Validators.required],
      amount: [null, [Validators.required, this.positiveNumberValidator]],
    });
  }

  save() {
    if (this.formGroup.invalid) return;
    this.wallestHttp.create(this.formGroup.getRawValue())
      .pipe(tap(() => this.router.navigate(['../'], { relativeTo: this.route }))).subscribe();
  }

  positiveNumberValidator(control: FormControl): ValidationErrors | null {
    const value = control.value;
    if (value != null && value <= 0) {
      return { 'positiveNumber': true };
    }
    return null;
  }
}

