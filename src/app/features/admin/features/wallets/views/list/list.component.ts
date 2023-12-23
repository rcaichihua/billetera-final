import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { WalletsHttp } from '../../http/wallets.http';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  private walletsHttp = inject(WalletsHttp);

  displayedColumns: string[] = ['id', 'name', 'amount'];

  wallets: any[] = [];

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.walletsHttp.getAll().subscribe(wallets => { console.log(wallets), this.wallets = wallets; }, error => { console.error('Error', error) });
  }
}
