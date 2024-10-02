export type User = {
  email: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export type Tokens = {
  accessToken: string;
  refreshToken: string;
}

export type AccessToken = {
  accessToken: string;
}
