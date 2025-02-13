export interface User {
    _id: string;
    parentId: mongoose.Types.ObjectId;
    sponsorUsername?: string;
    username: string;
    email: string;
    mobile?: string;
    name?: string;
    gender?: 'Male' | 'Female' | 'Other';
    dateOfBirth?: Date;
    address?: {
      line1?: string;
      line2?: string;
      city?: string;
      state?: string;
      country?: string;
      countryCode?: string;
      postalCode?: string;
    };
    password: string;
    transactionPassword?: string;
    adminRegisterStatus?: boolean;
    emailVerification?: {
      code?: string;
      isVerified?: boolean;
    };
    accountStatus?: {
      isActive?: boolean;
      activeId?: number;
      activeDate?: Date;
      blockStatus?: boolean;
    };
    matrixDetails?: {
      pool?: string;
      position?: string;
    };
    profileEdited?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }
  