export interface PreparePayout {
  address: string;
  amount: number;
  username: string;
  productKey: string;
  lastTransaction?: {
    _id: string;
    uCode: string;
    mCode: string;
    amount: number;
    type: string;
    inOut: string;
    gasCharge: number;
    from: string;
    to: string;
    remark: string;
    txHash: string;
    status: number;
    createdAt: string;
    updatedAt: string;
  };
}
export interface TatumPayput {
  address: string;
  value: string;
}
