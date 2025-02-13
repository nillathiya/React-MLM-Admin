export interface Coin {
  _id: string;
  name: string;
  symbol: string;
  image: string;
  hashtime: number;
  perSecondReward: number;
  txCharge: number;
  minWith: number;
  mineUnit: string;
  status: number;
  createdAt: string;
  updatedAt: string;
}

export interface CoinListResponse {
  coins: Coin[];
  total: number;
}

export interface CoinPayload {
  image: File | null;
  name: string;
  symbol: string;
  hashtime: number;
  perSecondReward: number;
  txCharge: number;
  minWith: number;
  mineUnit: string;
}
