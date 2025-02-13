export interface Transaction {
  _id: string;
  uCode?: {
    _id: string;
    username: string;
    name: string;
  };
  mCode: {
    _id: string;
    productKey: string;
  };
  amount: number;
  type: string;
  inOut: string;
  gasCharge: number;
  from: string;
  to: string;
  remark?: string;
  txHash: string;
  status: number;
  createdAt: string;
  updatedAt: string;
}
