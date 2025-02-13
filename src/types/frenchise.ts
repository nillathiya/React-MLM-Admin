export interface BankDetails {
  bankName: string;
  accountHolderName: string;
  accountNo: string;
  ifscCode: string;
  bankBranch: string;
}

export interface Address {
  fullAddress: string;
  country: string;
  city: string;
  state: string;
  pinCode: string;
}

export interface FranchiseData {
  _id: string;
  username: string;
  name: string;
  type: string; // Example: 'Franchise'
  frenchiseName: string;
  email: string;
  mobile: string;
  frenchisePan: string;
  bankDetails: BankDetails;
  address: Address;
  franchiseGst: string;
  aadhaarNo?: string;
  isBlock?: boolean;
  activeStatus: number; // Example: 0 or 1
  role: number; // Example: 2
  createdAt: string;
  updatedAt: string;
}
