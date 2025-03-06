export interface IncomeTransaction {
  txUCode?: {
    username: string;
    name: string;
  };
  uCode?: {
    username: string;
    name: string;
  };
  txType: string;
  walletType: string;
  source: string;
  amount: number;
  txCharge: number;
  currentWalletBalance: number;
  postWalletBalance: number;
  remark: string;
  response: string;
  status: number;
  createdAt: string;
  updatedAt: string;
}
