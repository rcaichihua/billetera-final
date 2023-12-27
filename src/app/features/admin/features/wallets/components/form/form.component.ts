import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaskDirective } from 'ngx-mask';
import { startWith, tap } from 'rxjs';
import { AppFormsModule } from '../../../../../../common/forms/forms.module';
import { AppValidators } from '../../../../../../common/forms/validators';
import { WalletDTO } from '../../interfaces/wallet.dto';
import { RouterLink } from '@angular/router';
import { WalletModel } from '../../models/wallet.model';

@Component({
  selector: 'app-wallet-form',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    AppFormsModule,
    NgxMaskDirective,
    RouterLink,
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class WalletFormComponent implements OnInit, OnChanges {
  private fb = inject(FormBuilder);
  @Input() wallet?: WalletModel;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) cancelPath!: string;
  @Output() save: EventEmitter<WalletDTO> = new EventEmitter<WalletDTO>();

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

  ngOnInit(): void {
    if (this.wallet) this.updateForm(this.wallet);
  }

  /**
   * Utilizar cuando la información del input es capturada desde un servicio
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['wallet'].currentValue) this.updateForm(changes['wallet'].currentValue)
  }

  updateForm(wallet: WalletModel) {
    const {
      name,
      amount
    } = wallet;
    this.formGroup.patchValue({
      name,
      amount
    });
  }

  submit() {
    if (this.formGroup.invalid) return;
    this.save.emit(this.formGroup.getRawValue());
  }

  positiveNumberValidator(control: FormControl): ValidationErrors | null {
    const value = control.value;
    if (value != null && value <= 0) {
      return { 'positiveNumber': true };
    }
    return null;
  }
}
