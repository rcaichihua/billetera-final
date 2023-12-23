import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { WalletsHttp } from '../../http/wallets.http';
import { WalletModel } from '../../models/wallet.model';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  private walletsHttp = inject(WalletsHttp);

  displayedColumns: string[] = ['id', 'name', 'amount'];

  wallets: WalletModel[] = [];

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.walletsHttp.getAll().subscribe(wallets => { console.log(wallets), this.wallets = wallets; }, error => { console.error('Error', error) });
  }
}
