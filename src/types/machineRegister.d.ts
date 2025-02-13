export interface MachineRegister {
  _id: string;
  mCode: string;
  mName: string;
  uCode?: {
    _id: string;
    username: string;
    name: string;
    mobile?:string;
    address?: {
      line1: string;
      city: string;
      state: string;
      country: string;
      countryCode: string;
      postalCode: string;
    };
  };
  fCode?: {
    _id: string;
    username: string;
    name: string;
  };
  dCode?: string;
  cCode?: {
    _id: string;
    name: string;
    symbol: string;
  };
  address: string;
  macAddress: string;
  productKey: string;
  allTimeReward?: string;
  rate: number;
  status: number;
  minThresold?: number;
  withdrawStatus: number;
  expiry?: string;
  activated?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MachineRegisterPayload {
  mCode: string;
  fCode: string;
  macAddress: string;
  productKey: string;
}
