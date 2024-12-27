export interface User {
  id: string;
  email: string;
  name: string;
  openingBalance: number;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  email: string;
  password: string;
  name: string;
  openingBalance: number;
}