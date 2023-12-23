import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AppSessionService } from '../../../../auth/services/session.service';

@Injectable()
export class WalletsHttp {
  private http = inject(HttpClient)
  private session = inject(AppSessionService)

  getAll() {
    // let headers = new HttpHeaders({
    //   Authorization: `Bearer ${this.session.accessToken?.jwt2}`,
    // });

    return this.http.get<any[]>('wallet', {});
  }
}
