import { JwtHelperService } from '@auth0/angular-jwt';

export class Token {
  private helper = new JwtHelperService();

  isValid?: boolean;

  get isExpired() {
    return this.isValid ? this.helper.isTokenExpired(this.jwt2) : true;
  }

  constructor(public jwt2: string) {
    try {
      this.helper.decodeToken(this.jwt2);
      this.helper.isTokenExpired(this.jwt2);
      this.isValid = true;

    } catch {
      this.isValid = false;
    }

  }
}
