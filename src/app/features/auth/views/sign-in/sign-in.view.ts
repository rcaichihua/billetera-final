import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthHttp } from '../../http/auth.http';
import { SignInDto } from '../../dto/sign-in.dto';
import { AppValidators } from '../../../../common/forms/validators';
import { ErrorMessageComponent } from '../../../../common/forms/components/error-message/error-message.component';
import { environment } from '../../../../../environments/environment.development';
import { AppSessionService } from '../../services/session.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    ErrorMessageComponent,
  ],
  templateUrl: './sign-in.view.html',
  styleUrl: './sign-in.view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SignInComponent {
  private fb = inject(FormBuilder);
  private authHttp = inject(AuthHttp);
  private session = inject(AppSessionService);
  showPassword = false;

  form: FormGroup<{
    email: FormControl;
    password: FormControl;
  }>
  constructor() {
    this.form = this.fb.group({
      email: [environment.auth.email, [Validators.required, AppValidators.email]],
      password: [environment.auth.password, Validators.required]
    })
  }

  signIn() {
    if (this.form.invalid) return;
    //this.authHttp.getToken(this.form.getRawValue());
    this.authHttp.getToken(this.form.value as SignInDto)
      //.subscribe(console.log)
      .subscribe((tokens: any) => this.session.create(tokens.accessToken, tokens.refreshToken));
  }
}
