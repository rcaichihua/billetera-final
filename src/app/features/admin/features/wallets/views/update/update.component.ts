import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { WalletFormComponent } from '../../components/form/form.component';
import { WalletsHttp } from '../../http/wallets.http';
import { ActivatedRoute, Router } from '@angular/router';
import { WalletDTO } from '../../interfaces/wallet.dto';
import { tap } from 'rxjs';
import { WalletModel } from '../../models/wallet.model';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [
    CommonModule,
    WalletFormComponent,
  ],
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export default class UpdateComponent implements OnInit {
  private walletsHttp = inject(WalletsHttp);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private id: number;
  wallet?: WalletModel;

  constructor() {
    this.id = +this.route.snapshot.paramMap.get('id')!
  }

  ngOnInit(): void {
    this.walletsHttp.getOne(this.id)
      .subscribe(wallet => this.wallet = wallet)
  }

  save(walletDTO: WalletDTO) {
    this.walletsHttp
      .update(this.id, walletDTO)
      .pipe(
        tap(() => this.router.navigate(['../../'], { relativeTo: this.route }))
      )
      .subscribe();
  }
}
