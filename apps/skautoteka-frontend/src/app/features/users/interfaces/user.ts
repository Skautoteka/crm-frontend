import { IGenericModel } from '@skautoteka-frontend/common';

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  region: string;
  role: string;
} & IGenericModel;
