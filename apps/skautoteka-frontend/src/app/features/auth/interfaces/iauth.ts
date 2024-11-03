export type User = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: Role;
  region: Region;
};

export type Role = {
  name: string;
};

export type Region = {
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
