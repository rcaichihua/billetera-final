import { WalletItemResponse } from "../interfaces/wallet.response";
//Usa Patron adaptador
export class WalletModel {
  id: number;
  name: string;
  amount: number;
  userId: 1;

  constructor(walletItem: WalletItemResponse) {
    this.id = walletItem.id;
    this.name = walletItem.name;
    this.amount = walletItem.amount;
    this.userId = walletItem.userId;
  }
}
