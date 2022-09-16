export interface AuthState {
  userId: string | null;
  token: string | null;
  tokenExpiration: number | null;
  didAutoLogout: boolean;
  emailReset: string | null;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthPayload extends LoginPayload {
  process: string;
  customErrorMessage: string;
}
