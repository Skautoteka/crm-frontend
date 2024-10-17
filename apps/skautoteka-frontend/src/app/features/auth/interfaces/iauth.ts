export type User = {
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  dateOfBirth: Date;
  phoneNumber: string;
};

export type Role = {
  name: string;
};

export interface LoginPayload {
  email: string;
  password: string;
}

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export type AccessToken = {
  accessToken: string;
};
