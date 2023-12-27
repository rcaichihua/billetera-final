import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AppSessionService } from '../../../../auth/services/session.service';
import { WalletItemResponse } from '../interfaces/wallet.response';
import { Observable, map } from 'rxjs';
import { WalletModel } from '../models/wallet.model';
import { WalletDTO } from '../interfaces/wallet.dto';

@Injectable()
export class WalletsHttp {
  private http = inject(HttpClient)
  private session = inject(AppSessionService)
  private endpoint = 'wallet';

  getAll(): Observable<WalletModel[]> {
    // let headers = new HttpHeaders({
    //   Authorization: `Bearer ${this.session.accessToken?.jwt2}`,
    // });

    return this.http.get<WalletItemResponse[]>(this.endpoint)
      .pipe(
        map((res) => res.map(item => new WalletModel(item))));
  }
  getOne(id: number): Observable<WalletModel> {
    return this.http.get<WalletItemResponse>(`${this.endpoint}/${id}`)
      .pipe(
        map((res) => new WalletModel(res))
      )
  }
  create(body: WalletDTO) {
    return this.http.post(this.endpoint, body);
  }
  update(id: number, body: WalletDTO) {
    return this.http.put(`${this.endpoint}/${id}`, body);
  }
}
