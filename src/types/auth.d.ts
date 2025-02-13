export interface LoginPayload {
    email: string;
    password: string;
  }
  
  export interface SignupPayload {
    name: string;
    email: string;
    password: string;
  }
  
  export interface AuthResponse {
    token: string;
    refreshToken: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
  }
  