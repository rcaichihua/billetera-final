import { AbstractControl, ValidationErrors } from '@angular/forms';

const PATTERN = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

export const emailValidator = (control: AbstractControl): ValidationErrors | null => {
  const value = control?.value || '';
  const isValid = !value ? true : PATTERN.test(value);
  return isValid ? null : { email: 'El formato debe ser username@domain.com' }
}
