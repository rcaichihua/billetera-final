import { AbstractControl, ValidationErrors } from '@angular/forms';
import { emailValidator } from './email.validator';

export class AppValidators {
  static email(control: AbstractControl): ValidationErrors | null {
    return emailValidator(control)
  }
}
