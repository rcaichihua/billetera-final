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
import { WalletDTO } from '../../interfaces/wallet.dto';
import { WalletFormComponent } from '../../components/form/form.component';
@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    CommonModule,
    WalletFormComponent
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',

})
export default class CreateComponent {
  private fb = inject(FormBuilder);
  private wallestHttp = inject(WalletsHttp);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  save(walletDTO: WalletDTO) {
    this.wallestHttp
      .create(walletDTO)
      .pipe(tap(() => this.router.navigate(['../'], { relativeTo: this.route }))
      )
      .subscribe();
  }
}

