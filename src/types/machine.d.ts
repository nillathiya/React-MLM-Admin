export interface Machine {
  _id: string;
  mCode: string;
  dCode?: string;
  mName: string;
  model: string;
  version: string;
  specification: string;
  hashrate: number;
  cCode?: {
    _id: string;
    name: string;
    symbol: string;
  };
  images?: [string];
  file?: File | string | null;
  minWith?: number;
  status: number;
  createdAt: string;
  updatedAt: string;
}

export interface MachinePayload {
  mCode: string;
  mName: string;
  model: string;
  version: string;
  specification: string;
  hashrate: number;
  cCode: string;
  imageUpdateIndex?: number[];
  images?: File[];
  file?: File | string | null;
}

export interface MachineResponse {
  success: boolean;
  message: string;
  data: Machine;
}
